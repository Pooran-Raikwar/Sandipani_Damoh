/* Central Admin Session — one PIN unlocks all admin-only tools for this browser session. */
window.AdminAuth={
  key:'sandipani_admin_pin',
  set(pin){sessionStorage.setItem(this.key,String(pin||''));sessionStorage.setItem('sandipani_admin_unlocked','1');},
  get(){return sessionStorage.getItem(this.key)||'';},
  clear(){sessionStorage.removeItem(this.key);sessionStorage.removeItem('sandipani_admin_unlocked');},
  isUnlocked(){return !!this.get() && sessionStorage.getItem('sandipani_admin_unlocked')==='1';},
  async verify(){const p=this.get();if(!p)return false;try{const r=await API.verifyAdmin(p);return !!r.valid;}catch(e){return false;}},
  async require(){if(await this.verify())return this.get();location.href='admin.html?auth=required';return null;}
};
