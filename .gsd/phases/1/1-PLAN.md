---
phase: 1
plan: 1
wave: 1
---

# Plan 1.1: Backend Foundation & AI Integration

## Objective
Establish the core FastAPI backend and implement the multimodal storytelling pipeline using Gemini 2.5 Flash for narrative and Imagen 3.0 for visual generation, ensuring character and setting consistency.

## Context
- .gsd/SPEC.md
- .gsd/REQUIREMENTS.md
- User provided .env configuration

## Tasks

<task type="auto">
  <name>Initialize Backend Environment</name>
  <files>
    - backend/main.py
    - backend/requirements.txt
    - backend/.env
  </files>
  <action>
    1. Create `backend/requirements.txt` with `fastapi`, `uvicorn`, `google-generativeai`, `google-cloud-aiplatform`, `google-cloud-storage`, `pydantic`, `python-dotenv`, and `pillow`.
    2. Create `backend/main.py` with a basic FastAPI scaffold and CORS middleware enabled for `http://localhost:5173`.
    3. Create `backend/.env` using the project details provided by the user.
    4. Set up the foundational Pydantic models for the story structure (Story, Card).
  </action>
  <verify>ls backend/main.py backend/requirements.txt</verify>
  <done>Backend directory is initialized with dependencies and env config.</done>
</task>

<task type="auto">
  <name>Implement Story Generation Logic</name>
  <files>
    - backend/services/ai_service.py
    - backend/main.py
  </files>
  <action>
    1. Create `backend/services/ai_service.py` to handle calls to Gemini and Imagen.
    2. Implement `generate_story_narrative` using Gemini 2.5 Flash with `response_mime_type="application/json"` and a Pydantic schema to ensure 5 coherent scenes.
    3. Implement `generate_story_images` using Imagen 3.0 (`imagen-3.0-generate-002`), ensuring 1:1 square aspect ratio and consistency instructions in the prompt.
    4. Integrate narrative and image generation in a single workflow that returns the complete story JSON.
  </action>
  <verify>python3 -c "from backend.services.ai_service import AIService; print('AI Service imported successfully')"</verify>
  <done>Gemini and Imagen integration is functional with structured output and consistency prompts.</done>
</task>

<task type="auto">
  <name>Implement GCS Storage & API Endpoints</name>
  <files>
    - backend/services/storage_service.py
    - backend/main.py
  </files>
  <action>
    1. Create `backend/services/storage_service.py` to handle image uploads to GCS.
    2. Update `main.py` to include the `POST /api/storycards` endpoint.
    3. Ensure the endpoint triggers the narrative generation, image generation, uploads to GCS, and returns the final JSON with image URLs.
    4. Implement error handling for AI and storage failures.
  </action>
  <verify>python3 -c "from backend.services.storage_service import StorageService; print('Storage Service imported successfully')"</verify>
  <done>API endpoint is functional, saving images and JSON to GCS and returning full story metadata.</done>
</task>

## Success Criteria
- [ ] Backend server starts without errors.
- [ ] `POST /api/storycards` triggers the full Gemini + Imagen + GCS flow.
- [ ] Story JSON is correctly structured and stored in GCS.
- [ ] Images are generated and stored in GCS with 1:1 aspect ratio.
