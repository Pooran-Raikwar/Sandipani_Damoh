# V23 Central Admin Session Fix

Fixes the Gallery Manager (and other embedded admin modules) showing “Admin access is not unlocked” after the administrator has already logged in to the Central Admin Panel.

Changes:
- Central Admin sends the verified session PIN to same-origin embedded modules via `postMessage` after iframe load.
- PIN is never placed in the module URL.
- Gallery Manager accepts the central session bridge and boots automatically.
- Existing localStorage/sessionStorage central session remains supported.
- Backend/API, Sheet IDs, forms and existing functionality are preserved.

Use the V23 web files in GitHub and deploy the matching `backend/Code.gs` only if backend changes are also included in the ZIP (this V23 session fix itself is frontend-only).
