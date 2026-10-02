/* Central Admin Session v4 — one PIN creates a server session token shared by all admin modules. */
window.AdminAuth={
  key:'sandipani_admin_session',
  expiryKey:'sandipani_admin_session_expiry',
  storage:localStorage,
  set(token,expiresAt){
    if(!token)return;
    const exp=Number(expiresAt||0);
    localStorage.setItem(this.key,String(token));
    localStorage.setItem(this.expiryKey,String(exp));
    sessionStorage.setItem(this.key,String(token));
    sessionStorage.setItem(this.expiryKey,String(exp));
  },
  get(){
    try{
      const own=localStorage.getItem(this.key)||sessionStorage.getItem(this.key)||'';
      if(own)return own;
      if(window.parent&&window.parent!==window&&window.parent.AdminAuth&&window.parent.AdminAuth.get){
        return window.parent.AdminAuth.get()||'';
      }
    }catch(e){}
    return '';
  },
  getExpiry(){
    const a=Number(localStorage.getItem(this.expiryKey)||0);
    const b=Number(sessionStorage.getItem(this.expiryKey)||0);
    if(a||b)return Math.max(a,b);
    try{
      if(window.parent&&window.parent!==window&&window.parent.AdminAuth&&window.parent.AdminAuth.getExpiry){
        return Number(window.parent.AdminAuth.getExpiry()||0);
      }
    }catch(e){}
    return 0;
  },
  clear(){
    [localStorage,sessionStorage].forEach(s=>{s.removeItem(this.key);s.removeItem(this.expiryKey);});
  },
  touch(expiresAt){
    const t=Number(expiresAt)||Date.now()+5*60*60*1000;
    localStorage.setItem(this.expiryKey,String(t));
    sessionStorage.setItem(this.expiryKey,String(t));
  },
  isEmbedded(){return new URLSearchParams(location.search).get('embedded')==='1' || (window.parent&&window.parent!==window);},
  async verify(){
    const token=this.get();
    const exp=this.getExpiry();
    if(!token || (exp && Date.now()>exp)){this.clear();return false;}
    /* In an embedded module, ask the already-unlocked parent first. This avoids
       a second login and also keeps the server-side session as the authority. */
    try{
      if(window.parent&&window.parent!==window&&window.parent.AdminAuth&&window.parent.AdminAuth!==this){
        const parentAuth=window.parent.AdminAuth;
        if(await parentAuth.verify()){
          const parentToken=parentAuth.get();
          const parentExp=parentAuth.getExpiry?parentAuth.getExpiry():0;
          this.set(parentToken,parentExp);
          return true;
        }
      }
    }catch(e){}
    try{
      const r=await API.verifyAdmin(token);
      if(r&&r.valid){this.touch(exp||Date.now()+5*60*60*1000);return true;}
      this.clear();return false;
    }catch(e){window.__ADMIN_AUTH_ERROR=e;return false;}
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
window.addEventListener('storage',e=>{
  if(e.key==='sandipani_admin_session'&&!e.newValue)AdminAuth.clear();
  if(e.key==='sandipani_admin_session_expiry'&&!e.newValue)AdminAuth.clear();
});
