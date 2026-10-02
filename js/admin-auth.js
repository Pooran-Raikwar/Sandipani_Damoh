/* Central Admin Session v2 — one PIN unlocks every admin module until explicit logout. */
window.AdminAuth={
  key:'sandipani_admin_pin', flag:'sandipani_admin_unlocked', timeKey:'sandipani_admin_last_active',
  storage:localStorage,
  set(pin){const v=String(pin||'');localStorage.setItem(this.key,v);localStorage.setItem(this.flag,'1');localStorage.setItem(this.timeKey,String(Date.now()));sessionStorage.setItem(this.key,v);sessionStorage.setItem(this.flag,'1');sessionStorage.setItem(this.timeKey,String(Date.now()));},
  get(){return localStorage.getItem(this.key)||sessionStorage.getItem(this.key)||((window.parent&&window.parent!==window&&window.parent.AdminAuth)?window.parent.AdminAuth.get():'');},
  clear(){[localStorage,sessionStorage].forEach(s=>{s.removeItem(this.key);s.removeItem(this.flag);s.removeItem(this.timeKey);});},
  touch(){const t=String(Date.now());localStorage.setItem(this.timeKey,t);localStorage.setItem(this.flag,'1');sessionStorage.setItem(this.timeKey,t);sessionStorage.setItem(this.flag,'1');},
  isEmbedded(){return new URLSearchParams(location.search).get('embedded')==='1' || (window.parent&&window.parent!==window);},
  isUnlocked(){
    const p=this.get();
    const ok=!!p && (localStorage.getItem(this.flag)==='1'||sessionStorage.getItem(this.flag)==='1'||(window.parent&&window.parent!==window&&window.parent.AdminAuth&&window.parent.AdminAuth.isUnlocked()));
    if(!p||!ok){this.clear();return false;}
    this.touch();
    return true;
  },
  async verify(){
    if(!this.isUnlocked())return false;
    const p=this.get();
    try{const r=await API.verifyAdmin(p);if(r.valid){this.touch();return true;}this.clear();return false;}catch(e){window.__ADMIN_AUTH_ERROR=e;return false;}
  },
  async require(){
    if(await this.verify())return this.get();
    if(this.isEmbedded()){
      const box=document.getElementById('loginMsg');
      if(box){box.textContent='Admin access is not unlocked in this browser. Return to the main Admin Panel, enter the PIN once, then open this module again.';box.className='message error';box.style.display='block';}
      return null;
    }
    location.href='admin.html?auth=required'; return null;
  }
};
