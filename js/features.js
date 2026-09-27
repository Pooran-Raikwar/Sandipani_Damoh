/* Sandipani Future Features: independent UI layer; does not replace API/backend. */
(()=>{
 const pages=[
  ['Home','index.html','Homepage and digital campus'],['Student Registration','student-registration.html','Add or register a student'],['Results','results.html','Search academic results'],['Gallery','gallery.html','Campus photos and activities'],['About','about.html','School and vocational information'],['Marks Entry','marks-entry.html','Enter academic marks'],['Admin Dashboard','admin.html','Secure administration portal'],['Gallery Manager','gallery-manager.html','Manage gallery content'],['Vocational','vocational.html','Vocational education information'],['Books & Notes','resources.html','Class 9th–12th vocational digital library'],['AI Assistant','ai-assistant.html','Real AI study assistant'],['Advanced Admin','admin-advanced.html','Command center for resources and management']
 ];
 const norm=s=>(s||'').toLowerCase().replace(/[^a-z0-9\s-]/g,'');
 function inject(){
  if(document.body.dataset.futureUi==='1')return; document.body.dataset.futureUi='1';
  const header=document.querySelector('.modern-top,.top'); if(!header)return;
  const nav=header.querySelector('.nav');
  if(nav){const b=document.createElement('button'); b.className='future-search-btn'; b.type='button'; b.innerHTML='⌕ <span>Search</span>'; b.onclick=openSearch; nav.appendChild(b); const t=document.createElement('button'); t.className='future-theme-btn'; t.type='button'; t.textContent=localStorage.getItem('sandipani-theme')==='dark'?'☀':'☾'; t.title='Toggle theme'; t.onclick=toggleTheme; nav.appendChild(t);}
  applyTheme();
  if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(()=>{});
 }
 function toggleTheme(){const d=document.documentElement; const dark=d.classList.toggle('dark-mode'); localStorage.setItem('sandipani-theme',dark?'dark':'light'); const b=document.querySelector('.future-theme-btn'); if(b)b.textContent=dark?'☀':'☾';}
 function applyTheme(){if(localStorage.getItem('sandipani-theme')==='dark')document.documentElement.classList.add('dark-mode');}
 function openSearch(){
  closeSearch(); const m=document.createElement('div'); m.className='search-overlay'; m.id='futureSearch'; m.innerHTML='<div class="search-box"><div class="search-head"><div><span class="section-kicker">CAMPUS SEARCH</span><h2>What are you looking for?</h2></div><button class="search-close" aria-label="Close">×</button></div><input id="globalSearchInput" autocomplete="off" placeholder="Search registration, results, gallery, admin..."/><div id="globalSearchResults"></div><div class="search-hint">Press <b>Esc</b> to close</div></div>'; document.body.appendChild(m); m.querySelector('.search-close').onclick=closeSearch; m.onclick=e=>{if(e.target===m)closeSearch()}; const i=m.querySelector('#globalSearchInput'); i.oninput=()=>renderResults(i.value); i.focus(); renderResults(''); }
 function renderResults(q){const box=document.querySelector('#globalSearchResults'); if(!box)return; const x=norm(q); const hits=pages.filter(p=>!x||norm(p.join(' ')).includes(x)); box.innerHTML=hits.map(p=>`<a class="search-result" href="${p[1]}"><span>${p[0]}</span><small>${p[2]}</small><b>→</b></a>`).join('')||'<div class="no-results">No matching campus service found.</div>';}
 function closeSearch(){document.querySelector('#futureSearch')?.remove()}
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeSearch(); if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch()}});
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',inject);else inject();
})();

// Premium UX: global loading/search feedback and broken-image recovery.
(()=>{
 function ensureLoader(){
  if(document.getElementById('globalWait'))return;
  const d=document.createElement('div');d.id='globalWait';d.className='global-wait';d.innerHTML='<div class="wait-card"><div class="wait-spinner"></div><b>Loading campus...</b><span>Please wait</span></div>';document.body.appendChild(d);
 }
 function show(){ensureLoader();document.getElementById('globalWait').classList.add('show');}
 function hide(){document.getElementById('globalWait')?.classList.remove('show');}
 const nativeFetch=window.fetch;
 window.fetch=async function(...args){show();try{return await nativeFetch.apply(this,args)}finally{hide()}};
 document.addEventListener('DOMContentLoaded',()=>{
   document.querySelectorAll('img').forEach(img=>{if(!img.dataset.localFallback)img.dataset.localFallback=img.getAttribute('src')||'';img.addEventListener('error',()=>{if(img.dataset.localFallback && img.src!==new URL(img.dataset.localFallback,document.baseURI).href){img.src=img.dataset.localFallback;}});});
   document.querySelectorAll('form').forEach(form=>form.addEventListener('submit',()=>show()));
   document.querySelectorAll('a[href]').forEach(a=>{const href=a.getAttribute('href')||'';if(!href||href.startsWith('#')||href.startsWith('http')||href.startsWith('mailto:')||href.startsWith('javascript:'))return;a.addEventListener('click',()=>{show();setTimeout(hide,7000)});});
   setTimeout(hide,5000);
 });
})();
