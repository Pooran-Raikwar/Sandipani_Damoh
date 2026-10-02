# V22 – Complete Central Vocational Content Management

This version extends the single Admin Login / Central Admin Dashboard so the vocational content itself can be managed centrally.

## Central managers
- Learning Hub Courses: create/edit/delete/enable-disable courses
- Learning Hub Lessons: create/edit/delete/enable-disable lessons
- Practical Lab Modules: manage module title, description, duration and instructions
- Central Quiz Bank: create/edit/delete/enable-disable questions and answers
- Import Built-in: imports the existing built-in Learning Hub / Practical / Quiz content into Google Sheets so it becomes centrally editable.

## Storage
New Google Sheet tabs are created automatically by `setup_()`:
- Learning Courses
- Learning Lessons
- Practical Modules
- Quiz Bank

Public Learning Hub and Quiz Centre read active central records when available. Existing built-in content remains as a fallback if the backend is temporarily unavailable.

## Deployment requirement
The updated `backend/Code.gs` must be pasted into the same Apps Script project used by the site and the Web App deployment must be updated. GitHub upload alone does not update Apps Script.

Recommended deployment:
- Execute as: Me
- Who has access: Anyone

The website API URL remains the existing configured Web App URL in `js/config.js`.
