/* Central Admin Session — ONE PIN unlocks every admin module. */
window.AdminAuth={
  key:'sandipani_admin_pin', flag:'sandipani_admin_unlocked', timeKey:'sandipani_admin_last_active',
  maxAge:30*60*1000,
  set(pin){sessionStorage.setItem(this.key,String(pin||''));sessionStorage.setItem(this.flag,'1');sessionStorage.setItem(this.timeKey,String(Date.now()));},
  get(){return sessionStorage.getItem(this.key)||((window.parent&&window.parent!==window&&window.parent.AdminAuth)?window.parent.AdminAuth.get():'');},
  clear(){sessionStorage.removeItem(this.key);sessionStorage.removeItem(this.flag);sessionStorage.removeItem(this.timeKey);},
  touch(){sessionStorage.setItem(this.timeKey,String(Date.now()));},
  isEmbedded(){return new URLSearchParams(location.search).get('embedded')==='1' || (window.parent&&window.parent!==window);},
  isUnlocked(){
    const p=this.get(), ok=sessionStorage.getItem(this.flag)==='1' || (window.parent&&window.parent!==window&&window.parent.AdminAuth&&window.parent.AdminAuth.isUnlocked());
    const t=Number(sessionStorage.getItem(this.timeKey)||0);
    if(!p||(!ok && (!t||Date.now()-t>this.maxAge))){this.clear();return false;}
    if(!t && ok) this.touch();
    if(t && Date.now()-t>this.maxAge){this.clear();return false;}
    return true;
  },
  async verify(){
    if(!this.isUnlocked())return false;
    const p=this.get();
    try{const r=await API.verifyAdmin(p);if(r.valid){this.touch();return true;}this.clear();return false;}catch(e){return false;}
  },
  async require(){
    if(await this.verify())return this.get();
    if(this.isEmbedded()){
      const box=document.getElementById('loginMsg'); if(box){box.textContent='Admin session expired. Return to the main Admin Panel and unlock it once.';box.className='message error';box.style.display='block';}
      return null;
    }
    location.href='admin.html?auth=required'; return null;
  }
};
