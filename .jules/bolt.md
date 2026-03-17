## 2024-03-16 - Frontend Component Optimization
**Learning:** Found that `StoryCard` components re-rendered on every state change because they weren't memoized.
**Action:** Always wrap presentation components in `React.memo` when rendering lists of dynamic cards.

## 2024-03-17 - Overlapping I/O Bound Work with Sequential API Delays
**Learning:** The backend uses `asyncio.sleep(5)` sequentially within an async generation loop to avoid hitting Vertex AI Quota limits (RPM/RPS). By offloading IO-bound work (like GCS uploads with `upload_image`) into background tasks using `asyncio.create_task` and a threadpool, the IO overhead can be hidden by overlapping completely with the required `asyncio.sleep()` sequential delays.
**Action:** When working in loops that require forced delays (like rate limiting or quotas), identify any IO or CPU bound operations occurring *before* the next delay and offload them to run concurrently, hiding their latency within the delay period.
