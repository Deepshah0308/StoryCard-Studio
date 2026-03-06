---
phase: 2
plan: 2
wave: 2
---

# Plan 2.2: Story Carousel & API Integration

## Objective
Implement the horizontal interactive card carousel using Framer Motion and connect the frontend form to the FastAPI backend to visualize real generated stories.

## Context
- .gsd/REQUIREMENTS.md
- backend/models.py (provides schema context)
- frontend/src/components/StoryForm.tsx (from plan 1)

## Tasks

<task type="auto">
  <name>Build StoryCard & Carousel Component</name>
  <files>
    - frontend/src/components/StoryCarousel.tsx
    - frontend/src/components/StoryCard.tsx
    - frontend/src/types.ts
  </files>
  <action>
    1. Define the shared TS interfaces in `types.ts` representing the backend `StoryResponse` structure.
    2. Build `StoryCard.tsx`. It should render a 1:1 aspect ratio image placeholder or real image at the top, a bold `Syne` title, and a caption. Add "Open image in new tab" icon/link. Style with glassmorphic cards and subtle hover scaling (`framer-motion`).
    3. Build `StoryCarousel.tsx` to handle a horizontal overflow scrolling container. Center the overall narrative `summary` above the horizontal carousel strip. 
    4. Implement swipe/drag constraints if possible using `framer-motion` for a premium native feel, or use well-styled CSS snap scrolling.
  </action>
  <verify>ls frontend/src/components/StoryCarousel.tsx</verify>
  <done>Carousel and Card components render a mock story beautifully in horizontal fashion.</done>
</task>

<task type="auto">
  <name>Connect to Backend API</name>
  <files>
    - frontend/src/api.ts
    - frontend/src/App.tsx
    - frontend/src/components/StoryForm.tsx
  </files>
  <action>
    1. Extract API connection logic to `api.ts`. Provide a `generateStory(topic, text, style)` async function that hits `VITE_API_BASE/api/storycards`.
    2. In `App.tsx` (or an appropriate state wrapper), manage the `isLoading`, `error`, and `story` states.
    3. When `StoryForm` submits, invoke the API. Ensure standard loading UX (disable form, show spinner with engaging loading text).
    4. If the API errors, catch and display a visually consistent error banner, avoiding raw stack trace dumps.
    5. Upon success, transition the UI smoothly using `framer-motion` from the form-centric view to the `StoryCarousel` view.
  </action>
  <verify>grep -q "fetch" frontend/src/api.ts</verify>
  <done>Frontend accurately submits configuration to the FastAPI backend, transitions cleanly to loading, and displays generated story cards.</done>
</task>

## Success Criteria
- [ ] User can input details and click generate without page reload.
- [ ] Loading state visually indicates story generation is occurring (disables form).
- [ ] Response correctly populates a horizontally scrollable container with 5 cards.
- [ ] Errors are caught and shown elegantly to the user.
