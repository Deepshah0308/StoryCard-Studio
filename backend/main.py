import os
import uuid
import logging
import asyncio
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.concurrency import run_in_threadpool
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from models import StoryCardRequest, StoryResponse, StoryResponseCard
from services.ai_service import AIService
from services.storage_service import StorageService

app = FastAPI(title="StoryCard Studio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger = logging.getLogger(__name__)

# Initialize services
ai_service = None
storage_service = None

def get_ai_service():
    global ai_service
    if ai_service is None:
        ai_service = AIService()
    return ai_service

def get_storage_service():
    global storage_service
    if storage_service is None:
        storage_service = StorageService()
    return storage_service

@app.get("/")
def read_root():
    return {"status": "ok", "message": "StoryCard Studio API is running"}

@app.post("/api/storycards", response_model=StoryResponse)
async def generate_storycards(request: StoryCardRequest, background_tasks: BackgroundTasks):
    if not request.topic:
        raise HTTPException(status_code=400, detail="Topic is required")

    story_id = str(uuid.uuid4())

    try:
        ai_service = get_ai_service()
        storage_service = get_storage_service()
        
        # Generate Narrative (Run in threadpool to prevent blocking the async event loop)
        story_config = await run_in_threadpool(
            ai_service.generate_story_narrative,
            topic=request.topic,
            input_text=request.inputText,
            style=request.style
        )
    except Exception as e:
        logger.error(f"Narrative generation or service init error: {e}")
        raise HTTPException(status_code=502, detail=f"Service initialization or narrative generation failed. Ensure Google Cloud auth is configured. Error: {str(e)}")

    upload_tasks = []
    
    async def upload_card_task(card_config, idx, img_bytes):
        # Background task for uploading image to GCS
        try:
            url = await run_in_threadpool(
                storage_service.upload_image,
                story_id=story_id,
                index=idx,
                image_bytes=img_bytes
            )
            return StoryResponseCard(
                title=card_config.title,
                caption=card_config.caption,
                image_url=url
            )
        except Exception as upload_e:
            logger.error(f"Image upload error for card {idx}: {upload_e}")
            raise upload_e

    # Generate Images sequentially and upload to GCS concurrently
    try:
        for idx, card in enumerate(story_config.cards):
            if idx > 0:
                # Add delay to avoid hitting Vertex AI Quota limits (Requests Per Minute/Second)
                await asyncio.sleep(5)
                
            # 1. Generate image using Imagen (Offload CPU/IO bound tasks to threadpool)
            # This remains sequential as per requirements and constraints
            image_bytes = await run_in_threadpool(
                ai_service.generate_story_image,
                visual_prompt=card.visual_prompt,
                style=request.style or "Default"
            )
            
            # 2. Spawn concurrent task to upload to GCS while moving to next generation
            upload_task = asyncio.create_task(upload_card_task(card, idx, image_bytes))
            upload_tasks.append(upload_task)

        # Await all GCS image uploads
        response_cards = await asyncio.gather(*upload_tasks)

    except Exception as e:
        logger.error(f"Image generation error: {e}")
        raise HTTPException(status_code=502, detail=f"Image generation or upload failed. Please try again.")

    # Construct the final response
    full_response = StoryResponse(
        story_id=story_id,
        summary=story_config.summary,
        cards=list(response_cards)
    )
    
    # Upload metadata JSON lazily using BackgroundTasks (Starlette handles threadpool automatically for sync defs)
    def upload_json_metadata():
        try:
            storage_service.upload_json(story_id, full_response.model_dump())
        except Exception as e:
            logger.warning(f"Failed to upload story JSON: {e}")

    background_tasks.add_task(upload_json_metadata)

    return full_response

@app.get("/api/storycards/{story_id}", response_model=StoryResponse)
async def get_storycard(story_id: str):
    # This could fetch the story.json from GCS
    raise HTTPException(status_code=501, detail="Getting saved storycards is not implemented yet")
