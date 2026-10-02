/* Central Admin Session — one PIN unlocks the entire Admin Control Room. */
window.AdminAuth={
  key:'sandipani_admin_pin',
  flag:'sandipani_admin_unlocked',
  timeKey:'sandipani_admin_last_active',
  maxAge:30*60*1000,
  set(pin){sessionStorage.setItem(this.key,String(pin||''));sessionStorage.setItem(this.flag,'1');sessionStorage.setItem(this.timeKey,String(Date.now()));},
  get(){return sessionStorage.getItem(this.key)||'';},
  clear(){sessionStorage.removeItem(this.key);sessionStorage.removeItem(this.flag);sessionStorage.removeItem(this.timeKey);},
  touch(){sessionStorage.setItem(this.timeKey,String(Date.now()));},
  isUnlocked(){
    const p=this.get(), ok=sessionStorage.getItem(this.flag)==='1', t=Number(sessionStorage.getItem(this.timeKey)||0);
    if(!p||!ok||!t||Date.now()-t>this.maxAge){this.clear();return false;}
    return true;
  },
  async verify(){
    if(!this.isUnlocked())return false;
    const p=this.get();
    try{const r=await API.verifyAdmin(p);if(r.valid){this.touch();return true;}this.clear();return false;}catch(e){return false;}
  },
  async require(){if(await this.verify())return this.get();location.href='admin.html?auth=required';return null;}
};
