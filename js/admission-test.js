(function(){
'use strict';
const $=id=>document.getElementById(id);
let tests=[],activeTest=null,student=null,answers={},index=0,timer=null,seconds=30*60;

function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function openModal(html){$('adModalBody').innerHTML=html;$('adModal').classList.remove('hidden');}
function closeModal(){if(timer){clearInterval(timer);timer=null;}$('adModal').classList.add('hidden');}
$('adClose').onclick=closeModal;
$('refreshTests').onclick=loadTests;
window.closeModal=closeModal;
window.startDetails=startDetails;
window.beginExam=beginExam;

async function loadTests(){
  $('testGrid').innerHTML='<div class="ad-empty"><div>⏳</div><h3>Loading tests…</h3><p>Checking the current admission schedule.</p></div>';
  try{
    tests=await API.getAdmissionPublicTests()||[];
    $('availableCount').textContent=tests.length;
    $('testEmpty').classList.toggle('hidden',!tests.length);
    $('testGrid').innerHTML=tests.map(t=>`<article class="ad-test-card"><div class="ad-test-top"><span class="ad-kicker">${esc(t.academicYear)}</span><span class="ad-badge">OPEN</span></div><h3>${esc(t.class)} • ${esc(t.trade)}</h3><p>${esc(t.jobRole||'Admission Assessment')} ${t.notes?'<br>'+esc(t.notes):''}</p><div class="ad-meta"><div><small>Questions</small><b>${esc(t.questionCount)}</b></div><div><small>Max Marks</small><b>${esc(t.maxMarks)}</b></div><div><small>Seats</small><b>${esc(t.totalSeats)}</b></div><div><small>Test Date</small><b>${esc(t.testDate||'As scheduled')}</b></div></div><button class="ad-btn primary" onclick='startDetails(${JSON.stringify(t.testId)})'>Start Test →</button></article>`).join('');
  }catch(e){$('availableCount').textContent='0';$('testGrid').innerHTML='<div class="ad-empty"><div>⚠️</div><h3>Admission service unavailable</h3><p>Please refresh after checking the internet connection.</p></div>';}
}
function startDetails(testId){
  const t=tests.find(x=>String(x.testId)===String(testId));
  const cls=String(t&&t.class||'').trim();
  const senior=cls==='11th'||cls==='12th';
  openModal(`<div><span class="ad-kicker">STEP 02 • STUDENT VERIFICATION</span><h2>Enter your details</h2><p class="result-note">Fill in your details before starting the admission test.</p><div class="ad-form-grid"><div class="ad-field"><label>Student Name *</label><input id="stName" maxlength="80" autocomplete="name"></div><div class="ad-field"><label>Father's Name *</label><input id="stFather" maxlength="80"></div><div class="ad-field"><label>Class</label><input id="stClass" value="${esc(cls)}" readonly></div><div class="ad-field"><label>Medium *</label><select id="stMedium"><option value="">Select Medium</option><option value="Hindi">Hindi</option><option value="English">English</option></select></div><div class="ad-field"><label>Mobile Number *</label><input id="stMobile" maxlength="10" inputmode="numeric" autocomplete="tel"></div><div class="ad-field"><label>Roll Number (optional)</label><input id="stRoll" maxlength="20"></div>${senior?`<div class="ad-field"><label>Stream *</label><select id="stStream"><option value="">Select Stream</option><option value="Mathematics">Mathematics</option><option value="Biology">Biology</option><option value="Arts">Arts</option><option value="Commerce">Commerce</option></select></div>`:''}</div><div class="ad-actions"><button class="ad-btn outline" onclick="closeModal()">Cancel</button><button class="ad-btn primary" onclick='beginExam(${JSON.stringify(testId)})'>Continue to Test →</button></div></div>`);
}
async function beginExam(testId){
  const name=$('stName').value.trim(),father=$('stFather').value.trim(),mobile=$('stMobile').value.trim(),roll=$('stRoll').value.trim(),cls=$('stClass').value.trim(),medium=$('stMedium').value,streamEl=$('stStream'),stream=streamEl?streamEl.value:'';
  if(!name||!father||!cls||!medium||!/^\d{10}$/.test(mobile)){alert('Please fill Student Name, Father’s Name, Class, Medium and a valid 10-digit mobile number.');return;}
  if((cls==='11th'||cls==='12th')&&!stream){alert('Please select your Stream.');return;}
  try{
    activeTest=await API.getAdmissionPublicTest(testId); student={name,father,mobile,roll,class:cls,medium,stream:stream||''};answers={};index=0;seconds=Math.max(10*60,Math.min(60*60,(activeTest.questions.length||10)*90));renderQuestion();startTimer();
  }catch(e){alert(e.message||'Unable to open this test.');await loadTests();}
}
function startTimer(){if(timer)clearInterval(timer);timer=setInterval(()=>{seconds--;renderTimer();if(seconds<=0){clearInterval(timer);timer=null;submit(true);}},1000);renderTimer();}
function renderTimer(){const e=$('examTimer');if(!e)return;const m=Math.floor(seconds/60),s=seconds%60;e.textContent=`${m}:${String(s).padStart(2,'0')}`;e.classList.toggle('urgent',seconds<=120);}
function renderQuestion(){
  const q=activeTest.questions[index],total=activeTest.questions.length,selected=answers[q.id];
  openModal(`<div class="exam-head"><div><span class="ad-kicker">${esc(activeTest.academicYear)} • ${esc(activeTest.class)} • ${esc(activeTest.trade)}</span><h2>${esc(activeTest.jobRole||'Admission Test')}</h2></div><div class="exam-timer" id="examTimer">00:00</div></div><div class="exam-progress"><i style="width:${((index+1)/total)*100}%"></i></div><div class="exam-question"><span class="exam-number">QUESTION ${index+1} OF ${total} • ${q.marks} MARK${q.marks==1?'':'S'}</span><h3>${esc(q.question)}</h3><div class="exam-options">${q.options.map((o,i)=>`<button class="exam-option ${selected===i?'selected':''}" onclick='chooseAnswer(${i})'><span>${String.fromCharCode(65+i)}</span>${esc(o)}</button>`).join('')}</div></div><div class="exam-footer"><button class="ad-btn outline" ${index===0?'disabled':''} onclick="prevQuestion()">← Previous</button>${index<total-1?'<button class="ad-btn primary" onclick="nextQuestion()">Save & Next →</button>':'<button class="ad-btn primary" onclick="submit(false)">Submit Test ✓</button>'}</div>`);
  renderTimer();
}
window.chooseAnswer=i=>{answers[activeTest.questions[index].id]=i;renderQuestion();};
window.nextQuestion=()=>{if(index<activeTest.questions.length-1){index++;renderQuestion();}};
window.prevQuestion=()=>{if(index>0){index--;renderQuestion();}};
async function submit(auto){
  if(!auto&&!confirm('Submit your admission test now? You will not be able to edit answers after submission.'))return;
  if(timer){clearInterval(timer);timer=null;}
  try{
    const r=await API.submitAdmissionTest({testId:activeTest.testId,studentName:student.name,fatherName:student.father,mobile:student.mobile,rollNumber:student.roll,class:student.class,medium:student.medium,stream:student.stream,answers});
    openModal(`<div class="result-box"><span class="ad-kicker">ADMISSION TEST SUBMITTED</span><h2>${auto?'Time expired — your test was submitted automatically.':'Your test has been submitted successfully.'}</h2><div class="result-score">${esc(r.percentage)}%</div><div class="result-meta"><div><small>Marks</small><b>${esc(r.marks)} / ${esc(r.maxMarks)}</b></div><div><small>Rank</small><b>${esc(r.rank||'Pending')}</b></div><div><small>Status</small><b>${esc(r.status||'Pending')}</b></div><div><small>Answered</small><b>${esc(r.answered)} / ${esc(r.totalQuestions)}</b></div></div><div class="application-code">Application No.: ${esc(r.applicationNo)}</div><p class="result-note">Keep this application number for your records. Final admission selection remains subject to the school's admission process and merit review.</p><div class="ad-actions"><button class="ad-btn primary" onclick="closeModal();loadTests();window.scrollTo({top:0,behavior:'smooth'})">Back to Admission Centre</button></div></div>`);
  }catch(e){alert(e.message||'Submission failed. Please try again.');startTimer();}
}
document.addEventListener('DOMContentLoaded',loadTests);
})();