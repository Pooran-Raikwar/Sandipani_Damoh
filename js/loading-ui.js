/* Sandipani Universal Loading UX — additive only. */
(()=>{
  const state={depth:0,timer:null};
  function ensure(){
    let el=document.getElementById('globalWait');
    if(el)return el;
    el=document.createElement('div');el.id='globalWait';el.className='global-wait';
    el.innerHTML='<div class="wait-card" role="status" aria-live="polite"><div class="wait-orbit"><i></i><span>SD</span></div><div class="wait-title" id="globalWaitTitle">Preparing Sandipani Campus</div><div class="wait-sub" id="globalWaitSub">Please wait…</div><div class="wait-progress"><i></i></div></div>';
    (document.body||document.documentElement).appendChild(el);return el;
  }
  function show(title='Preparing Sandipani Campus',sub='Please wait while this page is loading…'){
    const el=ensure(); el.querySelector('#globalWaitTitle').textContent=title;el.querySelector('#globalWaitSub').textContent=sub;el.classList.add('show');state.depth++;clearTimeout(state.timer);state.timer=setTimeout(()=>{state.depth=0;hide()},15000);
  }
  function hide(force=false){if(force)state.depth=0;else state.depth=Math.max(0,state.depth-1);if(state.depth===0)document.getElementById('globalWait')?.classList.remove('show');}
  window.SandipaniLoading={show,hide,forceHide:()=>hide(true)};

  const nativeFetch=window.fetch;
  window.fetch=async function(...args){
    const isApi=typeof args[0]==='string' && (args[0].includes('script.google.com')||args[0].includes('/api'));
    if(isApi)show('Connecting to Sandipani', 'Loading data securely…');
    try{return await nativeFetch.apply(this,args)}
    finally{if(isApi)hide();}
  };

  function bind(){
    document.querySelectorAll('input[type=file]').forEach(input=>{
      if(input.dataset.loadingUx)return;input.dataset.loadingUx='1';
      input.addEventListener('change',()=>{const files=[...input.files||[]];if(!files.length)return;show('Preparing upload','Reading selected file…');setTimeout(()=>hide(),700);});
    });
    document.querySelectorAll('a[download],button[data-download],.download-btn').forEach(el=>{
      if(el.dataset.loadingDownload)return;el.dataset.loadingDownload='1';
      el.addEventListener('click',()=>{show('Preparing download','Your file is being prepared…');setTimeout(()=>hide(),1200);});
    });
    document.querySelectorAll('button,[role=button],a').forEach(el=>{
      if(el.dataset.loadingPrint)return;
      const t=(el.textContent||'').toLowerCase();
      if(/print|pdf|generate report|export/.test(t)){
        el.dataset.loadingPrint='1';el.addEventListener('click',()=>{show('Preparing document','Generating the print-ready file…');setTimeout(()=>hide(),1200);});
      }
    });
    document.querySelectorAll('img').forEach(img=>{
      if(img.dataset.loadingImg)return;img.dataset.loadingImg='1';
      img.classList.add('media-loading');
      const done=()=>img.classList.add('media-loaded');
      if(img.complete)done();else img.addEventListener('load',done,{once:true});
    });
  }
  function ready(){
    bind();
    // Initial navigation/API work is often started by scripts that run before DOMContentLoaded.
    setTimeout(()=>{if(!document.querySelector('.loading,.form-skeleton,.gallery-loading'))forceHide()},8000);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
  new MutationObserver(bind).observe(document.documentElement,{childList:true,subtree:true});
})();
