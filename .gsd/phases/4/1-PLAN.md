---
phase: 4
plan: 1
wave: 1
---

# Plan 4.1: Cloud Run Containerization & API Deployment

## Objective
Package the FastAPI backend into a production-ready Docker container and deploy it to Google Cloud Run, pointing to the existing `storycard-images-prod` bucket.

## Context
- .gsd/SPEC.md
- backend/main.py
- .gsd/phases/4/RESEARCH.md

## Tasks

<task type="auto">
  <name>Create Backend Dockerfile</name>
  <files>backend/Dockerfile</files>
  <action>
    Create a optimized Dockerfile for the FastAPI backend:
    - Base: python:3.12-slim
    - Install requirements.txt
    - Expose port 8080
    - Launch using uvicorn main:app --host 0.0.0.0 --port 8080
  </action>
  <verify>test -f backend/Dockerfile</verify>
  <done>Dockerfile exists in backend directory</done>
</task>

<task type="checkpoint:human-verify">
  <name>Cloud Run Deployment</name>
  <files>backend/.env</files>
  <action>
    Deploy the backend to global Cloud Run:
    1. Ensure your local CLI is logged in.
    2. Run the gcloud command provided in README.md.
    3. Capture the generated Service URL.
  </action>
  <verify>gcloud run services list --project=meeting-architect</verify>
  <done>Backend service is ACTIVE on Cloud Run</done>
</task>

## Success Criteria
- [ ] Backend is containerized and deployable to Cloud Run.
- [ ] Cloud Run service URL is generated.
