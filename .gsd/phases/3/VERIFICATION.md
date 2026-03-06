## Phase 3 Verification

### Must-Haves
- [x] Backend connects safely without crashing main thread due to Google SDK initialization — VERIFIED (evidence: Refactored global variables to `get_ai_service()`)
- [x] Backend logic gracefully returns 502 with explicit error JSON if auth breaks, allowing frontend to render it cleanly — VERIFIED (evidence: Endpoint returned 502 and `detail` payload over curl)
- [x] Frontend is designed to receive and show the error state based on backend response — VERIFIED (evidence: `App.tsx` has `alert` state handling matching `err.message`)

### Verdict: PASS
