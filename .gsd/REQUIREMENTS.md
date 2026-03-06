# REQUIREMENTS.md

## Format
| ID | Requirement | Source | Status |
|----|-------------|--------|--------|
| FR-01 | Support topic input (short text) and optional longer input text | PRD/SPEC | Pending |
| FR-02 | Selectable style presets (Default, Watercolor, Cyberpunk, etc.) | PRD/SPEC | Pending |
| FR-03 | Backend uses Gemini 2.5 Flash for structured story generation (5 scenes) | PRD/SPEC | Pending |
| FR-04 | Backend uses Imagen 3.0 for generating 1:1 square images per scene | PRD/SPEC | Pending |
| FR-05 | Image generation must maintain character/setting consistency | User Decision | Pending |
| FR-06 | Store images and metadata (JSON) in GCS | PRD/SPEC | Pending |
| FR-07 | FastAPI backend with /api/storycards POST and GET endpoints | PRD/SPEC | Pending |
| FR-08 | React/Vite frontend with a horizontal, swipeable card carousel | User Decision | Pending |
| FR-09 | Show loading indicators with status text during generation | PRD/SPEC | Pending |
| FR-10 | Functional "Download" and "Open in new tab" links for images | PRD/SPEC | Pending |
| NFR-01 | End-to-end generation cycle ≤ 30 seconds | PRD/SPEC | Pending |
| NFR-02 | Premium, distinctive UI (minimalist/modern) | @[/frontend] | Pending |
| NFR-03 | Deployment to Google Cloud Run in northamerica-northeast2 | PRD/SPEC | Pending |
