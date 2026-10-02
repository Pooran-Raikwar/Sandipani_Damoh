# V18 Central Admin Session Fix

- Fixed admin PIN expiration caused by the old 30-minute session timeout.
- Central admin PIN is now persisted in localStorage + sessionStorage and remains valid until explicit Logout, while every module still verifies the PIN against Apps Script.
- Embedded Gallery, Books/Notes, Notices, Staff, Documents, Marks, Quiz and other admin modules can reuse the same central session.
- Logout clears both storages.
- About header explicitly uses the shared blue site navigation styling.
- Existing backend and data structure preserved.

Important: update the matching backend/Code.gs in Google Apps Script and update the Web App deployment.
