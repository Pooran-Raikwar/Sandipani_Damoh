# V25 Native Single-Page Admin — Complete Update

## What changed
- Converted the Admin Panel management flow to a native single-page workspace.
- Removed iframe-based management navigation from the Admin Panel.
- Removed Admin Panel loading of standalone management HTML modules.
- Gallery Manager now works inside the native Admin Panel area.
- Gallery Site Media (school logo / teacher profile) remains inside the same Gallery area.
- Marks & Results management works inside the same Admin Panel page.
- Books, Notes, Notices, Guest Lectures, Staff, Applications, Documents and Certificate tools are embedded natively in the Admin Panel.
- Skill Passport, Industry Connect, Admission & Merit, Form Builder/Settings and Student Records continue to use their existing native Admin Panel sections.
- The five existing automation tools are rendered inside the Admin Panel without an iframe or separate HTML navigation.
- Existing API/Google Sheet/Google Drive backend interfaces were preserved.
- Fixed the native Advanced manager implementation so its real CRUD/upload functions are available instead of only wrapper functions.
- Fixed native Gallery boot logic to work with the native Gallery DOM.
- Fixed native Marks error-message targeting.

## Validation performed
- Node syntax check passed for all modified Admin JavaScript files.
- No `<iframe>` or old standalone module HTML references remain in the Admin Panel runtime files.
- No duplicate HTML IDs were found in `admin.html`.
- All API methods referenced by the native Advanced manager were confirmed present in `js/api.js`.
- ZIP integrity checked after packaging.

## Runtime limitation
Live Google Apps Script / Google Drive operations were not executed from this build environment. Those require the deployed Web App and real Google account/Drive permissions.
