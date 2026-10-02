/* Sandipani Future Features: independent UI layer; does not replace API/backend. */
(()=>{
 const pages=[
  ['Home','index.html','Homepage and digital campus'],['Student Registration','student-registration.html','Add or register a student'],['Results','results.html','Search academic results'],['Gallery','gallery.html','Campus photos and activities'],['About','about.html','School and vocational information'],['Marks Entry','marks-entry.html','Enter academic marks'],['Admin Panel','admin.html?fresh=1','Secure administration portal for all management categories'],['Vocational','vocational.html','Vocational education information'],['Books & Notes','resources.html','Class 9th–12th vocational digital library'],['AI Assistant','ai-assistant.html','Real AI study assistant'],['Admission Test & Merit','admission-test.html','Admission test, seats and automatic merit']
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

// Universal loading is provided by js/loading-ui.js so it also covers scripts that run before DOMContentLoaded.

// Universal file-operation UX: upload progress, download feedback and image loading states.
(()=>{
 function progressBox(){let b=document.getElementById('fileProgress');if(b)return b;b=document.createElement('div');b.id='fileProgress';b.className='file-progress';b.innerHTML='<div class="fp-head"><span id="fpTitle">Working…</span><b id="fpPct">0%</b></div><div class="fp-track"><div id="fpBar" class="fp-bar"></div></div>';document.body.appendChild(b);return b;}
 function showProgress(title,pct){const b=progressBox();b.classList.add('show');document.getElementById('fpTitle').textContent=title;document.getElementById('fpPct').textContent=Math.round(pct)+'%';document.getElementById('fpBar').style.width=Math.max(0,Math.min(100,pct))+'%';}
 function hideProgress(delay=350){setTimeout(()=>document.getElementById('fileProgress')?.classList.remove('show'),delay);}
 function bind(){
  document.querySelectorAll('input[type="file"]').forEach(input=>{if(input.dataset.fileUx)return;input.dataset.fileUx='1';input.addEventListener('change',()=>{const files=[...input.files||[]];if(!files.length)return;const total=files.reduce((n,f)=>n+f.size,0)||1;let done=0;showProgress(files.length===1?'Preparing '+files[0].name:'Preparing '+files.length+' files',0);files.forEach(f=>{const reader=new FileReader();reader.onprogress=e=>{if(e.lengthComputable){const current=done+(e.loaded/e.total*f.size);showProgress('Reading '+f.name,current/total*100)}};reader.onloadend=()=>{done+=f.size;showProgress('Files ready',done/total*100);if(done>=total)hideProgress(500)};reader.readAsArrayBuffer(f)});});});
  document.querySelectorAll('a[download],button[data-download],.download-btn').forEach(a=>{if(a.dataset.downloadUx)return;a.dataset.downloadUx='1';a.addEventListener('click',()=>{showProgress('Preparing download…',35);setTimeout(()=>showProgress('Download ready',100),250);hideProgress(900)});});
  document.querySelectorAll('img').forEach(img=>{if(img.dataset.mediaUx)return;img.dataset.mediaUx='1';img.classList.add('media-loading');const done=()=>img.classList.add('media-loaded');if(img.complete)done();else img.addEventListener('load',done,{once:true});});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();
 const mo=new MutationObserver(()=>bind());mo.observe(document.documentElement,{childList:true,subtree:true});
})();
