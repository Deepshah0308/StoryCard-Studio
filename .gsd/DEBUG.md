# Debug Session: Image Hover Blur Fix

## Symptom
When a user hovers over a story card image, the entire image blurs due to a backdrop-blur filter on the interaction overlay, preventing clear viewing of the generated art.

**When:** Hovering over any card image in the carousel.
**Expected:** Image stays sharp, perhaps with a slight dimming overlay to provide contrast for button actions.
**Actual:** Image becomes blurry because of `backdrop-blur-sm`.

## Hypotheses

| # | Hypothesis | Likelihood | Status |
|---|------------|------------|--------|
| 1 | The `backdrop-blur-sm` class on the overlay div in `StoryCard.tsx` is applying the filter to the image behind it. | 100% | UNTESTED |

## Attempts

### Attempt 1
**Testing:** H1 — Remove `backdrop-blur-sm` from the overlay.
**Action:** Edited `frontend/src/components/StoryCard.tsx` to remove the blur class.
**Result:** Images stay 100% sharp during hover interactions.
**Conclusion:** CONFIRMED.

## Resolution

**Root Cause:** Overuse of glassmorphism filters (`backdrop-blur-sm`) on interaction overlays masked the generated content.
**Fix:** Removed the blur filter from the image action overlay.
**Verified:** Locally via browser automation and deployed to production.
**Regression Check:** Verified buttons remain legible against the darker `bg-black/30` overlay.
