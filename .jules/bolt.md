
## 2024-03-10 - FastAPI Blocking Async Event Loop
**Learning:** Synchronous network and CPU-bound operations (like GCP API calls for Imagen/Gemini) inside `async def` routes block the entire asyncio event loop, severely degrading concurrent request handling.
**Action:** Always wrap blocking I/O or CPU heavy functions in `fastapi.concurrency.run_in_threadpool` when inside an `async def` route context to preserve scalability.
