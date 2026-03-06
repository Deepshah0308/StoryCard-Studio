---
phase: 2
plan: 1
wave: 1
---

# Plan 2.1: Frontend Scaffold & Premium UI Frame

## Objective
Initialize the React+Vite frontend and establish a highly distinctive "Dark Cinematic" design system applying the `frontend-design` workflow guidelines. Introduce dramatic typography (Syne for display, Outfit for body), glassmorphism layered over a deep #0a0a0a background, and fluid staggered CSS/Framer Motion reveals.

## Context
- .gsd/SPEC.md
- .gsd/REQUIREMENTS.md

## Tasks

<task type="auto">
  <name>Scaffold React+Vite and Install Dependencies</name>
  <files>
    - frontend/package.json
    - frontend/vite.config.ts
    - frontend/index.html
    - frontend/.env.local
  </files>
  <action>
    1. Initialize a new Vite React+TS project in the `frontend` directory.
    2. Install `tailwindcss`, `postcss`, `autoprefixer`, `framer-motion`, and `lucide-react`.
    3. Initialize Tailwind config.
    4. Create `.env.local` to point `VITE_API_BASE` to `http://localhost:8000`.
    5. Update `index.html` to include Google Fonts for 'Syne' and 'Outfit', and modify the title to "StoryCard Studio".
  </action>
  <verify>ls frontend/package.json frontend/tailwind.config.js</verify>
  <done>React project is scaffolded with all primary styling and motion dependencies installed.</done>
</task>

<task type="auto">
  <name>Configure Tailwind and Global Styles</name>
  <files>
    - frontend/tailwind.config.js
    - frontend/src/index.css
  </files>
  <action>
    1. Configure Tailwind to use `Syne` for headings and `Outfit` for sans-serif text.
    2. Define an extended color palette focusing on deep space/charcoal blacks (`#050505`, `#0a0a0a`) with vivid accent colors (e.g., electric violet, neon cyan) for highlights and glowing effects.
    3. Modify `index.css` to implement a subtle animated dark mesh/gradient background on the `body` body tag to give depth and atmosphere rather than flat color.
    4. Setup global CSS variables for reusable glassmorphic shadows and text-glows.
  </action>
  <verify>grep -q "Syne" frontend/tailwind.config.js</verify>
  <done>Tailwind and global CSS reflect the "Dark Cinematic" premium aesthetic requirements.</done>
</task>

<task type="auto">
  <name>Build Main Input Form & Layout</name>
  <files>
    - frontend/src/App.tsx
    - frontend/src/components/StoryForm.tsx
  </files>
  <action>
    1. Scaffold a highly polished `App.tsx` layout structure (Header, Hero section with title/subtitle, Main content area).
    2. Implement `StoryForm.tsx` featuring standard and large text inputs for `topic` and `inputText` utilizing glassmorphic styles with focus glow effects.
    3. Create a custom styled dropdown for the `style` preset ("Default", "Watercolor", "Cyberpunk Neon", "Cinematic Dark", "Studio Ghibli").
    4. Use `framer-motion` to animate the load-in of these main UI elements in a staggered fashion.
    5. Handle local form state and simulate a submission action showing the loading spinner.
  </action>
  <verify>cat frontend/src/components/StoryForm.tsx | grep -q "framer-motion"</verify>
  <done>The main layout and interactive form components map to the cinematic design theme and capture all required user input.</done>
</task>

## Success Criteria
- [ ] Frontend successfully runs locally on port 5173.
- [ ] Visual aesthetic features dark cinematic styling with Syne/Outfit fonts.
- [ ] Form layout captures topic, input text, and style constraints, showing responsive hover/focus UI.
