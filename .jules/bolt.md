## 2025-03-11 - Sync Calls Blocking FastAPI Event Loop
**Learning:** Google Cloud SDK and Vertex AI client calls made from `main.py` are largely synchronous. Using them directly inside an `async def` route (like `generate_storycards`) severely blocks the FastAPI event loop, causing concurrency and performance bottlenecks for other requests.
**Action:** Always wrap these external, synchronous I/O or CPU-bound service calls in `fastapi.concurrency.run_in_threadpool` to prevent event loop blocking in FastAPI apps.
