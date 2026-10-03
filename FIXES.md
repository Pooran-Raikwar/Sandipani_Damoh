# V25 Native Single-Page Admin Update

## Scope
Converted the central Admin Panel from runtime HTML-module/iframe loading to a native single-page management layout.

## What changed
- Existing Admin Panel category names/cards/UI are preserved.
- Gallery Manager UI is embedded directly in `admin.html`.
- Marks & Results UI is embedded directly in `admin.html`.
- Books, Notes, Notices, Guest Lectures, Staff, Applications, Documents and Certificate UI are embedded directly in `admin.html`.
- Quiz Question Bank UI is embedded directly in `admin.html`.
- `js/admin-central.js` now only switches native sections; it does not fetch or inject `gallery-manager.html`, `admin-advanced.html`, `marks-entry.html` or `quiz-admin.html`.
- Marks functions were namespaced to avoid collision with the main Student Records functions.
- Standalone Gallery/Quiz pages remain available for backward compatibility, but the main Admin Panel does not navigate to them.
- Existing Google Apps Script / Google Sheet / Google Drive API paths were preserved.

## Verification
- JavaScript syntax checks passed for the modified/new admin scripts.
- ZIP integrity check passed.
- Confirmed `admin.html` contains no references to the former management HTML module files.
- Confirmed `js/admin-central.js` contains no runtime HTML-module fetch logic.

## Runtime limitation
A live Google Apps Script/Drive runtime test cannot be guaranteed from this build environment. The deployment should be checked after uploading to GitHub and using the deployed Apps Script URL.
