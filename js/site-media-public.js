/* Sandipani Public Site Media Loader
   Loads school-logo and teacher-profile from Google Sheets/Drive.
*/

(() => {
  const url = (typeof CONFIG !== 'undefined' && CONFIG.API_URL) || '';

  async function loadSiteMedia() {
    if (!url) return;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify({
          action: 'siteMediaList'
        })
      });

      const text = await response.text();
      const result = JSON.parse(text);

      if (!result || result.ok === false) return;

      const rows = Array.isArray(result.data) ? result.data : [];

      rows.forEach(item => {
        const key = String(item.Key || '').trim();
        const src = String(
          item['Image URL'] ||
          item.url ||
          item.URL ||
          ''
        ).trim();

        if (!key || !src) return;

        document
          .querySelectorAll(`[data-site-image="${CSS.escape(key)}"]`)
          .forEach(img => {

            const localSrc = img.getAttribute('src');

            // Force browser to request the current Drive image
            const finalSrc =
              src + (src.includes('?') ? '&' : '?') +
              'v=' + Date.now();

            img.onerror = () => {
              img.onerror = null;
              if (localSrc) img.src = localSrc;
            };

            img.src = finalSrc;
          });
      });

    } catch (error) {
      console.warn('Site media could not be loaded:', error);
    }
  }

  function start() {
    loadSiteMedia();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
