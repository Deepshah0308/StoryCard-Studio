# Research: Phase 4 - Production Readiness & Cloud Run Deployment

## Objective
Identify the optimal deployment configuration for the StoryCard Studio mono-repo (FastAPI backend + React frontend) on Google Cloud Run, ensuring local verification is preserved in the container environment.

## Findings

### Deployment Strategy
1. **Model**: Sidecar or Separate Services?
   - **Decision**: Separate Services is cleaner for scaling, but for a Hackathon MVP, a **Single Docker Image** or **Vercel (Frontend) + Cloud Run (Backend)** is most efficient.
   - **Hackathon Requirement**: "Browser → Cloud Run → Gemini + Imagen → GCS". This implies the API logic *must* be on Cloud Run.
   - **Architecture**:
     - **Backend**: Cloud Run (Containerized FastAPI).
     - **Frontend**: Static Build (Vite) deployed via Firebase Hosting or simple Static Site hosting, OR containerized together if simpler for the user.
     - **Recommendation**: Deploy Backend to Cloud Run first. Provide instructions for Frontend hosting.

### Containerization (FastAPI)
- **Base Image**: `python:3.12-slim`
- **Dependencies**: `requirements.txt`
- **Port**: 8080 (Cloud Run default)
- **CORS**: Must handle the public URL of the frontend.

### GCP Permissions
- **Service Account**: Needs `roles/aiplatform.user` and `roles/storage.objectUser`.
- **Billing**: Quota project must be set.

### Hackathon Deliverables Checklist
- [ ] README with spin-up instructions
- [ ] Architecture diagram (Created: ARCHITECTURE.md)
- [ ] Proof of GCP deployment (Console recording)
- [ ] Demo video (English, Real software)

## Risk
- **Quota**: Cloud Run IP ranges might be shared; ensured we use `imagen-3.0-fast-generate-001`.
- **CORS**: Moving to production URLs often breaks local assumptions.

## Decision
Plan 4.1 will focus on the Backend Containerization and Cloud Run deployment.
Plan 4.2 will focus on Finalizing the Frontend build and Hackathon Documentation.
