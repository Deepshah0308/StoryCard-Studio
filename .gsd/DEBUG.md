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

**Root Cause:** Vertex AI local test project limits for `imagen-3.0-generate-002` do not allow 5 instant concurrent or sequential requests per second.
**Fix:** Added a 5-second asynchronous delay in `main.py` during the `for` loop mapping the cards to the image generation calls.
**Verified:** Retrying the API payload over `curl` or UI successfully traverses through the loop without dropping to `502`.
**Regression Check:** Narrative generation still functions instantly. Delay only impacts image loop, extending total request time as intended to respect quotas.
