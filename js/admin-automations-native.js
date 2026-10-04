/* Native Automation Center. All tools render inside admin.html; no iframe and no external HTML loading. */
(function(){'use strict';
const AUTO=[{"key": "guestApplication", "title": "📄 Guest Lecture Application", "prefix": "na_guestApplication_", "styles": "<style>\n*{box-sizing:border-box}\nbody{margin:0;background:#f3f4f6;color:#111;font-family:\"Noto Sans Devanagari\",\"Mangal\",Arial,sans-serif}\n.controls{max-width:900px;margin:20px auto;padding:18px;background:#fff;border-radius:10px}\nlabel{display:block;font-weight:600;margin-bottom:6px}\ninput{width:100%;padding:9px;border:1px solid #aaa;border-radius:5px;font-size:15px}\n.names{display:grid;grid-template-columns:1fr 1fr;gap:8px}\nh3{font-size:16px;margin:14px 0 7px}\nbutton{padding:10px 18px;border:0;border-radius:6px;background:#1f4e79;color:white;font-size:15px;cursor:pointer;margin-top:14px}\n.clear{background:#666;margin-left:7px}\n.paper{width:794px;min-height:1123px;margin:18px auto;background:white;padding:60px 65px;font-size:16px;line-height:1.75}\n.left{text-align:left}\n.subject{font-weight:bold;margin-top:16px}\np{margin:14px 0}\nol{margin:8px 0 14px 28px;padding:0}\n.signature{text-align:right;margin-top:45px}\n@media(max-width:820px){\n .paper{width:100%;min-height:auto;padding:30px 22px}\n .names{grid-template-columns:1fr}\n}\n@media print{\n body{background:#fff}\n .controls{display:none}\n .paper{width:210mm;height:297mm;min-height:297mm;margin:0;padding:22mm 22mm 18mm 22mm;font-size:15.5px;line-height:1.72}\n @page{size:A4;margin:0}\n}\n</style>", "markup": "<div class=\"controls\">\n<label>अतिथि व्याख्यान का माह</label>\n<input \\1na_guestApplication_month\\2 placeholder=\"जैसे — अक्टूबर 2026\"/>\n<h3>IT-ITES ट्रेड : प्रस्तावित अतिथि व्याख्याताओं के नाम</h3>\n<div class=\"names\">\n<input \\1na_guestApplication_it1\\2 placeholder=\"1. नाम\"/>\n<input \\1na_guestApplication_it2\\2 placeholder=\"2. नाम\"/>\n<input \\1na_guestApplication_it3\\2 placeholder=\"3. नाम\"/>\n<input \\1na_guestApplication_it4\\2 placeholder=\"4. नाम\"/>\n</div>\n<h3>Agriculture ट्रेड : प्रस्तावित अतिथि व्याख्याताओं के नाम</h3>\n<div class=\"names\">\n<input \\1na_guestApplication_ag1\\2 placeholder=\"1. नाम\"/>\n<input \\1na_guestApplication_ag2\\2 placeholder=\"2. नाम\"/>\n<input \\1na_guestApplication_ag3\\2 placeholder=\"3. नाम\"/>\n<input \\1na_guestApplication_ag4\\2 placeholder=\"4. नाम\"/>\n</div>\n<button \\1window.__nativeAuto[\"guestApplication_update\"]();window.print()\">🖨️ आवेदन प्रिंट करें</button>\n<button class=\"clear\" \\1window.__nativeAuto[\"guestApplication_clearForm\"]()\">साफ करें</button>\n</div><div class=\"paper\">\n<div class=\"left\">\n<b>सेवा में,</b><br/>\n<b>प्राचार्य महोदय,</b><br/>\n<b>शासकीय संदीपनि उच्चतर माध्यमिक विद्यालय, दमोह (म.प्र.)</b>\n</div>\n<p class=\"subject\">विषय : IT-ITES एवं Agriculture ट्रेड के अंतर्गत कक्षा 9वीं से 12वीं तक अतिथि व्याख्यान आयोजित किए जाने बाबत।</p>\n<p>महोदय,</p>\n<p>सविनय निवेदन है कि विद्यालय में संचालित <b>IT-ITES एवं Agriculture ट्रेड</b> के विद्यार्थियों को संबंधित क्षेत्र के विशेषज्ञों के व्यावहारिक ज्ञान एवं नवीन तकनीकों से परिचित कराने हेतु कक्षा <b>9वीं, 10वीं, 11वीं एवं 12वीं में प्रत्येक कक्षा के लिए 02-02 अतिथि व्याख्यान</b> माह <b \\1na_guestApplication_showMonth\\2>____________</b> में आयोजित किया जाना प्रस्तावित है।</p>\n<p>अतः विद्यार्थियों के कौशल विकास एवं व्यावसायिक मार्गदर्शन की दृष्टि से उक्त अतिथि व्याख्यान आयोजित करने की अनुमति प्रदान करने का कष्ट करें।</p>\n<p><b>प्रस्तावित अतिथि व्याख्याताओं के नाम :</b></p>\n<p><b>IT-ITES ट्रेड :</b></p>\n<ol \\1na_guestApplication_showIT\\2></ol>\n<p><b>Agriculture ट्रेड :</b></p>\n<ol \\1na_guestApplication_showAG\\2></ol>\n<p style=\"margin-top:35px\">दिनांक : ____________</p>\n<div class=\"signature\">\n<b>प्राचार्य की सील एवं हस्ताक्षर</b><br/><br/>\n____________________________\n</div>\n</div>", "js": "\nfunction update(){\n document.getElementById(\"showMonth\").textContent=document.getElementById(\"month\").value.trim()||\"____________\";\n [\"IT\",\"AG\"].forEach(function(t){\n   var box=document.getElementById(\"show\"+t); box.innerHTML=\"\";\n   for(var i=1;i<=4;i++){\n     var li=document.createElement(\"li\");\n     var id=(t===\"IT\"?\"it\":\"ag\")+i;\n     li.textContent=document.getElementById(id).value.trim()||\"____________________________\";\n     box.appendChild(li);\n   }\n });\n}\nfunction clearForm(){\n document.querySelectorAll(\"input\").forEach(function(x){x.value=\"\"});\n update();\n}\ndocument.querySelectorAll(\"input\").forEach(function(x){x.addEventListener(\"input\",update)});\nupdate();\n", "funcs": ["clearForm", "update"]}, {"key": "guestAutomatic", "title": "🎤 Guest Lecture Automatic System", "prefix": "na_guestAutomatic_", "styles": "<style>\n*{box-sizing:border-box}\nbody{margin:0;font-family:Arial,sans-serif;background:#eef2f7;color:#18212b}\n.app{max-width:1100px;margin:20px auto;padding:18px}\n.card{background:#fff;border-radius:12px;padding:20px;box-shadow:0 2px 12px #0001}\nh1{margin:0 0 5px;font-size:25px}\nh2{font-size:18px;margin:22px 0 10px}\n.grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}\n.full{grid-column:1/-1}\nlabel{font-weight:700;font-size:14px}\ninput,select,button{width:100%;padding:11px;border:1px solid #bcc7d3;border-radius:7px;font-size:14px;background:#fff}\nbutton{cursor:pointer;font-weight:700}\n.buttons{display:grid;grid-template-columns:repeat(4,1fr);gap:9px;margin-top:18px}\n.status{margin-top:12px;padding:10px;background:#f4f7fa;border-radius:7px;min-height:40px}\ntable{width:100%;border-collapse:collapse;margin-top:10px}\nth,td{border:1px solid #d5dce3;padding:8px;text-align:left;font-size:13px}\nth{background:#f0f3f6}\n.small{font-size:12px;color:#5c6875}\n.photo-preview{max-height:90px;max-width:150px;margin-top:7px;border:1px solid #ddd}\n\n#na_guestAutomatic_printPages{display:none}\n\n/* Exact A4-style print area based on the supplied original format:\n   one guest lecture = one A4 page */\n.print-page{\n  width:210mm;\n  height:297mm;\n  position:relative;\n  background:#fff;\n  padding:12mm 10mm 10mm 10mm;\n  overflow:hidden;\n  font-family:Arial,sans-serif;\n  color:#000;\n}\n.print-title{\n  text-align:center;\n  font-size:17px;\n  font-weight:700;\n  margin:0 0 7mm;\n  line-height:1.1;\n}\n.print-meta{\n  display:grid;\n  grid-template-columns:1fr 1fr;\n  column-gap:8mm;\n  font-size:15px;\n  font-weight:700;\n  line-height:1.25;\n  margin:0 14mm;\n}\n.print-meta .date{text-align:right}\n.print-topic{\n  font-size:15px;\n  font-weight:700;\n  margin:4mm 14mm 9mm;\n  line-height:1.25;\n}\n.print-photo{\n  width:100%;\n  height:155mm;\n  position:relative;\n  top:15mm;\n  display:flex;\n  align-items:center;\n  justify-content:center;\n  overflow:hidden;\n  margin:0;\n}\n.print-photo img{\n  width:100%;\n  height:100%;\n  object-fit:contain;\n  display:block;\n}\n.no-photo{\n  font-size:14px;\n  color:#777;\n}\n.print-signatures{\n  position:absolute;\n  left:14mm;\n  right:14mm;\n  bottom:10mm;\n  font-size:15px;\n  font-weight:700;\n}\n.sig-row{\n  display:grid;\n  grid-template-columns:1fr 1fr;\n  column-gap:20mm;\n}\n.sig-left{text-align:left}\n.sig-right{text-align:right}\n.sig-space{height:13mm}\n\n@media(max-width:700px){\n  .grid,.buttons{grid-template-columns:1fr}\n  .app{padding:8px}\n}\n\n@media print{\n  @page{size:A4 portrait;margin:0}\n  html,body{margin:0!important;padding:0!important;background:#fff!important}\n  body{width:210mm}\n  .app{display:none!important}\n  #na_guestAutomatic_printPages{\n    display:block!important;\n    width:210mm;\n    margin:0;\n    padding:0;\n  }\n  .print-page{\n    page-break-after:always;\n    break-after:page;\n  }\n  .print-page:last-child{\n    page-break-after:auto;\n    break-after:auto;\n  }\n}\n</style>", "markup": "<div class=\"app\">\n<div class=\"card\">\n<h1>GUEST LECTURE AUTOMATION SYSTEM</h1>\n<div class=\"small\">Offline system — data stays in this browser on this laptop.</div>\n<h2>Current Lecture Inputs</h2>\n<div class=\"grid\">\n<div>\n<label>Class *</label>\n<select \\1na_guestAutomatic_cls\\2>\n<option value=\"\">Select Class</option>\n<option>9th</option><option>10th</option><option>11th</option><option>12th</option>\n</select>\n</div>\n<div><label>Lecturer Name *</label><input \\1na_guestAutomatic_lecturer\\2/></div>\n<div><label>Date *</label><input \\1na_guestAutomatic_date\\2 type=\"date\"/></div>\n<div><label>Topic *</label><input \\1na_guestAutomatic_topic\\2/></div>\n<div><label>Photo</label><input accept=\"image/*\" \\1na_guestAutomatic_photo\\2 type=\"file\"/><img class=\"photo-preview\" hidden=\"\" \\1na_guestAutomatic_preview\\2/></div>\n<div><label>Teacher Name</label><input \\1na_guestAutomatic_teacher\\2 value=\"Pooran Raikwar\"/></div>\n<div><label>Principal Name</label><input \\1na_guestAutomatic_principal\\2/></div>\n</div>\n<div class=\"buttons\">\n<button \\1window.__nativeAuto[\"guestAutomatic_newForm\"]()\">NEW</button>\n<button \\1window.__nativeAuto[\"guestAutomatic_saveRecord\"]()\">SAVE</button>\n<button \\1window.__nativeAuto[\"guestAutomatic_generate\"]()\">GENERATE</button>\n<button \\1window.__nativeAuto[\"guestAutomatic_printCurrent\"]()\">PRINT / PDF</button>\n<button \\1window.__nativeAuto[\"guestAutomatic_clearForm\"]()\">CLEAR</button>\n<button \\1window.__nativeAuto[\"guestAutomatic_generateAll\"]()\">GENERATE ALL</button>\n<button \\1window.__nativeAuto[\"guestAutomatic_exportCSV\"]()\">EXPORT RECORDS</button>\n<button \\1window.__nativeAuto[\"guestAutomatic_clearRecords\"]()\">DELETE ALL RECORDS</button>\n</div>\n<div class=\"status\" \\1na_guestAutomatic_status\\2>Ready.</div>\n<h2>Saved Records</h2>\n<table>\n<thead><tr><th>ID</th><th>Date</th><th>Class</th><th>Lecturer</th><th>Topic</th><th>Action</th></tr></thead>\n<tbody \\1na_guestAutomatic_records\\2></tbody>\n</table>\n</div>\n</div><div \\1na_guestAutomatic_printPages\\2></div>", "js": "\nconst $=id=>document.getElementById(id);\nlet photoData=\"\";\nlet currentRecordId=\"\";\n\nfunction records(){\n  return JSON.parse(localStorage.getItem(\"guestLectureRecords\")||\"[]\");\n}\nfunction setStatus(x){$(\"status\").textContent=x;}\n\nfunction todayISO(){\n  const d=new Date();\n  const y=d.getFullYear(), m=String(d.getMonth()+1).padStart(2,\"0\"), day=String(d.getDate()).padStart(2,\"0\");\n  return `${y}-${m}-${day}`;\n}\nfunction displayDate(iso){\n  if(!iso)return \"\";\n  const p=iso.split(\"-\");\n  return p.length===3 ? `${p[2]}-${p[1]}-${p[0]}` : iso;\n}\n\n$(\"date\").value=todayISO();\n\n$(\"photo\").addEventListener(\"change\",e=>{\n  const f=e.target.files[0];\n  if(!f)return;\n  const r=new FileReader();\n  r.onload=()=>{\n    photoData=r.result;\n    $(\"preview\").src=photoData;\n    $(\"preview\").hidden=false;\n  };\n  r.readAsDataURL(f);\n});\n\nfunction newForm(){\n  clearForm();\n  $(\"date\").value=todayISO();\n  setStatus(\"New lecture form ready.\");\n}\n\nfunction clearForm(){\n  [\"cls\",\"lecturer\",\"topic\",\"principal\"].forEach(id=>$(id).value=\"\");\n  $(\"teacher\").value=\"Pooran Raikwar\";\n  $(\"date\").value=todayISO();\n  $(\"photo\").value=\"\";\n  photoData=\"\";\n  currentRecordId=\"\";\n  $(\"preview\").hidden=true;\n  setStatus(\"Form cleared.\");\n}\n\nfunction valid(){\n  if(!$(\"cls\").value||!$(\"lecturer\").value.trim()||!$(\"date\").value||!$(\"topic\").value.trim()){\n    alert(\"Please fill Class, Lecturer Name, Date and Topic.\");\n    return false;\n  }\n  return true;\n}\n\nfunction makeId(){\n  const a=records();\n  let n=a.length+1;\n  while(a.some(r=>r.id===\"GL-\"+String(n).padStart(4,\"0\"))) n++;\n  return \"GL-\"+String(n).padStart(4,\"0\");\n}\n\nfunction current(){\n  return {\n    id:currentRecordId||makeId(),\n    class:$(\"cls\").value,\n    lecturer:$(\"lecturer\").value.trim(),\n    date:$(\"date\").value,\n    topic:$(\"topic\").value.trim(),\n    teacher:$(\"teacher\").value.trim(),\n    principal:$(\"principal\").value.trim(),\n    photo:photoData\n  };\n}\n\nfunction saveRecord(){\n  if(!valid())return;\n  const a=records(), r=current();\n  const idx=a.findIndex(x=>x.id===r.id);\n  if(idx>=0) a[idx]=r; else a.push(r);\n  localStorage.setItem(\"guestLectureRecords\",JSON.stringify(a));\n  currentRecordId=r.id;\n  setStatus((idx>=0?\"Updated \":\"Saved \")+r.id);\n  render();\n  renderPrintPages([r]);\n}\n\nfunction generate(){\n  if(!valid())return;\n  const r=current();\n  renderPrintPages([r]);\n  setStatus(\"Print-ready A4 page generated. One lecture = one page.\");\n}\n\nfunction printCurrent(){\n  if(!valid())return;\n  const r=current();\n  renderPrintPages([r]);\n  setTimeout(()=>window.print(),100);\n}\n\nfunction generateAll(){\n  const a=records();\n  if(!a.length){alert(\"No saved records.\");return;}\n  renderPrintPages(a);\n  setStatus(a.length+\" guest lecture page(s) generated. Each lecture will print on a separate A4 page.\");\n  setTimeout(()=>window.print(),100);\n}\n\nfunction makePrintPage(r){\n  const page=document.createElement(\"div\");\n  page.className=\"print-page\";\n\n  const title=document.createElement(\"div\");\n  title.className=\"print-title\";\n  title.innerHTML=\"Guest Lecture \"+esc(r.class);\n  page.appendChild(title);\n\n  const meta=document.createElement(\"div\");\n  meta.className=\"print-meta\";\n  meta.innerHTML=\n    '<div>Lecturer Name- '+esc(r.lecturer)+'</div>'+\n    '<div class=\"date\">Date – '+esc(displayDate(r.date))+'</div>';\n  page.appendChild(meta);\n\n  const topic=document.createElement(\"div\");\n  topic.className=\"print-topic\";\n  topic.innerHTML=\"Topic-\"+esc(r.topic);\n  page.appendChild(topic);\n\n  const photo=document.createElement(\"div\");\n  photo.className=\"print-photo\";\n  if(r.photo){\n    const img=document.createElement(\"img\");\n    img.src=r.photo;\n    img.alt=\"Guest Lecture Photo\";\n    photo.appendChild(img);\n  }else{\n    const np=document.createElement(\"div\");\n    np.className=\"no-photo\";\n    np.textContent=\"GUEST LECTURE PHOTO\";\n    photo.appendChild(np);\n  }\n  page.appendChild(photo);\n\n  const sig=document.createElement(\"div\");\n  sig.className=\"print-signatures\";\n  sig.innerHTML=\n    '<div class=\"sig-row\">'+\n      '<div class=\"sig-left\">Signature of Teacher</div>'+\n      '<div class=\"sig-right\"></div>'+\n    '</div>'+\n    '<div class=\"sig-space\"></div>'+\n    '<div class=\"sig-row\">'+\n      '<div class=\"sig-left\">Name of Teacher – '+esc(r.teacher||\"\")+'</div>'+\n      '<div class=\"sig-right\">Principal'+(r.principal?'<br>'+esc(r.principal):\"\")+'</div>'+\n    '</div>';\n  page.appendChild(sig);\n\n  return page;\n}\n\nfunction renderPrintPages(list){\n  const box=$(\"printPages\");\n  box.innerHTML=\"\";\n  list.forEach(r=>box.appendChild(makePrintPage(r)));\n}\n\nfunction loadRecord(id){\n  const r=records().find(x=>x.id===id);\n  if(!r)return;\n  $(\"cls\").value=r.class;\n  $(\"lecturer\").value=r.lecturer;\n  $(\"date\").value=r.date;\n  $(\"topic\").value=r.topic;\n  $(\"teacher\").value=r.teacher||\"Pooran Raikwar\";\n  $(\"principal\").value=r.principal||\"\";\n  photoData=r.photo||\"\";\n  currentRecordId=r.id;\n  if(photoData){\n    $(\"preview\").src=photoData;\n    $(\"preview\").hidden=false;\n  }else $(\"preview\").hidden=true;\n  renderPrintPages([r]);\n  setStatus(\"Loaded \"+id);\n}\n\nfunction render(){\n  const a=records();\n  $(\"records\").innerHTML=a.map(r=>\n    `<tr>\n      <td>${esc(r.id)}</td><td>${esc(displayDate(r.date))}</td><td>${esc(r.class)}</td>\n      <td>${esc(r.lecturer)}</td><td>${esc(r.topic)}</td>\n      <td><button onclick=\"loadRecord('${esc(r.id)}')\">EDIT / VIEW</button></td>\n    </tr>`\n  ).join(\"\")||'<tr><td colspan=\"6\">No records yet.</td></tr>';\n}\n\nfunction esc(s){\n  return String(s??\"\").replace(/[&<>\"']/g,m=>({\n    \"&\":\"&amp;\",\"<\":\"&lt;\",\">\":\"&gt;\",'\"':\"&quot;\",\"'\":\"&#39;\"\n  }[m]));\n}\n\nfunction exportCSV(){\n  const a=records();\n  if(!a.length){alert(\"No records.\");return;}\n  let csv=\"ID,Date,Class,Lecturer,Topic,Teacher,Principal\\n\"+\n    a.map(r=>[r.id,r.date,r.class,r.lecturer,r.topic,r.teacher,r.principal]\n      .map(x=>`\"${String(x??\"\").replaceAll('\"','\"\"')}\"`).join(\",\")).join(\"\\n\");\n  const b=new Blob([csv],{type:\"text/csv\"});\n  const u=URL.createObjectURL(b);\n  const x=document.createElement(\"a\");\n  x.href=u;x.download=\"Guest_Lecture_Records.csv\";x.click();\n  URL.revokeObjectURL(u);\n}\n\nfunction clearRecords(){\n  if(confirm(\"Delete all saved records from this browser?\")){\n    localStorage.removeItem(\"guestLectureRecords\");\n    render();\n    setStatus(\"All records deleted.\");\n  }\n}\n\nrender();\n", "funcs": ["clearForm", "clearRecords", "current", "displayDate", "esc", "exportCSV", "generate", "generateAll", "loadRecord", "makeId", "makePrintPage", "newForm", "printCurrent", "records", "render", "renderPrintPages", "saveRecord", "setStatus", "todayISO", "valid"]}, {"key": "guestReport", "title": "📋 Guest Lecture Report & Attendance", "prefix": "na_guestReport_", "styles": "<style>\n*{box-sizing:border-box}body{margin:0;background:#eef2f7;font-family:Arial,sans-serif;color:#111}.app{max-width:1150px;margin:18px auto;padding:16px}.card{background:#fff;padding:20px;border-radius:12px;box-shadow:0 2px 12px #0001}\nh1{margin:0 0 5px;text-align:center;font-size:24px}.sub{text-align:center;font-size:12px;color:#667}h2{font-size:18px;margin:20px 0 10px}\n.grid{display:grid;grid-template-columns:1fr 1fr;gap:11px}.full{grid-column:1/-1}label{display:block;font-size:13px;font-weight:bold;margin-bottom:4px}\ninput,select,textarea,button{font:inherit}input,select,textarea{width:100%;padding:9px;border:1px solid #b9c3cd;border-radius:6px}textarea{min-height:65px;resize:vertical}\n.buttons{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:15px}button{padding:10px;border:1px solid #aeb8c2;border-radius:6px;background:#f5f7f9;font-weight:bold}.status{margin-top:10px;padding:9px;background:#f1f4f7;border-radius:6px}\n.list{width:100%;border-collapse:collapse;margin-top:8px}.list th,.list td{border:1px solid #ccd3da;padding:7px;font-size:12px}.list th{background:#f0f2f4}\n#na_guestReport_printPages{display:none}\n.print-page{width:210mm;height:297mm;background:#fff;padding:10mm 10mm;overflow:hidden;page-break-after:always;color:#000}\n.print-page:last-child{page-break-after:auto}.r-title{text-align:center;font-size:22px;font-weight:700;margin:0 0 6mm}\n.r-school{text-align:center;font-size:15px;font-weight:700;margin-bottom:6mm}\n.r-table{width:100%;border-collapse:collapse}.r-table td{border:1px solid #000;padding:3.6mm 3.5mm;font-size:14px;line-height:1.28;vertical-align:top}\n.meta-row td{padding:0!important}.meta-grid{display:grid;grid-template-columns:1fr 1fr 1fr 1.35fr 1fr}.meta-grid>div{padding:3.2mm 3mm;border-right:1px solid #000;font-size:14px;line-height:1.25}.meta-grid>div:last-child{border-right:0}.attendance-line{padding:2.5mm 3mm;border-top:1px solid #000;font-size:14px}.num{width:10mm;text-align:center;font-weight:700}.label{width:62mm;font-weight:700}.plain-sign{border:0!important;margin-top:5mm}.sig-space{height:18mm;display:flex;justify-content:space-between;align-items:flex-end;font-size:13px;font-weight:700}.plain-bottom{display:flex;justify-content:space-between;font-weight:700;font-size:13px;margin-top:4mm}\n@media(max-width:750px){.grid,.buttons{grid-template-columns:1fr}.app{padding:8px}}\n@media print{@page{size:A4 portrait;margin:0}html,body{margin:0!important;padding:0!important;background:#fff!important}.app{display:none!important}#na_guestReport_printPages{display:block!important}.print-page{margin:0}}\n</style>", "markup": "<div class=\"app\"><div class=\"card\">\n<h1>GUEST LECTURE REPORT – AUTOMATIC SYSTEM</h1><div class=\"sub\">Original report structure preserved • Larger readable font • One report on one A4 page</div>\n<h2>Report Details</h2><div class=\"grid\">\n<div><label>Name Of The School</label><input \\1na_guestReport_school\\2 value=\"Government Sandipani Higher Secondary School Damoh\"/></div>\n<div><label>Date</label><input \\1na_guestReport_date\\2 type=\"date\"/></div>\n<div><label>Trade</label><input \\1na_guestReport_trade\\2 value=\"IT-ITes\"/></div><div><label>Attendance</label><input \\1na_guestReport_attendance\\2 type=\"number\"/></div>\n<div><label>Class</label><select \\1na_guestReport_cls\\2><option>9th</option><option>10th</option><option>11th</option><option>12th</option></select></div>\n<div><label>Duration of Lecture</label><input \\1na_guestReport_duration\\2 value=\"12:30 to 02:00 = 90 minutes\"/></div>\n<div><label>Name of Guest Lecturer</label><input \\1na_guestReport_lecturer\\2/></div><div><label>Designation and Institution of the Guest Lecturer</label><input \\1na_guestReport_designation\\2/></div>\n<div class=\"full\"><label>Topic Covered</label><textarea \\1na_guestReport_topic\\2></textarea></div>\n<div class=\"full\"><label>Question Raised by Student</label><textarea \\1na_guestReport_questions\\2></textarea></div>\n<div><label>Feedback of the Guest Lecture about the Student / Program in general</label><textarea \\1na_guestReport_guestFeedback\\2></textarea></div>\n<div><label>Feedback of the student about the topics covered, depth of information shared, method of teaching, about the guest lecturer</label><textarea \\1na_guestReport_studentFeedback\\2></textarea></div>\n<div class=\"full\"><label>Remarks of teacher about the Guest Lecture on the following:</label><textarea \\1na_guestReport_teacherRemarks\\2 placeholder=\"1. Method of teaching\n2. Topics covered or not as per the planned\n3. Depth of information covered\n4. Overall feedback about the session\"></textarea></div>\n<div><label>Picture attached or Not</label><select \\1na_guestReport_picture\\2><option>Yes</option><option>No</option></select></div>\n<div><label>Overall Feedback about the Guest Lecture conduct</label><textarea \\1na_guestReport_overall\\2></textarea></div>\n<div><label>Name of Trainer</label><input \\1na_guestReport_trainer\\2 value=\"Pooran Raikwar\"/></div><div><label>Name of Principal</label><input \\1na_guestReport_principal\\2/></div>\n</div>\n<div class=\"buttons\"><button \\1window.__nativeAuto[\"guestReport_newR\"]()\">NEW</button><button \\1window.__nativeAuto[\"guestReport_saveR\"]()\">SAVE</button><button \\1window.__nativeAuto[\"guestReport_generate\"]()\">GENERATE</button><button \\1window.__nativeAuto[\"guestReport_printR\"]()\">PRINT / PDF</button><button \\1window.__nativeAuto[\"guestReport_clearF\"]()\">CLEAR</button><button \\1window.__nativeAuto[\"guestReport_generateAll\"]()\">GENERATE ALL</button><button \\1window.__nativeAuto[\"guestReport_exportCSV\"]()\">EXPORT RECORDS</button><button \\1window.__nativeAuto[\"guestReport_deleteAll\"]()\">DELETE ALL</button></div>\n<div class=\"status\" \\1na_guestReport_status\\2>Ready.</div><h2>Saved Reports</h2><table class=\"list\"><thead><tr><th>ID</th><th>Date</th><th>Class</th><th>Lecturer</th><th>Topic</th><th>Action</th></tr></thead><tbody \\1na_guestReport_list\\2></tbody></table>\n</div></div><div \\1na_guestReport_printPages\\2></div>", "js": "\nconst $=id=>document.getElementById(id);let currentId=\"\";\nconst get=()=>JSON.parse(localStorage.getItem(\"guestLectureReportsExact\")||\"[]\");\nconst msg=x=>$(\"status\").textContent=x;\nfunction today(){let d=new Date();return d.getFullYear()+\"-\"+String(d.getMonth()+1).padStart(2,\"0\")+\"-\"+String(d.getDate()).padStart(2,\"0\")}\nfunction dtext(x){if(!x)return\"\";let p=x.split(\"-\");return p[2]+\"-\"+p[1]+\"-\"+p[0]}$(\"date\").value=today();\nfunction esc(s){return String(s??\"\").replace(/[&<>\"']/g,m=>({\"&\":\"&amp;\",\"<\":\"&lt;\",\">\":\"&gt;\",'\"':\"&quot;\",\"'\":\"&#39;\"}[m]))}\nfunction data(){let a=get(),n=a.length+1,id=currentId||\"GLR-\"+String(n).padStart(4,\"0\");while(!currentId&&a.some(x=>x.id==id)){n++;id=\"GLR-\"+String(n).padStart(4,\"0\")}return{id,school:$(\"school\").value,date:$(\"date\").value,trade:$(\"trade\").value,attendance:$(\"attendance\").value,cls:$(\"cls\").value,duration:$(\"duration\").value,lecturer:$(\"lecturer\").value,designation:$(\"designation\").value,topic:$(\"topic\").value,questions:$(\"questions\").value,guestFeedback:$(\"guestFeedback\").value,studentFeedback:$(\"studentFeedback\").value,teacherRemarks:$(\"teacherRemarks\").value,picture:$(\"picture\").value,overall:$(\"overall\").value,trainer:$(\"trainer\").value,principal:$(\"principal\").value}}\nfunction valid(){if(!$(\"date\").value||!$(\"lecturer\").value.trim()||!$(\"topic\").value.trim()){alert(\"Please fill Date, Guest Lecturer and Topic.\");return false}return true}\nfunction saveR(){if(!valid())return;let r=data(),a=get(),i=a.findIndex(x=>x.id==r.id);if(i>=0)a[i]=r;else a.push(r);localStorage.setItem(\"guestLectureReportsExact\",JSON.stringify(a));currentId=r.id;render();makePages([r]);msg((i>=0?\"Updated \":\"Saved \")+r.id)}\nfunction generate(){if(!valid())return;makePages([data()]);msg(\"Generated: one report = one A4 page.\")}\nfunction printR(){if(!valid())return;makePages([data()]);setTimeout(()=>window.print(),100)}\nfunction generateAll(){let a=get();if(!a.length){alert(\"No saved reports.\");return}makePages(a);msg(a.length+\" reports ready; each report is a separate A4 page.\");setTimeout(()=>window.print(),100)}\nfunction clearF(){[\"attendance\",\"lecturer\",\"designation\",\"topic\",\"questions\",\"guestFeedback\",\"studentFeedback\",\"teacherRemarks\",\"overall\",\"principal\"].forEach(x=>$(x).value=\"\");$(\"date\").value=today();$(\"trade\").value=\"IT-ITes\";$(\"trainer\").value=\"Pooran Raikwar\";$(\"picture\").value=\"Yes\";currentId=\"\";msg(\"Form cleared.\")}\nfunction newR(){clearF();msg(\"New report ready.\")}\nfunction row(n,l,v){return '<tr><td class=\"num\">'+n+'</td><td class=\"label\">'+esc(l)+'</td><td>'+esc(v).replace(/\\\\n/g,\"<br>\")+'</td></tr>'}\nfunction make(r){let d=document.createElement(\"div\");d.className=\"print-page\";d.innerHTML='<div class=\"r-title\">GUEST LECTURE REPORT</div><div class=\"r-school\">Name Of The School: '+esc(r.school)+'</div><table class=\"r-table\"><tr class=\"meta-row\"><td colspan=\"3\"><div class=\"meta-grid\"><div><b>Date</b><br>'+esc(dtext(r.date))+'</div><div><b>Trade</b><br>'+esc(r.trade)+'</div><div><b>Class</b><br>'+esc(r.cls)+'</div><div><b>Duration of Lecture</b><br>'+esc(r.duration)+'</div><div><b>Attendance</b><br>'+esc(r.attendance)+'</div></div></td></tr>'+row(\"1\",\"Name of Guest Lecturer\",r.lecturer)+row(\"2\",\"Designation and Institution of the Guest Lecturer\",r.designation)+row(\"3\",\"Topic Covered\",r.topic)+row(\"4\",\"Question Raised by Student\",r.questions)+row(\"5\",\"Feedback of the Guest Lecture about the Student / Program in general\",r.guestFeedback)+row(\"6\",\"Feedback of the student about the topics covered, depth of information shared, method of teaching, about the guest lecturer\",r.studentFeedback)+row(\"7\",\"Remarks of teacher about the Guest Lecture on the following: 1. Method of teaching  2. Topics covered or not as per the planned  3. Depth of information covered  4. Overall feedback about the session\",r.teacherRemarks)+row(\"8\",\"Picture attached or Not\",r.picture)+row(\"9\",\"Overall Feedback about the Guest Lecture conduct\",r.overall)+'</table><div class=\"plain-sign\"><div class=\"sig-space\"><span>(Signature of Trainer)</span><span>(Signature of Principal &amp; Seal of School)</span></div><div class=\"plain-bottom\"><span>Name of Trainer : '+esc(r.trainer)+'</span><span>Name of Principal : '+esc(r.principal)+'</span></div></div>';return d}\nfunction makePages(a){$(\"printPages\").innerHTML=\"\";a.forEach(r=>$(\"printPages\").appendChild(make(r)))}\nfunction load(id){let r=get().find(x=>x.id==id);if(!r)return;currentId=id;Object.keys(r).forEach(k=>{if($(k))$(k).value=r[k]});makePages([r]);msg(\"Loaded \"+id)}\nfunction render(){let a=get();$(\"list\").innerHTML=a.map(r=>'<tr><td>'+esc(r.id)+'</td><td>'+esc(dtext(r.date))+'</td><td>'+esc(r.cls)+'</td><td>'+esc(r.lecturer)+'</td><td>'+esc(r.topic)+'</td><td><button type=\"button\" data-id=\"'+esc(r.id)+'\">EDIT / VIEW</button></td></tr>').join(\"\")||'<tr><td colspan=\"6\">No saved reports.</td></tr>';document.querySelectorAll(\"#list button[data-id]\").forEach(b=>b.addEventListener(\"click\",()=>load(b.dataset.id)))}\nfunction exportCSV(){let a=get();if(!a.length){alert(\"No records.\");return}let k=[\"id\",\"date\",\"trade\",\"attendance\",\"cls\",\"duration\",\"lecturer\",\"designation\",\"topic\",\"questions\",\"guestFeedback\",\"studentFeedback\",\"teacherRemarks\",\"picture\",\"overall\",\"trainer\",\"principal\"];let c=k.join(\",\")+\"\\\\n\"+a.map(r=>k.map(x=>'\"'+String(r[x]??\"\").replaceAll('\"','\"\"')+'\"').join(\",\")).join(\"\\\\n\");let u=URL.createObjectURL(new Blob([c],{type:\"text/csv\"}));let z=document.createElement(\"a\");z.href=u;z.download=\"Guest_Lecture_Reports.csv\";z.click();URL.revokeObjectURL(u)}\nfunction deleteAll(){if(confirm(\"Delete all saved reports?\")){localStorage.removeItem(\"guestLectureReportsExact\");render();msg(\"All reports deleted.\")}}render();\n", "funcs": ["clearF", "data", "deleteAll", "dtext", "esc", "exportCSV", "generate", "generateAll", "load", "make", "makePages", "newR", "printR", "render", "row", "saveR", "today", "valid"]}, {"key": "industryReport", "title": "🏭 Industry Visit Report", "prefix": "na_industryReport_", "styles": "<style>\n*{box-sizing:border-box}\nbody{margin:0;font-family:Arial,sans-serif;background:#eef1f5;color:#111}\n.app{max-width:1100px;margin:20px auto;padding:18px;background:white;border-radius:10px;box-shadow:0 2px 12px #bbb}\nh1{margin:0 0 15px;text-align:center}\n.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}\nlabel{font-weight:700}\ninput,textarea,select{width:100%;padding:9px;margin-top:5px;border:1px solid #aaa;border-radius:5px;font-size:14px}\ntextarea{min-height:70px;resize:vertical}\n.full{grid-column:1/-1}\n.buttons{display:flex;flex-wrap:wrap;gap:8px;margin:15px 0}\nbutton{padding:10px 14px;border:0;border-radius:5px;background:#222;color:#fff;cursor:pointer}\nbutton:hover{opacity:.9}\n#na_industryReport_list{margin-top:10px}\n.item{display:flex;justify-content:space-between;align-items:center;border:1px solid #ccc;padding:8px;margin:5px 0;border-radius:5px}\n.item button{padding:6px 9px}\n#na_industryReport_printPages{display:none}\n\n.print-page{width:210mm;height:297mm;background:#fff;padding:9mm 9mm;overflow:hidden;page-break-after:always;color:#000}\n.print-page:last-child{page-break-after:auto}\n.r-title{text-align:center;font-size:23px;font-weight:700;margin:0 0 4mm}\n.r-school{text-align:center;font-size:15px;font-weight:700;margin-bottom:5mm}\n.meta{width:100%;border-collapse:collapse;margin-bottom:3mm}\n.meta td{border:1px solid #000;padding:3mm 2mm;text-align:center;font-size:13px;font-weight:700;vertical-align:middle}\n.report{width:100%;border-collapse:collapse}\n.report td{border:1px solid #000;padding:3.2mm 3mm;font-size:13.5px;line-height:1.22;vertical-align:top}\n.num{width:9mm;text-align:center;font-weight:700}\n.label{width:62mm;font-weight:700}\n.signrow td{border:0!important;height:23mm;padding:2mm 0}\n.bottom td{border:0!important;font-weight:700;font-size:13px;padding:0}.bottom td:first-child{text-align:left}.bottom td:last-child{text-align:right}\n@media print{\n @page{size:A4 portrait;margin:0}\n html,body{margin:0!important;padding:0!important;background:#fff!important}\n .app{display:none!important}\n #na_industryReport_printPages{display:block!important}\n .print-page{margin:0}\n}\n</style>", "markup": "<div class=\"app\">\n<h1>Industry Visit Report Management System</h1>\n<div class=\"grid\">\n<div><label>School</label><input \\1na_industryReport_school\\2 value=\"Govt Sandipani HSS School Damoh\"/></div>\n<div><label>Date</label><input \\1na_industryReport_date\\2 type=\"date\"/></div>\n<div><label>Trade</label><input \\1na_industryReport_trade\\2 value=\"IT/ITES\"/></div>\n<div><label>Attendance</label><input \\1na_industryReport_attendance\\2 type=\"number\"/></div>\n<div><label>Classes covered</label><input \\1na_industryReport_classes\\2 value=\"9th\"/></div>\n<div><label>Duration of Lecture</label><input \\1na_industryReport_duration\\2 value=\"90 minutes\"/></div>\n<div class=\"full\"><label>1. Name and address of the organization visited</label><textarea \\1na_industryReport_org\\2></textarea></div>\n<div class=\"full\"><label>2. Name and designation of the industry personnel who interacted with the students</label><textarea \\1na_industryReport_personnel\\2></textarea></div>\n<div class=\"full\"><label>3. Topics Covered</label><textarea \\1na_industryReport_topics\\2></textarea></div>\n<div class=\"full\"><label>4. Questions asked by students</label><textarea \\1na_industryReport_questions\\2></textarea></div>\n<div class=\"full\"><label>5. Feedback of the students about the topics covered.</label><textarea \\1na_industryReport_studentFeedback\\2></textarea></div>\n<div class=\"full\"><label>6. Remarks of the Vocational Teacher about the effectiveness and usefulness of the Field Visit</label><textarea \\1na_industryReport_teacherRemarks\\2></textarea></div>\n<div class=\"full\"><label>Topics covered or not, as per planed</label><textarea \\1na_industryReport_planned\\2></textarea></div>\n<div class=\"full\"><label>Depth of Information covered</label><textarea \\1na_industryReport_depth\\2></textarea></div>\n<div class=\"full\"><label>Overall Feedback about the industry visit</label><textarea \\1na_industryReport_overall\\2></textarea></div>\n<div><label>7. Attach the Pictures</label><select \\1na_industryReport_pictures\\2><option>Yes</option><option>No</option></select></div>\n<div><label>9. Attach Checklist for Field Visit Organized</label><select \\1na_industryReport_checklist\\2><option>Yes</option><option>No</option></select></div>\n<div class=\"full\"><label>10. Overall Feedback of the Vocational teacher about the industry visit</label><textarea \\1na_industryReport_vocOverall\\2></textarea></div>\n<div><label>Vocational Trainer</label><input \\1na_industryReport_trainer\\2 value=\"Pooran Raikwar\"/></div>\n<div><label>Principal</label><input \\1na_industryReport_principal\\2/></div>\n</div>\n<div class=\"buttons\">\n<button \\1window.__nativeAuto[\"industryReport_newReport\"]()\">NEW</button>\n<button \\1window.__nativeAuto[\"industryReport_saveReport\"]()\">SAVE</button>\n<button \\1window.__nativeAuto[\"industryReport_generate\"]()\">GENERATE</button>\n<button \\1window.__nativeAuto[\"industryReport_printReport\"]()\">PRINT / PDF</button>\n<button \\1window.__nativeAuto[\"industryReport_clearForm\"]()\">CLEAR</button>\n<button \\1window.__nativeAuto[\"industryReport_generateAll\"]()\">GENERATE ALL</button>\n<button \\1window.__nativeAuto[\"industryReport_exportCSV\"]()\">EXPORT RECORDS</button>\n<button \\1window.__nativeAuto[\"industryReport_deleteAll\"]()\">DELETE ALL</button>\n</div>\n<div \\1na_industryReport_msg\\2></div>\n<h3>Saved Reports</h3><div \\1na_industryReport_list\\2></div>\n</div><div \\1na_industryReport_printPages\\2></div>", "js": "\nconst $=id=>document.getElementById(id);\nlet currentId=\"\";\nconst KEY=\"industryVisitReportsV1\";\nfunction get(){try{return JSON.parse(localStorage.getItem(KEY)||\"[]\")}catch(e){return[]}}\nfunction today(){return new Date().toISOString().slice(0,10)}\nfunction esc(v){return String(v??\"\").replace(/&/g,\"&amp;\").replace(/</g,\"&lt;\").replace(/>/g,\"&gt;\").replace(/\"/g,\"&quot;\")}\nfunction msg(t){$(\"msg\").textContent=t}\nfunction dtext(v){if(!v)return\"\";let [y,m,d]=v.split(\"-\");return d+\".\"+m+\".\"+y}\nfunction data(){\n let a=get(), n=a.length+1, id=currentId||\"IVR-\"+String(n).padStart(4,\"0\");\n while(!currentId&&a.some(x=>x.id===id)){n++;id=\"IVR-\"+String(n).padStart(4,\"0\")}\n return {id,school:$(\"school\").value,date:$(\"date\").value,trade:$(\"trade\").value,attendance:$(\"attendance\").value,classes:$(\"classes\").value,duration:$(\"duration\").value,org:$(\"org\").value,personnel:$(\"personnel\").value,topics:$(\"topics\").value,questions:$(\"questions\").value,studentFeedback:$(\"studentFeedback\").value,teacherRemarks:$(\"teacherRemarks\").value,planned:$(\"planned\").value,depth:$(\"depth\").value,overall:$(\"overall\").value,pictures:$(\"pictures\").value,checklist:$(\"checklist\").value,vocOverall:$(\"vocOverall\").value,trainer:$(\"trainer\").value,principal:$(\"principal\").value}\n}\nfunction valid(){if(!$(\"date\").value||!$(\"org\").value.trim()){alert(\"Please fill Date and Organization visited.\");return false}return true}\nfunction saveReport(){if(!valid())return;let r=data(),a=get(),i=a.findIndex(x=>x.id===r.id);if(i>=0)a[i]=r;else a.push(r);localStorage.setItem(KEY,JSON.stringify(a));currentId=r.id;render();makePages([r]);msg((i>=0?\"Updated \":\"Saved \")+r.id)}\nfunction generate(){if(!valid())return;makePages([data()]);msg(\"Generated: one report = one A4 page.\")}\nfunction printReport(){if(!valid())return;makePages([data()]);setTimeout(()=>window.print(),100)}\nfunction newReport(){clearForm();msg(\"New report ready.\")}\nfunction clearForm(){[\"attendance\",\"org\",\"personnel\",\"topics\",\"questions\",\"studentFeedback\",\"teacherRemarks\",\"planned\",\"depth\",\"overall\",\"vocOverall\",\"principal\"].forEach(id=>$(id).value=\"\");$(\"date\").value=today();$(\"trade\").value=\"IT/ITES\";$(\"classes\").value=\"9th\";$(\"duration\").value=\"90 minutes\";$(\"pictures\").value=\"Yes\";$(\"checklist\").value=\"Yes\";$(\"trainer\").value=\"Pooran Raikwar\";currentId=\"\"}\nfunction row(n,l,v){return `<tr><td class=\"num\">${n}</td><td class=\"label\">${esc(l)}</td><td>${esc(v).replace(/\\n/g,\"<br>\")}</td></tr>`}\nfunction make(r){\n let d=document.createElement(\"div\");d.className=\"print-page\";\n d.innerHTML=`<div class=\"r-title\">Industry Visit Report</div>\n <div class=\"r-school\">Name of the School :- ${esc(r.school)}</div>\n <table class=\"meta\"><tr>\n <td>Date<br>${esc(dtext(r.date))}</td><td>Trade<br>${esc(r.trade)}</td><td>Attendance<br>${esc(r.attendance)}</td><td>Classes covered<br>${esc(r.classes)}</td><td>Duration of Lecture<br>${esc(r.duration)}</td>\n </tr></table>\n <table class=\"report\">\n ${row(1,\"Name and address of the organization visited\",r.org)}\n ${row(2,\"Name and designation of the industry personnel who interacted with the students\",r.personnel)}\n ${row(3,\"Topics Covered\",r.topics)}\n ${row(4,\"Questions asked by students\",r.questions)}\n ${row(5,\"Feedback of the students about the topics covered.\",r.studentFeedback)}\n ${row(6,\"Remarks of the Vocational Teacher about the effectiveness and usefulness of the Field Visit\",r.teacherRemarks)}\n ${row(\"\", \"Topics covered or not, as per planed\",r.planned)}\n ${row(\"\", \"Depth of Information covered\",r.depth)}\n ${row(\"\", \"Overall Feedback about the industry visit\",r.overall)}\n ${row(7,\"Attach the Pictures\",r.pictures)}\n ${row(9,\"Attach Checklist for Field Visit Organized\",r.checklist)}\n ${row(10,\"Overall Feedback of the Vocational teacher about the industry visit\",r.vocOverall)}\n <tr class=\"signrow\"><td></td><td></td><td></td></tr>\n <tr class=\"bottom\"><td>Principal Sign &amp; Stamp</td><td></td><td>Vocational Trainer : ${esc(r.trainer)}</td></tr>\n </table>`;\n return d\n}\nfunction makePages(a){$(\"printPages\").innerHTML=\"\";a.forEach(r=>$(\"printPages\").appendChild(make(r)))}\nfunction load(id){let r=get().find(x=>x.id===id);if(!r)return;currentId=id;Object.keys(r).forEach(k=>{if($(k))$(k).value=r[k]});makePages([r]);msg(\"Loaded \"+id);window.scrollTo({top:0,behavior:\"smooth\"})}\nfunction render(){let a=get();$(\"list\").innerHTML=a.length?a.map(r=>`<div class=\"item\"><span><b>${esc(r.id)}</b> — ${esc(dtext(r.date))} — ${esc(r.org)}</span><span><button onclick=\"load('${r.id}')\">EDIT / VIEW</button></span></div>`).join(\"\"):\"No saved reports.\"}\nfunction generateAll(){let a=get();if(!a.length){alert(\"No saved reports.\");return}makePages(a);setTimeout(()=>window.print(),100)}\nfunction exportCSV(){let a=get();if(!a.length){alert(\"No records.\");return}let keys=Object.keys(a[0]);let csv=[keys.join(\",\"),...a.map(r=>keys.map(k=>`\"${String(r[k]??\"\").replace(/\"/g,'\"\"')}\"`).join(\",\"))].join(\"\\n\");let b=new Blob([csv],{type:\"text/csv\"}),u=URL.createObjectURL(b),x=document.createElement(\"a\");x.href=u;x.download=\"Industry_Visit_Reports.csv\";x.click();URL.revokeObjectURL(u)}\nfunction deleteAll(){if(confirm(\"Delete all saved reports?\")){localStorage.removeItem(KEY);currentId=\"\";render();msg(\"All records deleted.\")}}\n$(\"date\").value=today();render();\n", "funcs": ["clearForm", "data", "deleteAll", "dtext", "esc", "exportCSV", "generate", "generateAll", "get", "load", "make", "makePages", "msg", "newReport", "printReport", "render", "row", "saveReport", "today", "valid"]}, {"key": "marksAutomation", "title": "📝 Marks Automation", "prefix": "na_marksAutomation_", "styles": "<style>\n*{box-sizing:border-box}body{margin:0;font-family:Arial,sans-serif;background:#f3f6fa;color:#17202a}\nheader{background:#17365d;color:#fff;padding:18px}header h1{margin:0;font-size:24px}header p{margin:6px 0 0}\n.wrap{max-width:1200px;margin:auto;padding:15px}.card{background:#fff;padding:18px;margin-bottom:15px;border-radius:12px;box-shadow:0 2px 10px #0001}\nh2{margin:0 0 14px;font-size:20px}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}\nlabel{font-size:13px;font-weight:bold;display:block;margin-bottom:5px}\ninput,select{width:100%;padding:10px;border:1px solid #cbd5e1;border-radius:7px;font-size:14px;background:#fff}\nbutton{border:0;border-radius:7px;padding:10px 14px;font-weight:bold;cursor:pointer;margin:5px 5px 0 0}.primary{background:#17365d;color:#fff}.green{background:#198754;color:#fff}.gray{background:#64748b;color:#fff}.red{background:#c0392b;color:#fff}.light{background:#e2e8f0}\n.info{background:#eef5ff;border-left:4px solid #17365d;padding:10px;margin:10px 0;font-size:13px}.small{font-size:12px;color:#64748b}\n.actions{display:flex;flex-wrap:wrap;gap:10px;align-items:end}.actions>div{min-width:160px}\n.stats{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}.stat{background:#f8fafc;border:1px solid #e2e8f0;padding:12px;border-radius:8px;text-align:center}.stat b{display:block;font-size:20px;margin-top:4px}\n.tablewrap{overflow:auto}table{border-collapse:collapse;width:100%;min-width:1150px}th,td{border:1px solid #dbe2ea;padding:8px;font-size:12px;text-align:center}th{background:#17365d;color:#fff}\n.pass{color:#16803c;font-weight:bold}.fail{color:#c0392b;font-weight:bold}\n@media(max-width:850px){.grid{grid-template-columns:repeat(2,1fr)}.stats{grid-template-columns:repeat(2,1fr)}}@media(max-width:520px){.grid{grid-template-columns:1fr}}\n@media print{header,.entry,.filters,.no-print{display:none!important}body{background:#fff}.card{box-shadow:none}.tablewrap{overflow:visible}table{min-width:0;font-size:9px}}\n</style>", "markup": "<header><div style=\"max-width:1200px;margin:auto\"><h1>📊 Marks Automation System</h1><p>Form से marks submit करें → Result automatic बनेगा</p></div></header><div class=\"wrap\">\n<section class=\"card entry\">\n<h2>1. Student Marks Entry Form</h2>\n<div class=\"info\">9th/10th: Theory 40% = /40 + Practical /60.   |   11th/12th: Theory 50% = /50 + Practical /50.</div>\n<form \\1na_marksAutomation_marksForm\\2>\n<div class=\"grid\">\n<div><label>Class *</label><select \\1na_marksAutomation_className\\2 required=\"\"><option value=\"\">Select Class</option><option value=\"9th\">9th</option><option value=\"10th\">10th</option><option value=\"11th\">11th</option><option value=\"12th\">12th</option></select></div>\n<div><label>Subject *</label><input \\1na_marksAutomation_subject\\2 placeholder=\"e.g. IT / Employability Skills\" required=\"\"/></div>\n<div><label>Roll No. *</label><input \\1na_marksAutomation_roll\\2 min=\"1\" required=\"\" type=\"number\"/></div>\n<div><label>Student Name *</label><input \\1na_marksAutomation_student\\2 required=\"\"/></div>\n<div><label>Father's Name</label><input \\1na_marksAutomation_father\\2/></div>\n<div><label>Theory Marks /100 *</label><input \\1na_marksAutomation_theory\\2 max=\"100\" min=\"0\" required=\"\" step=\"0.01\" type=\"number\"/></div>\n<div><label \\1na_marksAutomation_practicalEntryLabel\\2>Practical Marks *</label><input \\1na_marksAutomation_practical\\2 min=\"0\" required=\"\" step=\"0.01\" type=\"number\"/></div>\n<div><label>Exam/Term</label><input \\1na_marksAutomation_term\\2 placeholder=\"Unit Test / Annual\"/></div>\n</div>\n<button class=\"primary\" type=\"submit\">➕ Submit Marks</button>\n<button class=\"light\" \\1na_marksAutomation_clearBtn\\2 type=\"button\">Clear Form</button>\n</form>\n<p class=\"small\">Records इसी browser में save होते हैं।</p>\n</section>\n<section class=\"card filters\">\n<h2>2. Result &amp; Filters</h2>\n<div class=\"actions\">\n<div><label>Class Filter</label><select \\1na_marksAutomation_filterClass\\2><option value=\"\">All Classes</option><option>9th</option><option>10th</option><option>11th</option><option>12th</option></select></div>\n<div><label>Subject Filter</label><input \\1na_marksAutomation_filterSubject\\2 placeholder=\"Subject\"/></div>\n<div><label>Search Student/Roll</label><input \\1na_marksAutomation_search\\2 placeholder=\"Name or Roll\"/></div>\n<div><label>Sort</label><select \\1na_marksAutomation_sortBy\\2><option value=\"roll\">Roll No.</option><option value=\"marks\">Final Marks</option><option value=\"name\">Name</option><option value=\"rank\">Rank</option></select></div>\n</div>\n<button class=\"green no-print\" \\1na_marksAutomation_exportBtn\\2>⬇ Export Excel/CSV</button>\n<button class=\"gray no-print\" \\1na_marksAutomation_printBtn\\2>🖨 Print / Save PDF</button>\n<button class=\"red no-print\" \\1na_marksAutomation_deleteAllBtn\\2>🗑 Delete All Records</button>\n</section>\n<section class=\"card\"><div class=\"stats\">\n<div class=\"stat\">Students <b \\1na_marksAutomation_sCount\\2>0</b></div><div class=\"stat\">Passed <b \\1na_marksAutomation_pCount\\2>0</b></div>\n<div class=\"stat\">Failed <b \\1na_marksAutomation_fCount\\2>0</b></div><div class=\"stat\">Average <b \\1na_marksAutomation_avg\\2>0</b></div><div class=\"stat\">Top Marks <b \\1na_marksAutomation_top\\2>0</b></div>\n</div></section>\n<section class=\"card\"><h2>3. Automatic Result</h2><div class=\"tablewrap\">\n<table><thead><tr>\n<th>Rank</th><th>Class</th><th>Subject</th><th>Roll</th><th>Student Name</th><th>Father's Name</th>\n<th>Theory /100</th><th \\1na_marksAutomation_weightedHeader\\2>Weighted Theory</th><th \\1na_marksAutomation_practicalHeader\\2>Practical</th><th>Final /100</th><th>%</th><th>Grade</th><th>Status</th><th class=\"no-print\">Action</th>\n</tr></thead><tbody \\1na_marksAutomation_resultBody\\2></tbody></table>\n</div></section>\n</div>", "js": "\n(function(){\n\"use strict\";\nvar KEY=\"marksAutomationRecords_v2\";\nvar records=[];\ntry{records=JSON.parse(localStorage.getItem(KEY)||\"[]\");if(!Array.isArray(records))records=[];}catch(e){records=[];}\n\nfunction $(id){return document.getElementById(id);}\nfunction save(){try{localStorage.setItem(KEY,JSON.stringify(records));}catch(e){alert(\"Browser storage उपलब्ध नहीं है। फिर भी record table में add होगा.\");}}\nfunction calc(r){\n var is910=(r.className===\"9th\"||r.className===\"10th\");\n var maxP=is910?60:50;\n var weighted=Math.ceil((Number(r.theory)||0)*(is910?.4:.5));\n var practical=Number(r.practical)||0;\n var final=Math.min(100,weighted+practical);\n var grade=final>=90?\"A+\":final>=80?\"A\":final>=70?\"B+\":final>=60?\"B\":final>=50?\"C\":final>=33?\"D\":\"F\";\n return {weighted:weighted,final:final,pct:final,grade:grade,status:final>=33?\"PASS\":\"FAIL\",maxP:maxP};\n}\nfunction esc(v){return String(v==null?\"\":v).replace(/[&<>\"']/g,function(m){return {\"&\":\"&amp;\",\"<\":\"&lt;\",\">\":\"&gt;\",\"\\\"\":\"&quot;\",\"'\":\"&#039;\"}[m];});}\nfunction updateHeaders(){\n var c=$(\"filterClass\").value;\n $(\"weightedHeader\").textContent=c===\"9th\"||c===\"10th\"?\"Weighted Theory /40\":c===\"11th\"||c===\"12th\"?\"Weighted Theory /50\":\"Weighted Theory\";\n $(\"practicalHeader\").textContent=c===\"9th\"||c===\"10th\"?\"Practical /60\":c===\"11th\"||c===\"12th\"?\"Practical /50\":\"Practical\";\n var entry=$(\"className\").value;\n $(\"practicalEntryLabel\").textContent=entry===\"9th\"||entry===\"10th\"?\"Practical Marks /60 *\":entry===\"11th\"||entry===\"12th\"?\"Practical Marks /50 *\":\"Practical Marks *\";\n $(\"practical\").max=entry===\"9th\"||entry===\"10th\"?60:entry===\"11th\"||entry===\"12th\"?50:\"\";\n}\nfunction filtered(){\n var fc=$(\"filterClass\").value, fs=$(\"filterSubject\").value.toLowerCase(), q=$(\"search\").value.toLowerCase();\n var a=records.filter(function(r){return (!fc||r.className===fc)&&(!fs||r.subject.toLowerCase().indexOf(fs)>=0)&&(!q||String(r.roll).indexOf(q)>=0||r.student.toLowerCase().indexOf(q)>=0);});\n var ranked=a.slice().sort(function(x,y){return calc(y).final-calc(x).final||x.roll-y.roll;});\n var rankMap={};var last=null,rank=0;\n ranked.forEach(function(r,i){var m=calc(r).final;if(m!==last){rank=i+1;last=m;}rankMap[r.id]=rank;});\n var s=$(\"sortBy\").value;\n a.sort(function(x,y){if(s===\"marks\")return calc(y).final-calc(x).final;if(s===\"name\")return x.student.localeCompare(y.student);if(s===\"rank\")return rankMap[x.id]-rankMap[y.id];return x.roll-y.roll;});\n return {a:a,rankMap:rankMap};\n}\nfunction render(){\n updateHeaders();\n var data=filtered(),a=data.a,rankMap=data.rankMap,body=$(\"resultBody\");body.innerHTML=\"\";\n a.forEach(function(r){\n  var c=calc(r),tr=document.createElement(\"tr\");\n  tr.innerHTML=\"<td>\"+rankMap[r.id]+\"</td><td>\"+esc(r.className)+\"</td><td>\"+esc(r.subject)+\"</td><td>\"+r.roll+\"</td><td>\"+esc(r.student)+\"</td><td>\"+esc(r.father)+\"</td><td>\"+r.theory+\"</td><td>\"+c.weighted+\"</td><td>\"+r.practical+\"</td><td><b>\"+c.final+\"</b></td><td>\"+c.pct.toFixed(2)+\"%</td><td>\"+c.grade+\"</td><td class='\"+(c.status===\"PASS\"?\"pass\":\"fail\")+\"'>\"+c.status+\"</td><td class='no-print'><button class='red' data-delete='\"+r.id+\"'>Delete</button></td>\";\n  body.appendChild(tr);\n });\n $(\"sCount\").textContent=a.length;$(\"pCount\").textContent=a.filter(function(r){return calc(r).status===\"PASS\";}).length;$(\"fCount\").textContent=a.filter(function(r){return calc(r).status===\"FAIL\";}).length;\n $(\"avg\").textContent=a.length?(a.reduce(function(s,r){return s+calc(r).final;},0)/a.length).toFixed(2):\"0\";\n $(\"top\").textContent=a.length?Math.max.apply(null,a.map(function(r){return calc(r).final;})):\"0\";\n}\n$(\"marksForm\").addEventListener(\"submit\",function(e){\n e.preventDefault();\n var cls=$(\"className\").value, subj=$(\"subject\").value.trim(), roll=Number($(\"roll\").value), student=$(\"student\").value.trim(), father=$(\"father\").value.trim(), theory=Number($(\"theory\").value), practical=Number($(\"practical\").value), term=$(\"term\").value.trim();\n var maxP=(cls===\"9th\"||cls===\"10th\")?60:50;\n if(!cls||!subj||!roll||!student){alert(\"कृपया * वाली सभी fields भरें।\");return;}\n if(!Number.isFinite(theory)||theory<0||theory>100){alert(\"Theory marks 0 से 100 के बीच रखें।\");return;}\n if(!Number.isFinite(practical)||practical<0||practical>maxP){alert(\"Practical marks maximum \"+maxP+\" हैं।\");return;}\n records.push({id:String(Date.now())+String(Math.random()).slice(2),className:cls,subject:subj,roll:roll,student:student,father:father,theory:theory,practical:practical,term:term});\n save();render();this.reset();updateHeaders();$(\"className\").focus();\n});\n$(\"className\").addEventListener(\"change\",updateHeaders);\n$(\"filterClass\").addEventListener(\"change\",render);$(\"filterSubject\").addEventListener(\"input\",render);$(\"search\").addEventListener(\"input\",render);$(\"sortBy\").addEventListener(\"change\",render);\n$(\"clearBtn\").addEventListener(\"click\",function(){$(\"marksForm\").reset();updateHeaders();$(\"className\").focus();});\n$(\"resultBody\").addEventListener(\"click\",function(e){var id=e.target.getAttribute(\"data-delete\");if(id&&confirm(\"इस record को delete करें?\")){records=records.filter(function(r){return String(r.id)!==String(id);});save();render();}});\n$(\"deleteAllBtn\").addEventListener(\"click\",function(){if(confirm(\"सभी records delete हो जाएंगे. Continue?\")){records=[];save();render();}});\n$(\"printBtn\").addEventListener(\"click\",function(){window.print();});\n$(\"exportBtn\").addEventListener(\"click\",function(){\n var d=filtered(),a=d.a,rm=d.rankMap;if(!a.length){alert(\"Export करने के लिए कोई record नहीं है।\");return;}\n var rows=[[\"Rank\",\"Class\",\"Subject\",\"Roll No\",\"Student Name\",\"Father's Name\",\"Theory /100\",\"Weighted Theory\",\"Practical\",\"Final /100\",\"Percentage\",\"Grade\",\"Status\"]];\n a.forEach(function(r){var c=calc(r);rows.push([rm[r.id],r.className,r.subject,r.roll,r.student,r.father,r.theory,c.weighted,r.practical,c.final,c.pct.toFixed(2)+\"%\",c.grade,c.status]);});\n var csv=\"\\ufeff\"+rows.map(function(row){return row.map(function(v){return '\"'+String(v).replace(/\"/g,'\"\"')+'\"';}).join(\",\");}).join(\"\\n\");\n var blob=new Blob([csv],{type:\"text/csv;charset=utf-8\"}),url=URL.createObjectURL(blob),ael=document.createElement(\"a\");ael.href=url;ael.download=\"Marks_Result.csv\";document.body.appendChild(ael);ael.click();ael.remove();URL.revokeObjectURL(url);\n});\nrender();\n})();\n", "funcs": ["$", "calc", "esc", "filtered", "render", "save", "updateHeaders"]}];
const escSel=(sel,prefix)=>{
  return String(sel).replace(
    /#([A-Za-z][\w-]*)/g,
    function(m,id){
      return '#'+prefix+id;
    }
  );
};

window.__nativeAuto=window.__nativeAuto||{};

/*
 * Convert automation markers safely.
 *
 * Supported forms:
 *   \1id\2
 *   actual control characters \x01id\x02
 *
 * This fixes the Guest Application null-element error because
 * all generated IDs are now created inside the automation root.
 */
function convertNativeMarkers(markup,prefix){
  const markerRegex=/\\1([\s\S]*?)\\2|\x01([\s\S]*?)\x02/g;

  return String(markup||'').replace(
    markerRegex,
    function(_,literalValue,controlValue){
      const value=String(
        literalValue!==undefined
          ? literalValue
          : controlValue
      ).trim();

      /*
       * Event marker:
       * \1window.__nativeAuto["guestApplication_update"]();window.print()\2
       */
      if(value.indexOf('window.__nativeAuto')===0){
        return 'onclick="'+
          value
            .replace(/&/g,'&amp;')
            .replace(/"/g,'&quot;')
            .replace(/</g,'&lt;')
            .replace(/>/g,'&gt;')+
          '"';
      }

      /*
       * Normal element marker:
       * \1month\2
       * becomes:
       * id="na_guestApplication_month"
       */
      const id=value.replace(/^#/,'');
      const pfx=String(prefix||'');

      const fullId=
        id.indexOf(pfx)===0
          ? id
          : pfx+id;

      return 'id="'+fullId+'"';
    }
  );
}


/*
 * Run each automation inside its own isolated root.
 *
 * Important:
 * document.getElementById("month")
 * will ONLY search inside the currently mounted automation.
 *
 * This prevents one automation from accidentally finding
 * elements belonging to another automation or admin.html.
 */
function runScript(root,prefix,key,src,funcs){

  const scoped=new Proxy(document,{

    get(t,p){

      /*
       * Scoped getElementById()
       */
      if(p==='getElementById'){
        return function(id){

          const localId=String(id==null?'':id);

          if(!localId){
            return null;
          }

          const pfx=String(prefix||'');

          /*
           * Automation JS normally asks for:
           * getElementById("month")
           *
           * Actual HTML ID:
           * na_guestApplication_month
           */
          const prefixedId=pfx+localId;

          /*
           * IDs used by this project contain only safe
           * characters, so direct selector is sufficient.
           */
          const prefixed=root.querySelector(
            '#'+prefixedId
          );

          if(prefixed){
            return prefixed;
          }

          /*
           * Also allow already-prefixed IDs.
           */
          if(localId.indexOf(pfx)===0){
            const direct=root.querySelector(
              '#'+localId
            );

            if(direct){
              return direct;
            }
          }

          /*
           * Fallback for elements whose IDs were deliberately
           * not prefixed. This is still limited to root.
           */
          return root.querySelector(
            '#'+localId
          );
        };
      }


      /*
       * Scoped querySelector()
       */
      if(p==='querySelector'){
        return function(sel){

          const selector=String(sel||'');

          try{
            return root.querySelector(
              escSel(selector,prefix)
            );
          }catch(e){
            /*
             * If selector rewriting is not applicable,
             * use the selector unchanged but STILL inside root.
             */
            return root.querySelector(selector);
          }
        };
      }


      /*
       * Scoped querySelectorAll()
       */
      if(p==='querySelectorAll'){
        return function(sel){

          const selector=String(sel||'');

          try{
            return root.querySelectorAll(
              escSel(selector,prefix)
            );
          }catch(e){
            return root.querySelectorAll(selector);
          }
        };
      }


      /*
       * document.body inside automation scripts should behave
       * like the current automation root.
       */
      if(p==='body'){
        return root;
      }


      /*
       * document.addEventListener()
       */
      if(p==='addEventListener'){
        return root.addEventListener.bind(root);
      }


      /*
       * All other normal document APIs remain available.
       * createElement(), createTextNode(), etc. continue to work.
       */
      const value=t[p];

      return typeof value==='function'
        ? value.bind(t)
        : value;
    }
  });


  /*
   * Execute automation JS and capture the functions listed
   * in item.funcs.
   */
  const code=
    'const document=__doc;'+
    src+
    ';return {'+
    funcs.map(function(n){
      return JSON.stringify(n)+
        ':(typeof '+n+
        '==="function"?'+n+':null)';
    }).join(',')+
    '};';


  try{

    const obj=Function(
      '__doc',
      'root',
      'prefix',
      'window',
      code
    )(
      scoped,
      root,
      prefix,
      window
    );


    /*
     * Store automation functions globally using unique names.
     *
     * Example:
     * guestApplication_update
     * guestApplication_clearForm
     */
    Object.entries(obj).forEach(function(entry){

      const name=entry[0];
      const fn=entry[1];

      if(typeof fn==='function'){
        window.__nativeAuto[
          key+'_'+name
        ]=fn;
      }
    });


  }catch(e){

    console.error(
      'Native automation init failed:',
      key,
      e
    );

    /*
     * Show the actual error inside the automation instead
     * of silently failing.
     */
    const errorBox=document.createElement('div');

    errorBox.className='message error';

    errorBox.style.cssText=
      'margin:10px 0;'+
      'padding:12px;'+
      'border-radius:8px;'+
      'background:#fee2e2;'+
      'color:#991b1b;'+
      'font-weight:600;';

    errorBox.textContent=
      'Automation could not initialize: '+
      String(e && e.message ? e.message : e);

    root.insertBefore(
      errorBox,
      root.firstChild
    );
  }
}


/*
 * Mount automation inside #nativeAutomationHost.
 */
function mount(key){

  const item=AUTO.find(function(x){
    return x.key===key;
  });

  if(!item){
    console.error(
      'Native automation not found:',
      key
    );
    return;
  }


  const host=document.getElementById(
    'nativeAutomationHost'
  );

  if(!host){
    console.error(
      'nativeAutomationHost not found.'
    );
    return;
  }


  /*
   * Remove previously opened automation.
   */
  host.innerHTML='';


  /*
   * Create isolated root.
   */
  const root=document.createElement('div');

  root.className='native-auto-tool';

  root.dataset.tool=key;


  /*
   * IMPORTANT FIX:
   *
   * Convert both literal markers and control-character
   * markers before assigning innerHTML.
   *
   * Earlier version could leave:
   *
   *     \1na_guestApplication_month\2
   *
   * untouched.
   *
   * Then the input did NOT receive the expected ID:
   *
   *     na_guestApplication_month
   *
   * Consequently:
   *
   *     document.getElementById("month")
   *
   * returned null.
   *
   * This caused:
   *
   *     Cannot set properties of null
   *     (setting 'textContent')
   */
  const markup=convertNativeMarkers(
    item.markup,
    item.prefix
  );


  /*
   * Insert styles + converted HTML.
   */
  root.innerHTML=
    String(item.styles||'')+
    markup;


  /*
   * Put automation into admin host BEFORE running JS.
   *
   * This is important because the automation scripts immediately
   * access their DOM elements during initialization.
   */
  host.appendChild(root);


  /*
   * Run isolated automation JS.
   */
  runScript(
    root,
    item.prefix,
    key,
    item.js,
    item.funcs||[]
  );


  /*
   * Resolve inline onclick handlers.
   *
   * Example:
   *
   * onclick="window.__nativeAuto[\"guestApplication_update\"]();window.print()"
   *
   * remains functional after mounting.
   */
  root.querySelectorAll('[onclick]').forEach(
    function(el){

      let s=el.getAttribute('onclick')||'';


      s=s.replace(
        /\b([A-Za-z_$][\w$]*)\s*\(/g,
        function(m,name){

          const fnName=
            key+'_'+name;

          if(
            window.__nativeAuto &&
            typeof window.__nativeAuto[fnName]==='function'
          ){
            return 'window.__nativeAuto["'+
              fnName+
              '"](';
          }

          return m;
        }
      );


      el.setAttribute(
        'onclick',
        s
      );
    }
  );


  /*
   * Scroll to the automation.
   */
  try{
    host.scrollIntoView({
      behavior:'smooth',
      block:'start'
    });
  }catch(e){
    host.scrollIntoView();
  }
}


/*
 * Public API used by admin.html.
 */
window.NativeAutomation={
  open:mount
};

})();
