# V19 Functional Module Edition

This version keeps the existing Google Apps Script + Google Sheet architecture and makes the added modules directly usable from the central admin control room.

## Verified locally
- All JavaScript files pass `node --check`.
- ZIP integrity is tested after packaging.
- Learning Hub lessons have working Practical Lab and Quiz Centre actions.
- Practical Lab contains working Typing, Data Entry and Spreadsheet scoring.
- Quiz Centre contains built-in quizzes, timer, scoring, review, retry and local history.
- Skill Passport stores profile/portfolio locally and can sync central school records through Apps Script.
- Admission & Merit is managed from the central Admin Panel with Google Sheet routes already present in `Code.gs`.
- Gallery, Books/Notes, Notices, Staff, Documents, Industry Connect and Certificates use the central Admin session and existing Apps Script routes.
- AI Assistant now has a local study-helper fallback if the online AI backend is unavailable.

## Important
Some student learning/practical/quiz progress is intentionally device-local because these public pages do not require a student account. School-controlled records (students, certificates, industry records, admission records, books, notices, gallery and site media) remain Google Sheet/Apps Script backed.

For live Google Sheet functionality, deploy the matching `backend/Code.gs` as the Web App and keep the URL in `js/config.js`.
