# Sandipani V6 – Safe Upgrade & Setup

## 1. Upload
Upload the **entire ZIP contents** to the GitHub Pages repository. Keep the `images/`, `js/`, `css/`, `backend/`, `robots.txt` and `sitemap.xml` folders/files.

## 2. Google Apps Script
Replace the existing `Code.gs` with `backend/Code.gs`.

In Apps Script, choose:
`RUN_FIRST_initializeSystem`

Run it once and authorize the project. It creates/initializes the required Google Sheets tabs.

### Default Admin PIN
`87654300`

For production, you can set `ADMIN_PIN` in Script Properties. If the old v5 default `2580` is still present, the first initialization migrates it to `87654300`.

## 3. Fresh Google Sheet
Open the website → Admin → enter PIN `87654300`.

After login, **Secure Connection Settings** appears. Paste a Google Sheet URL/ID and click **Connect This Sheet**. The backend will create the required tabs in that sheet automatically.

## 4. Apps Script URL
The Web App URL is hidden until the Admin PIN is verified. After login it can be changed from **Secure Connection Settings** and is stored in that browser.

For a permanent default for all browsers, also update `js/config.js`.

## 5. Gallery
Gallery Manager now supports:
- upload
- delete
- edit title
- replace an existing gallery image
- site-wide image replacement for the school logo and teacher profile

## 6. Existing student form
Core student fields and validation are preserved. Do not delete/rename protected core fields in Form Builder.

## 7. Images
The ZIP contains the local image assets. Upload the complete `images/` folder to GitHub; do not upload only HTML files.

## 8. Google Search Console
`robots.txt`, `sitemap.xml`, canonical tags, descriptions, Open Graph tags, structured data and `.nojekyll` are included. Search Console ownership itself is an account-level Google step and cannot be embedded into a ZIP.
