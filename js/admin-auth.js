/* Central Admin Session v3 — one PIN creates a short-lived server session token. The PIN is never persisted. */
window.AdminAuth={
  key:'sandipani_admin_session', expiryKey:'sandipani_admin_session_expiry',
  storage:localStorage,
  set(token,expiresAt){localStorage.setItem(this.key,String(token||''));localStorage.setItem(this.expiryKey,String(expiresAt||0));sessionStorage.setItem(this.key,String(token||''));sessionStorage.setItem(this.expiryKey,String(expiresAt||0));},
  get(){return localStorage.getItem(this.key)||sessionStorage.getItem(this.key)||((window.parent&&window.parent!==window&&window.parent.AdminAuth)?window.parent.AdminAuth.get():'');},
  clear(){[localStorage,sessionStorage].forEach(s=>{s.removeItem(this.key);s.removeItem(this.expiryKey);});},
  touch(){const t=Date.now()+5*60*60*1000;localStorage.setItem(this.expiryKey,String(t));sessionStorage.setItem(this.expiryKey,String(t));},
  isEmbedded(){return new URLSearchParams(location.search).get('embedded')==='1' || (window.parent&&window.parent!==window);},
  isUnlocked(){
    const token=this.get(), exp=Number(localStorage.getItem(this.expiryKey)||sessionStorage.getItem(this.expiryKey)||0);
    if(!token || (exp && Date.now()>exp)){this.clear();return false;}
    return true;
  },
  async verify(){
    if(!this.isUnlocked())return false;
    try{const r=await API.verifyAdmin(this.get());if(r.valid){this.touch();return true;}this.clear();return false;}
    catch(e){window.__ADMIN_AUTH_ERROR=e;return false;}
  },
  async require(){
    if(await this.verify())return this.get();
    if(this.isEmbedded()){
      const box=document.getElementById('loginMsg');
      if(box){box.textContent='Admin session expired. Return to the main Admin Panel and unlock it once.';box.className='message error';box.style.display='block';}
      return null;
    }
    location.href='admin.html?auth=required'; return null;
  }
};
window.addEventListener('storage',e=>{if(e.key==='sandipani_admin_session'&&!e.newValue)AdminAuth.clear();});
