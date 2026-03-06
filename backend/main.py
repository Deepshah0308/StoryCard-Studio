import os
import uuid
import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from models import StoryCardRequest, StoryResponse, StoryResponseCard
from services.ai_service import AIService
from services.storage_service import StorageService

app = FastAPI(title="StoryCard Studio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger = logging.getLogger(__name__)

# Initialize services lazily or on first request. Better to initialize on startup
# However, if env keys are not fully present yet, doing it globally could break imports.
# We'll leave them global for simplicity assuming .env is loaded.
ai_service = AIService()
storage_service = StorageService()

@app.get("/")
def read_root():
    return {"status": "ok", "message": "StoryCard Studio API is running"}

@app.post("/api/storycards", response_model=StoryResponse)
async def generate_storycards(request: StoryCardRequest):
    if not request.topic:
        raise HTTPException(status_code=400, detail="Topic is required")

    story_id = str(uuid.uuid4())
    
    try:
        # Generate Narrative
        story_config = ai_service.generate_story_narrative(
            topic=request.topic,
            input_text=request.inputText,
            style=request.style
        )
    except Exception as e:
        logger.error(f"Narrative generation error: {e}")
        raise HTTPException(status_code=502, detail=f"Narrative generation failed. Please try again.")

    response_cards = []
    
    # Generate Images sequentially and upload to GCS
    try:
        for idx, card in enumerate(story_config.cards):
            # 1. Generate image using Imagen
            image_bytes = ai_service.generate_story_image(
                visual_prompt=card.visual_prompt,
                style=request.style or "Default"
            )
            
            # 2. Upload to GCS
            image_url = storage_service.upload_image(
                story_id=story_id,
                index=idx,
                image_bytes=image_bytes
            )
            
            # 3. Add to response
            response_cards.append(
                StoryResponseCard(
                    title=card.title,
                    caption=card.caption,
                    image_url=image_url
                )
            )
    except Exception as e:
        logger.error(f"Image generation error: {e}")
        raise HTTPException(status_code=502, detail=f"Image generation or upload failed. Please try again.")

    # Construct the final response
    full_response = StoryResponse(
        story_id=story_id,
        summary=story_config.summary,
        cards=response_cards
    )
    
    # Upload metadata JSON
    try:
        storage_service.upload_json(story_id, full_response.model_dump())
    except Exception as e:
        logger.warning(f"Failed to upload story JSON: {e}")

    return full_response

@app.get("/api/storycards/{story_id}", response_model=StoryResponse)
async def get_storycard(story_id: str):
    # This could fetch the story.json from GCS
    raise HTTPException(status_code=501, detail="Getting saved storycards is not implemented yet")
