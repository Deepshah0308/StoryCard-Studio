
## 2024-03-10 - FastAPI Blocking Async Event Loop
**Learning:** Synchronous network and CPU-bound operations (like GCP API calls for Imagen/Gemini) inside `async def` routes block the entire asyncio event loop, severely degrading concurrent request handling.
**Action:** Always wrap blocking I/O or CPU heavy functions in `fastapi.concurrency.run_in_threadpool` when inside an `async def` route context to preserve scalability.

## 2026-03-13 - Pipelining Vertex AI Quota Delays with I/O Uploads
**Learning:** Sequential image generation that imposes strict delays (e.g. `asyncio.sleep(5)` to avoid Vertex AI quotas) presents an opportunity to pipeline independent I/O tasks. While awaiting the 5-second delay, we can concurrently upload the previously generated image to GCS using `asyncio.create_task()`.
**Action:** When a loop contains an unavoidable delay, identify independent I/O tasks from the previous iteration that can be offloaded asynchronously without blocking the loop's progression.

## 2026-03-13 - Offloading Final Metadata Uploads via BackgroundTasks
**Learning:** Uploading final metadata (like `story.json`) to GCS inside the API response path adds unnecessary latency for the user, as the metadata isn't strictly needed for the immediate response JSON payload.
**Action:** Always use `fastapi.BackgroundTasks` to offload final I/O operations (like metadata JSON uploads) that occur at the very end of an API request. This returns the API response immediately, saving the client the latency of that final network call.
