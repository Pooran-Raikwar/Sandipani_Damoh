/* Central Admin Session — browser session only; leaving Admin clears the client token. */
window.AdminAuth={
  key:'sandipani_admin_session',
  expiryKey:'sandipani_admin_session_expiry',
  storage:sessionStorage,
  set(token,expiresAt){
    if(!token)return;
    const exp=Number(expiresAt||0);
    this.storage.setItem(this.key,String(token));
    this.storage.setItem(this.expiryKey,String(exp));
  },
  get(){
    try{
      return this.storage.getItem(this.key)||'';
    }catch(e){return '';}
  },
  getExpiry(){
    try{return Number(this.storage.getItem(this.expiryKey)||0);}catch(e){return 0;}
  },
  clear(){
    try{this.storage.removeItem(this.key);this.storage.removeItem(this.expiryKey);}catch(e){}
    /* Remove tokens left by older V25 builds. */
    try{localStorage.removeItem(this.key);localStorage.removeItem(this.expiryKey);}catch(e){}
  },
  touch(expiresAt){
    const t=Number(expiresAt)||Date.now()+5*60*60*1000;
    this.storage.setItem(this.expiryKey,String(t));
  },
  isEmbedded(){return new URLSearchParams(location.search).get('embedded')==='1' || (window.parent&&window.parent!==window);},
  isUnlocked(){
    const token=this.get();
    const exp=this.getExpiry();
    if(!token)return false;
    if(exp&&Date.now()>exp){this.clear();return false;}
    return true;
  },
  async verify(){
    const token=this.get();
    const exp=this.getExpiry();
    if(!token || (exp && Date.now()>exp)){this.clear();return false;}
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
