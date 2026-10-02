# Sandipani V17 – Central Admin + Gallery + About Fixes

## Fixed
- One Admin PIN/session remains the single gateway for all admin modules.
- Gallery Manager now uses the central API client for upload/update/delete, including correct section mapping.
- Gallery Manager embedded mode uses valid HTML structure and works inside the central Admin workspace.
- Central Admin workspace now has module loading feedback and reload control.
- About page now uses the same modern blue navigation bar/tabs as the homepage.
- About navigation keeps the same main tabs: Home, Registration, Results, Gallery, Books, About, Admin Panel.
- API action coverage checked against Code.gs routes.
- All local JavaScript files passed `node --check`.
- Code.gs passed JavaScript syntax validation.
- All local HTML script references were checked for missing files.

## Important deployment step
This ZIP contains the updated `backend/Code.gs`. The file must be pasted into the Google Apps Script project that powers the Web App and the existing Web App deployment must be updated.

Web App settings:
- Execute as: Me
- Who has access: Anyone

Keep the same `/exec` URL if updating the existing deployment.

## Frontend API URL
`js/config.js` is already set to the current configured Apps Script URL in this project. The Admin Panel can also store the API URL in browser local storage through its connection settings.
