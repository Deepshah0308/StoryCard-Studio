# SPEC.md — Project Specification

> **Status**: `FINALIZED`

## Vision
StoryCard Studio is a creative web application that transforms short ideas or text into compelling 5-card illustrated stories using Gemini 2.5 Flash for narrative generation and Imagen 3.0 for visual creation, optimized for high-impact demos and easy Google Cloud deployment.

## Goals
1. **Multimodal storytelling**: Seamlessly link generated text and imagery into a coherent 5-scene narrative.
2. **Gemini + Imagen Integration**: Showcase Vertex AI capabilities through structured JSON output and high-quality image generation.
3. **Demo Optimization**: Ensure the application is responsive, looks premium, and can complete a generation cycle in under 30 seconds.
4. **Cloud-Native Deployment**: Built for Google Cloud Run with GCS for storage and Secret Manager for configuration.

## Non-Goals (Out of Scope)
- User accounts or authentication systems.
- Long-term story persistence (beyond GCS storage of recent runs).
- Multi-tenant features or collaborative editing.
- Real-time audio or Live WebSockets.

## Users
- **Hackathon Judges**: Reviewers seeking a clear, visual demo of Gemini and Imagen capabilities.
- **Content Creators**: Marketers and bloggers looking to quickly storyboard visual ideas.
- **Educators**: Teachers and students creating illustrated summaries or educational comic strips.

## Constraints
- **Technical**: Must use Gemini 2.5 Flash and Imagen 3.0.
- **Infrastructure**: Deployment target is Google Cloud Run in `northamerica-northeast2`.
- **Storage**: Asset and metadata storage in Google Cloud Storage (GCS).
- **Performance**: End-to-end generation target of ≤ 30 seconds.

## Success Criteria
- [ ] Successfully generates a 5-card story from a single prompt.
- [ ] Cards maintain character and setting consistency across all 5 images.
- [ ] Images are generated as 1:1 square aspect ratio.
- [ ] UI features a premium horizontal carousel for story viewing.
- [ ] Application deploys successfully via Cloud Build to Cloud Run.
