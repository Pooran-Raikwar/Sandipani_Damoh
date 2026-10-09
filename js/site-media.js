/* Site-wide image manager: teacher profile + school logo. */
(()=>{
  const API_URL=()=>localStorage.getItem('sandipani_api_url')||((typeof CONFIG!=='undefined'&&CONFIG.API_URL)||'');
  let PIN='';
  const $=id=>document.getElementById(id);
  const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));

  async function call(action,data={}){
    const url=API_URL();
    if(!url)throw new Error('Google Apps Script URL is not configured.');
    const r=await fetch(url,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action,...data})});
    const t=await r.text();
    let o;try{o=JSON.parse(t)}catch(e){throw new Error('Invalid backend response.');}
    if(o.ok===false)throw new Error(o.error||'Request failed');
    return o.data;
  }

  function cacheBust(url){
    if(!url)return '';
    return url+(url.includes('?')?'&':'?')+'v='+Date.now();
  }

  function updateImages(key,url){
    if(!url)return;
    document.querySelectorAll(`[data-site-image="${CSS.escape(String(key))}"]`).forEach(img=>{
      img.src=cacheBust(url);
    });
  }

  function bindButtons(){
    const box=$('siteMediaList');
    if(!box)return;
    box.querySelectorAll('.site-media-upload').forEach(btn=>{
      btn.onclick=()=>replace(btn.dataset.key,btn.previousElementSibling);
    });
  }

  async function load(){
    const box=$('siteMediaList');
    if(!box)return;

    /* Render controls immediately; backend latency must not block the UI. */
    box.innerHTML=`
      <div class="manager-card">
        <div class="body"><b>Teacher Profile</b><small>Teacher profile photo</small>
          <input type="file" accept="image/*" data-key="teacher-profile">
          <button class="btn primary site-media-upload" data-key="teacher-profile">Replace Image</button>
        </div>
      </div>
      <div class="manager-card">
        <div class="body"><b>School Logo</b><small>School website logo</small>
          <input type="file" accept="image/*" data-key="school-logo">
          <button class="btn primary site-media-upload" data-key="school-logo">Replace Image</button>
        </div>
      </div>`;
    bindButtons();

    try{
      const rows=await call('siteMediaList');
      if(Array.isArray(rows)&&rows.length){
        box.innerHTML=rows.map(x=>`<div class="manager-card">
          <img src="${esc(x['Image URL']||'')}" alt="${esc(x.Title||x.Key)}" loading="lazy" onerror="this.style.display='none'">
          <div class="body"><b>${esc(x.Title||x.Key)}</b><small>${esc(x.Description||'')}</small>
            <input type="file" accept="image/*" data-key="${esc(x.Key)}">
            <button class="btn primary site-media-upload" data-key="${esc(x.Key)}">Replace Image</button>
          </div>
        </div>`).join('');
        bindButtons();
      }
    }catch(e){console.warn('Site media data load failed:',e);}
  }

  async function replace(key,input){
    const f=input?.files?.[0];
    if(!f)return alert('Select an image first.');
    if(!/^image\//i.test(f.type))return alert('Only image files are allowed.');
    if(f.size>8*1024*1024)return alert('Maximum 8 MB.');
    const btn=input.parentElement.querySelector('.site-media-upload');
    const old=btn?.textContent||'Replace Image';
    try{
      const pin=PIN||(window.AdminAuth&&AdminAuth.get&&AdminAuth.get())||'';
      if(!pin)throw new Error('Admin session expired. Please return to Admin Panel and unlock it once.');
      if(btn){btn.disabled=true;btn.textContent='⏳ Uploading…';}
      const reader=new FileReader();
      const base64=await new Promise((resolve,reject)=>{reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(f);});
      const result=await call('siteMediaSave',{pin,data:{key,base64,mimeType:f.type,fileName:f.name}});
      const url=result?.url||'';
      /* Immediate local UI update — no page reload and no second API round-trip. */
      updateImages(key,url);
      try{localStorage.removeItem('sandipani_site_media_cache_v1');}catch(e){}
      if(btn){btn.textContent='✓ Updated';}
      input.value='';
      setTimeout(()=>{if(btn){btn.disabled=false;btn.textContent=old;}},1200);
    }catch(e){
      if(btn){btn.disabled=false;btn.textContent=old;}
      alert(e.message||'Image upload failed.');
    }
  }

  window.SiteMedia={load,setPin:p=>{PIN=String(p||'');load();}};
  document.addEventListener('DOMContentLoaded',()=>{
    const box=$('siteMediaList');
    if(box)load();
  },{once:true});
})();
