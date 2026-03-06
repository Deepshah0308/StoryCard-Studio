# SPEC.md — Project Specification

> **Status**: `FINALIZED`

## Vision
StoryCard Studio is a creative web application that transforms short ideas or text into compelling 5-card illustrated stories using Gemini 2.5 Flash for narrative generation and Imagen 3.0 for visual creation, optimized for high-impact demos and easy Google Cloud deployment. It is built for the Gemini Live Agent Challenge under the "Creative Storyteller" category.

## Goals
1. **Multimodal storytelling**: Seamlessly link generated text and imagery into a coherent 5-scene narrative, demonstrating **interleaved/mixed output capabilities** (text + images woven together).
2. **Gemini + Imagen Integration**: Showcase Vertex AI capabilities through structured JSON output and high-quality image generation using the **Google GenAI SDK**.
3. **Demo Optimization**: Ensure the application is responsive, looks premium, and can complete a generation cycle in under 30 seconds for a <4 minute demo video.
4. **Cloud-Native Deployment**: Built for Google Cloud Run with GCS for storage and Secret Manager for configuration, satisfying the "at least one Google Cloud service" requirement.

## Non-Goals (Out of Scope)
- User accounts or authentication systems.
- Long-term story persistence (beyond GCS storage of recent runs).
- Multi-tenant features or collaborative editing.
- Real-time audio or Live WebSockets.

## Users
- **Hackathon Judges**: Reviewers seeking a clear, visual demo of Gemini and Imagen capabilities showing real software (no mockups).
- **Content Creators**: Marketers and bloggers looking to quickly storyboard visual ideas.
- **Educators**: Teachers and students creating illustrated summaries or educational comic strips.

## Constraints
- **Technical**: Must use Gemini 2.5 Flash, Imagen 3.0, and the Google GenAI SDK.
- **Category Requirement**: Must demonstrate interleaved/mixed output of text and image.
- **Infrastructure**: Deployment target is Google Cloud Run in `northamerica-northeast2`. Must use at least one Google Cloud service.
- **Storage**: Asset and metadata storage in Google Cloud Storage (GCS).
- **Performance**: End-to-end generation target of ≤ 30 seconds.
- **Rules**: Must support English. No API keys in frontend or repo (use Secret Manager). Third-party tools must be disclosed. Newly created project for the hackathon.

## Success Criteria
- [ ] Successfully generates a 5-card story from a single prompt with interleaved text and images.
- [ ] Cards maintain character and setting consistency across all 5 images.
- [ ] Images are generated as 1:1 square aspect ratio using Imagen 3.0.
- [ ] UI features a premium horizontal carousel for story viewing, entirely in English.
- [ ] Application deploys successfully via Cloud Build to Cloud Run.
- [ ] Includes README with local setup + Cloud Run deploy guide, architecture diagram (Browser → Cloud Run → Gemini/Imagen → GCS).
- [ ] Prepared for Devpost submission with working app, public GitHub repo, proof of GCP deployment, and a demo video (≤ 4 min).
