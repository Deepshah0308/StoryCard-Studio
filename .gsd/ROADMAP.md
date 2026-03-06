# ROADMAP.md

> **Current Phase**: Not started
> **Milestone**: v1.0 (Hackathon MVP)

## Must-Haves (from SPEC)
- [ ] 5-card story generation with character consistency.
- [ ] Imagen 3.0 image generation (1:1 square).
- [ ] GCS storage for assets.
- [ ] Premium horizontal carousel UI.
- [ ] Cloud Run deployment structure.

## Phases

### Phase 1: Backend Foundation & AI Integration
**Status**: ✅ Complete
**Objective**: Build the core FastAPI server and integrate Gemini/Imagen with GCS.
**Requirements**: FR-01, FR-03, FR-04, FR-05, FR-06, FR-07, NFR-01

### Phase 2: Frontend Scaffold & Premium UI Implementation
**Status**: ✅ Complete
**Objective**: Create the React/Vite app with a distinctive aesthetic and the horizontal carousel.
**Requirements**: FR-08, FR-09, FR-10, NFR-02

### Phase 3: Integration & Local Verification
**Status**: ⬜ Not Started
**Objective**: Connect Frontend to Backend and verify full generation flow locally.
**Requirements**: FR-01, FR-02, FR-03, FR-04, FR-05, FR-06, FR-07, FR-08, FR-09, FR-10

### Phase 4: Production Readiness & Cloud Deployment
**Status**: ⬜ Not Started
**Objective**: Finalize Dockerfile, Cloud Build config, and deploy to Cloud Run.
**Requirements**: NFR-03
