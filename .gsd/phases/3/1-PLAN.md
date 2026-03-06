---
phase: 3
plan: 1
wave: 1
---

# Plan 3.1: Integration & Local Verification

## Objective
Verify the end-to-end integration between the frontend and the Gemini/Imagen backend logic. Start the processes, hit the API directly, and fix any backend connection or schema bugs.

## Context
- .gsd/ROADMAP.md
- backend/main.py

## Tasks

<task type="auto">
  <name>Start Backend</name>
  <files>
    - backend/main.py
  </files>
  <action>
    1. Run the FastAPI server locally as a background process.
    2. Curl the root health check to ensure it returns 200.
  </action>
  <verify>curl -s http://localhost:8000/</verify>
  <done>Backend runs and returns 200 OK on health endpoint.</done>
</task>

<task type="auto">
  <name>Test Generation Workflow</name>
  <files>
    - backend/services/ai_service.py
  </files>
  <action>
    1. Send a cURL POST request to `/api/storycards` with a simple topic.
    2. Check the response JSON format and error logs if it fails due to IAM or ADC.
    3. We may need to skip this test if the user's GCP environment isn't fully authenticated locally, but we should verify the backend logic handles it gracefully.
  </action>
  <verify>curl -s -X POST http://localhost:8000/api/storycards -H "Content-Type: application/json" -d '{"topic": "A test topic"}'</verify>
  <done>API correctly triggers logic and formats response.</done>
</task>

## Success Criteria
- [ ] Backend starts without error
- [ ] POST request handles structure generation gracefully
