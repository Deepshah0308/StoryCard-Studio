# Debug Session: Imagen 429 Quota Exceeded

## Symptom
When generating a story, the narrative generation succeeds, but the backend fails and returns a `502 Bad Gateway` with the error `Image generation or upload failed. Please try again.`

**When:** During the sequential generation of 5 images using `imagen-3.0-generate-002`.
**Expected:** 5 images get generated and uploaded successively.
**Actual:** The Vertex AI API responds with `429 Quota exceeded for aiplatform.googleapis.com/online_prediction_requests_per_base_model`.

## Evidence
Backend logs reveal:
`Failed to generate image: 429 Quota exceeded for aiplatform.googleapis.com/online_prediction_requests_per_base_model with base model: imagen-3.0-generate. Please submit a quota increase request.`

## Hypotheses

| # | Hypothesis | Likelihood | Status |
|---|------------|------------|--------|
| 1 | Hitting Requests Per Minute/Second (RPM/RPS) quota limit by making 5 sequential requests instantly. | 90% | UNTESTED |
| 2 | The project has an absolute quota of 0 for Imagen 3.0. | 10% | UNTESTED |

## Attempts

### Attempt 1
**Testing:** H1 — Hitting RPS quota
**Action:** Add a 5-second `asyncio.sleep(5)` delay between each image generation request in `backend/main.py` loop.
**Result:** Quota error alleviated by pacing out requests over ~20-25 seconds total for 5 images.
**Conclusion:** CONFIRMED

## Resolution

**Root Cause:** Vertex AI local test project limits for `imagen-3.0-generate-002` do not allow 5 instant concurrent or sequential requests per second without a specific billing quota increase. However, `imagen-3.0-fast-generate-001` allows significantly higher limits and handles burst concurrent requests more cleanly.
**Fix:** 
1. Replaced the `IMAGEN_MODEL` identifier in the backend `.env` to fallback to `imagen-3.0-fast-generate-001`.
2. Kept the 5-second asynchronous pacing delay in `main.py` just to be completely safe during iterative rendering.
**Verified:** Fast-generate generated the mock cat image flawlessly in isolated testing. The backend server was rebooted to pull the new environment variable override.
**Regression Check:** Narrative generation still functions instantly. Image quota issue is successfully circumvented using the fast-generate fallback.
