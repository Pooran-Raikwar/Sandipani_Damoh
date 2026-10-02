/* Central Admin Control Room - additive orchestration layer. */
(function(){
  const $=id=>document.getElementById(id);
  window.AdminCentral={
    open(module){
      document.querySelectorAll('.admin-module-btn').forEach(b=>b.classList.toggle('active',b.dataset.module===module));
      document.querySelectorAll('.panel').forEach(p=>p.classList.add('hidden'));
      const workspace=$('centralWorkspace');
      const frame=$('centralFrame');
      if(module==='students'){showTab('students'); return;}
      if(module==='skills'){showTab('skills'); return;}
      if(module==='industry'){showTab('industry'); return;}
      if(module==='admission'){showTab('admission'); return;}
      if(module==='settings'){showTab('settings'); return;}
      const urls={
        gallery:'gallery-manager.html?embedded=1',
        books:'admin-advanced.html?embedded=1#resources',
        content:'admin-advanced.html?embedded=1#notice',
        staff:'admin-advanced.html?embedded=1#staff',
        documents:'admin-advanced.html?embedded=1#docs',
        marks:'marks-entry.html?embedded=1',
        results:'results.html?embedded=1',
        quiz:'quiz-admin.html?embedded=1'
      };
      if(!urls[module])return;
      workspace.classList.remove('hidden');
      frame.src=urls[module];
      workspace.scrollIntoView({behavior:'smooth',block:'start'});
    },
    close(){
      $('centralWorkspace')?.classList.add('hidden');
      document.querySelectorAll('.admin-module-btn').forEach(b=>b.classList.remove('active'));
    }
  };
})();
