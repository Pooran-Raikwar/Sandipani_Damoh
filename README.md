# Sandipani Advanced - GitHub Pages + Google Sheets

## Architecture
- Static frontend: GitHub Pages
- Backend: Google Apps Script Web App
- Database: Google Spreadsheet created automatically by the backend
- Form Builder: stored in `FormSettings` sheet and rendered dynamically

## One-time setup
1. Create a new Apps Script project and paste `backend/Code.gs`.
2. In Apps Script Project Settings → Script Properties add `ADMIN_PIN` (recommended) and optionally `SCHOOL_NAME`.
3. Deploy → New deployment → Web app → Execute as Me → Anyone.
4. Copy the `/exec` URL.
5. Put it once in `js/config.js` as `DEFAULT_API_URL` OR save it from Admin in your browser.
6. Open Admin and use Initialize / Check Google Sheet. A fresh spreadsheet is created automatically on first setup.
7. Login using your `ADMIN_PIN`.
8. Use Form Builder to manage fields.

## Default vocational setup
- Classes: 9th, 10th, 11th, 12th
- Trade: IT-ITeS
- Job Role: Domestic Data Entry Operator
- Stream for 11th/12th: Science, Commerce, Arts, Vocational

## Important
GitHub Pages cannot execute Apps Script server code. The Apps Script `/exec` URL is the backend API. The website communicates through JSONP so no server of your own is required.


## Real AI setup
1. Open the Google Apps Script project used by `js/config.js`.
2. Project Settings → Script Properties → add `OPENAI_API_KEY` with your OpenAI API key.
3. Optional: add `OPENAI_AI_MODEL` with `gpt-5.6-luna` (default) or another model available to your API project.
4. Deploy a new Web App version after saving `backend/Code.gs`.
5. Open `ai-assistant.html` and test a question. The API key is server-side and is not exposed to GitHub Pages.

## V8 Vocational Learning Hub

The V8 layer adds a class/trade/medium filtered Vocational Learning Hub at `learning-hub.html`. Progress and saved courses are stored locally on the student device; no backend changes are required for this learning layer.
