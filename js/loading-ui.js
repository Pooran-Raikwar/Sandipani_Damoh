/* Sandipani Loading UX for form/API operations only.
   Backend/API functionality is unchanged. */

(() => {
  const STYLE_ID = 'sandipani-loading-ui-style';
  const OVERLAY_ID = 'sandipani-loading-overlay';

  function ensureStyle(){
    if(document.getElementById(STYLE_ID)) return;
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      #${OVERLAY_ID}{
        position:fixed;
        inset:0;
        z-index:99999;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:24px;
        box-sizing:border-box;
        background:rgba(255,255,255,.78);
        backdrop-filter:blur(3px);
        -webkit-backdrop-filter:blur(3px);
      }
      #${OVERLAY_ID}[hidden]{display:none!important}
      #${OVERLAY_ID} .sandipani-loading-card{
        width:min(390px,92vw);
        box-sizing:border-box;
        padding:30px 28px;
        text-align:center;
        background:#fff;
        border:1px solid rgba(11,79,163,.12);
        border-radius:16px;
        box-shadow:0 14px 40px rgba(0,0,0,.16);
      }
      #${OVERLAY_ID} .sandipani-spinner{
        width:46px;
        height:46px;
        margin:0 auto 18px;
        border:5px solid #e5e7eb;
        border-top-color:#0b4fa3;
        border-radius:50%;
        animation:sandipaniLoadingSpin .8s linear infinite;
        box-sizing:border-box;
      }
      #${OVERLAY_ID} .sandipani-loading-title{
        margin:0;
        font-size:20px;
        line-height:1.35;
        font-weight:700;
        color:#0b4fa3;
      }
      #${OVERLAY_ID} .sandipani-loading-text{
        margin:8px 0 0;
        font-size:14px;
        line-height:1.5;
        color:#64748b;
      }
      #${OVERLAY_ID} .sandipani-loading-dots::after{
        content:'...';
        display:inline-block;
        width:18px;
        overflow:hidden;
        vertical-align:bottom;
        animation:sandipaniLoadingDots 1.2s steps(4,end) infinite;
      }
      .loading{
        min-height:170px;
        display:flex!important;
        align-items:center;
        justify-content:center;
        text-align:center;
        font-size:18px!important;
        font-weight:600;
        color:#0b4fa3;
      }
      @keyframes sandipaniLoadingSpin{to{transform:rotate(360deg)}}
      @keyframes sandipaniLoadingDots{0%{width:0}100%{width:18px}}
    `;
    document.head.appendChild(style);
  }

  function getOverlay(){
    let overlay=document.getElementById(OVERLAY_ID);
    if(overlay) return overlay;

    overlay=document.createElement('div');
    overlay.id=OVERLAY_ID;
    overlay.hidden=true;
    overlay.setAttribute('role','status');
    overlay.setAttribute('aria-live','polite');
    overlay.innerHTML=`
      <div class="sandipani-loading-card">
        <div class="sandipani-spinner" aria-hidden="true"></div>
        <p class="sandipani-loading-title"></p>
        <p class="sandipani-loading-text"><span class="sandipani-loading-dots"></span></p>
      </div>
    `;
    document.body.appendChild(overlay);
    return overlay;
  }

  function show(title='Please wait',text='Processing your request'){
    ensureStyle();
    const overlay=getOverlay();
    overlay.querySelector('.sandipani-loading-title').textContent=title;
    overlay.querySelector('.sandipani-loading-text').textContent=text;
    overlay.hidden=false;
    document.body.style.overflow='hidden';
  }

  function hide(){
    const overlay=document.getElementById(OVERLAY_ID);
    if(overlay) overlay.hidden=true;
    document.body.style.overflow='';
  }

  function forceHide(){hide();}

  function boot(){
    ensureStyle();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',boot,{once:true});
  }else{
    boot();
  }

  window.SandipaniLoading={show,hide,forceHide};
})();
