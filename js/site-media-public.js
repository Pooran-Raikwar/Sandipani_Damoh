/* Sandipani Public Site Media Loader
   Fast cached loader for school-logo and teacher-profile.
   Uses the existing Google Sheets/Drive source; no design changes.
*/
(() => {
  const url = (typeof CONFIG !== 'undefined' && CONFIG.API_URL) || '';
  const CACHE_KEY = 'sandipani_site_media_cache_v1';
  const TTL = 10 * 60 * 1000;

  function apply(rows){
    if(!Array.isArray(rows)) return;
    rows.forEach(item=>{
      const key=String(item.Key||'').trim();
      const src=String(item['Image URL']||item.url||item.URL||'').trim();
      if(!key||!src)return;
      document.querySelectorAll(`[data-site-image="${CSS.escape(key)}"]`).forEach(img=>{
        const localSrc=img.getAttribute('src');
        img.onerror=()=>{img.onerror=null;if(localSrc)img.src=localSrc;};
        img.src=src;
      });
    });
  }
  function readCache(){try{return JSON.parse(localStorage.getItem(CACHE_KEY)||'null');}catch(e){return null;}}
  function writeCache(rows){try{localStorage.setItem(CACHE_KEY,JSON.stringify({time:Date.now(),rows}));}catch(e){}}
  async function refresh(){
    if(!url)return;
    try{
      const response=await fetch(url,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action:'siteMediaList'})});
      const result=JSON.parse(await response.text());
      if(!result||result.ok===false)return;
      const rows=Array.isArray(result.data)?result.data:[];
      apply(rows);writeCache(rows);
    }catch(error){console.warn('Site media could not be loaded:',error);}
  }
  function start(){
    const cached=readCache();
    if(cached&&Array.isArray(cached.rows))apply(cached.rows);
    if(!cached || Date.now()-Number(cached.time||0)>TTL) refresh();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
