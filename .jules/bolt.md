
## 2024-03-10 - FastAPI Blocking Async Event Loop
**Learning:** Synchronous network and CPU-bound operations (like GCP API calls for Imagen/Gemini) inside `async def` routes block the entire asyncio event loop, severely degrading concurrent request handling.
**Action:** Always wrap blocking I/O or CPU heavy functions in `fastapi.concurrency.run_in_threadpool` when inside an `async def` route context to preserve scalability.

## 2024-03-14 - Overlapping Delays with Task Execution in Asyncio
**Learning:** Sequential delays in loops (e.g. `await asyncio.sleep(5)`) wait for both the delay AND the task processing time if awaited sequentially. For IO/Network bound processes with rate limits, scheduling concurrent tasks while keeping the delays between scheduling saves the `N * task_duration` time from the overall request block.
**Action:** Spawn `asyncio.create_task()` in the loop immediately before/after a required delay instead of awaiting the heavy task sequentially.
