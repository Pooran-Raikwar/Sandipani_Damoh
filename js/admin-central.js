/* V25 Native Single-Page Admin Control Room — no iframe/module HTML loading. */
(function(){
  const $=id=>document.getElementById(id);
  let currentModule='';
  function setActive(module){document.querySelectorAll('.admin-module-btn').forEach(b=>b.classList.toggle('active',b.dataset.module===module));}
  function hideAll(){
    document.querySelectorAll('#nativeManagementArea .native-admin-area').forEach(x=>x.classList.add('hidden'));
    document.querySelectorAll('#nativeManagementArea .panel').forEach(x=>x.classList.add('hidden'));
    $('centralWorkspace')?.classList.add('hidden');
    $('nativeManagementArea')?.classList.remove('hidden');
  }
  async function openNative(module){
    currentModule=module; setActive(module); hideAll();
    if(['students','skills','industry','admission','settings','contentLearning','contentPractical','contentQuiz'].includes(module)){
      if(module==='contentLearning'){showTab('content');setTimeout(()=>ContentAdmin.select('learningCourses'),0);return;}
      if(module==='contentPractical'){showTab('content');setTimeout(()=>ContentAdmin.select('practicalModules'),0);return;}
      if(module==='contentQuiz'){showTab('content');setTimeout(()=>ContentAdmin.select('quizBank'),0);return;}
      showTab(module); return;
    }
    const areaMap={gallery:'nativeGalleryArea',marks:'nativeMarksArea',books:'nativeAdvancedArea',content:'nativeAdvancedArea',staff:'nativeAdvancedArea',documents:'nativeAdvancedArea',quiz:'nativeQuizArea',automationGuestApplication:'nativeAutomationArea',automationGuestAutomatic:'nativeAutomationArea',automationGuestReport:'nativeAutomationArea',automationIndustryReport:'nativeAutomationArea',automationMarks:'nativeAutomationArea'};
    const area=$(areaMap[module]); if(!area)return; $('nativeManagementArea')?.classList.remove('hidden'); area.classList.remove('hidden');
    if(module==='gallery'){ if(window.bootGalleryAdmin) await window.bootGalleryAdmin(); $('nativeGalleryPanel')?.classList.remove('hidden'); }
    else if(module==='marks'){ if(window.bootMarksAdmin) await window.bootMarksAdmin(); $('nativeMarksPanel')?.classList.remove('hidden'); }
    else if(['books','content','staff','documents'].includes(module)){
      if(window.bootAdvancedAdmin) await window.bootAdvancedAdmin();
      const target={books:'resources',content:'notice',staff:'staff',documents:'docs'}[module];
      if(window.tab) window.tab(target);
    }
    else if(module.startsWith('automation')){ const key=module.replace(/^automation/,'').replace(/^GuestApplication$/,'GuestApplication'); const map={GuestApplication:'guestApplication',GuestAutomatic:'guestAutomatic',GuestReport:'guestReport',IndustryReport:'industryReport',Marks:'marksAutomation'}; NativeAutomation.open(map[module.replace(/^automation/,'')]||'guestApplication'); }
    else if(module==='quiz'){
      if(window.bootQuizAdmin) await window.bootQuizAdmin();
      $('nativeQuizManager')?.classList.remove('hidden');
      $('nativeQuizGate')?.classList.add('hidden');
    }
    $('nativeManagementArea')?.scrollIntoView({behavior:'smooth',block:'start'});
  }
  window.AdminCentral={
    open:openNative,
    reload(){return currentModule?openNative(currentModule):null;},
    close(){currentModule='';setActive('');document.querySelectorAll('#nativeManagementArea .native-admin-area').forEach(x=>x.classList.add('hidden'));$('nativeManagementArea')?.classList.add('hidden');}
  };
})();
