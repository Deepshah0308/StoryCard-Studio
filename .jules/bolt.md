
## 2024-03-10 - FastAPI Blocking Async Event Loop
**Learning:** Synchronous network and CPU-bound operations (like GCP API calls for Imagen/Gemini) inside `async def` routes block the entire asyncio event loop, severely degrading concurrent request handling.
**Action:** Always wrap blocking I/O or CPU heavy functions in `fastapi.concurrency.run_in_threadpool` when inside an `async def` route context to preserve scalability.

## 2024-03-16 - Overlapping Secondary I/O with API Quota Delays
**Learning:** In loops containing intentional, non-blocking delays (like `await asyncio.sleep(5)` to respect Vertex AI quotas), secondary network/I/O tasks (like GCS uploads) executed sequentially waste time. The time spent sleeping can be utilized by overlapping it with other independent, concurrent operations.
**Action:** When sequential external API calls require mandatory delays between requests, always identify independent subsequent tasks (like uploading the result of the previous call) and use `asyncio.create_task` to run them concurrently, allowing them to complete *during* the mandatory wait period of the primary loop.
