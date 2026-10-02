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
      if(module==='contentLearning'){showTab('content'); setTimeout(()=>ContentAdmin.select('learningCourses'),0); return;}
      if(module==='contentPractical'){showTab('content'); setTimeout(()=>ContentAdmin.select('practicalModules'),0); return;}
      if(module==='contentQuiz'||module==='quiz'){showTab('content'); setTimeout(()=>ContentAdmin.select('quizBank'),0); return;}
      const urls={
        learning:'learning-hub.html',
        practical:'practical-lab.html',
        quizPublic:'quiz.html',
        skillPublic:'skill-passport.html',
        gallery:'gallery-manager.html?embedded=1&central=1&v=25',
        books:'admin-advanced.html?embedded=1&central=1&v=25#resources',
        content:'admin-advanced.html?embedded=1&central=1&v=25#notice',
        staff:'admin-advanced.html?embedded=1&central=1&v=25#staff',
        documents:'admin-advanced.html?embedded=1&central=1&v=25#docs',
        marks:'marks-entry.html?embedded=1&central=1&v=25',
        results:'results.html?embedded=1&v=25',
        quiz:'quiz-admin.html?embedded=1&central=1&v=25'
      };
      if(!urls[module])return;
      workspace.classList.remove('hidden');
      frame.src='about:blank';
      const loader=workspace.querySelector('.central-frame-loading');
      if(loader) loader.classList.remove('hidden');
      frame.onload=()=>{
        if(loader) loader.classList.add('hidden');
        // Same-origin session bridge: send the already verified central PIN to embedded admin modules
        // without putting the PIN in the URL. This keeps one-login behaviour reliable in iframe mode.
        try{
          const pin=window.AdminAuth&&AdminAuth.get&&AdminAuth.get();
          if(pin) frame.contentWindow.postMessage({type:'sandipani-admin-session',pin},location.origin);
        }catch(e){}
      };
      frame.onerror=()=>{if(loader){loader.classList.remove('hidden');loader.textContent='Module could not be loaded. Please refresh the Admin Panel.';}};
      setTimeout(()=>{frame.src=urls[module];},30);
      workspace.scrollIntoView({behavior:'smooth',block:'start'});
    },
    close(){
      $('centralWorkspace')?.classList.add('hidden');
      document.querySelectorAll('.admin-module-btn').forEach(b=>b.classList.remove('active'));
    }
  };
})();
