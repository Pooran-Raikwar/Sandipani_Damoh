from pathlib import Path
p=Path('/mnt/data/v21work/backend/Code.gs')
s=p.read_text()
s=s.replace("const SHEETS = { admissionTests:'Admission Tests'", "const SHEETS = { learningCourses:'Learning Courses', learningLessons:'Learning Lessons', practicalModules:'Practical Modules', quizBank:'Quiz Bank', admissionTests:'Admission Tests'")
needle="const ADMISSION_SELECTED_HEADERS=['Selection ID'"
insert="""const LEARNING_COURSE_HEADERS=['ID','Updated At','Class','Trade','Medium','Icon','Level','Title','Description','Active'];
const LEARNING_LESSON_HEADERS=['ID','Updated At','Course ID','Order','Code','Title','Content','Active'];
const PRACTICAL_HEADERS=['ID','Updated At','Module','Title','Description','Duration','Instructions','Active'];
const QUIZ_HEADERS=['ID','Updated At','Class','Trade','Unit','Mode','Time','Question','Option A','Option B','Option C','Option D','Correct','Explanation','Active'];
"""
s=s.replace(needle,insert+needle)
# add ensure sheets after setup start
needle2="function setup_(){\n"
s=s.replace(needle2, needle2+"  ensureSheet_(SHEETS.learningCourses,LEARNING_COURSE_HEADERS); ensureSheet_(SHEETS.learningLessons,LEARNING_LESSON_HEADERS); ensureSheet_(SHEETS.practicalModules,PRACTICAL_HEADERS); ensureSheet_(SHEETS.quizBank,QUIZ_HEADERS);\n",1)
# insert functions before route_
marker="function route_(action,d){"
func=r'''
function contentRows_(name){setup_(); const sh=sheet_(name),h=headers_(sh); return values_(sh).map(r=>obj_(h,r));}
function contentSave_(pin,name,headers,data){if(!verify_(pin))throw new Error('Invalid Admin PIN');setup_();data=data||{};const sh=sheet_(name),h=headers_(sh);const id=norm_(data.id)||('CNT-'+Utilities.getUuid().slice(0,8));const rows=values_(sh),ii=h.indexOf('ID'),idx=rows.findIndex(r=>norm_(r[ii])===id);let vals;
 if(name===SHEETS.learningCourses) vals=[id,new Date(),norm_(data.class),norm_(data.trade),norm_(data.medium)||'Hindi|English',norm_(data.icon)||'📘',norm_(data.level)||'Skill',norm_(data.title),norm_(data.description),data.active===false?'No':'Yes'];
 else if(name===SHEETS.learningLessons) vals=[id,new Date(),norm_(data.courseId),Number(data.order)||1,norm_(data.code)||String(Number(data.order)||1).padStart(2,'0'),norm_(data.title),norm_(data.content),data.active===false?'No':'Yes'];
 else if(name===SHEETS.practicalModules) vals=[id,new Date(),norm_(data.module),norm_(data.title),norm_(data.description),norm_(data.duration),norm_(data.instructions),data.active===false?'No':'Yes'];
 else vals=[id,new Date(),norm_(data.class),norm_(data.trade),norm_(data.unit),norm_(data.mode)||'practice',Number(data.time)||0,norm_(data.question),norm_(data.optionA),norm_(data.optionB),norm_(data.optionC),norm_(data.optionD),Math.max(0,Math.min(3,Number(data.correct)||0)),norm_(data.explanation),data.active===false?'No':'Yes'];
 if(idx>=0)sh.getRange(idx+2,1,1,h.length).setValues([vals]);else sh.appendRow(vals);audit_('CONTENT_SAVE',name+' / '+id);return {ok:true,id};}
function contentDelete_(pin,name,id){if(!verify_(pin))throw new Error('Invalid Admin PIN');setup_();const sh=sheet_(name),h=headers_(sh),rows=values_(sh),ii=h.indexOf('ID'),idx=rows.findIndex(r=>norm_(r[ii])===norm_(id));if(idx<0)throw new Error('Record not found.');sheet_(SHEETS.deleted).appendRow([new Date(),Utilities.getUuid(),'Content '+name,JSON.stringify(obj_(h,rows[idx]))]);sh.deleteRow(idx+2);audit_('CONTENT_DELETE',name+' / '+id);return {ok:true};}
function learningPublic_(){const courses=contentRows_(SHEETS.learningCourses).filter(x=>String(x.Active).toLowerCase()!=='no');const lessons=contentRows_(SHEETS.learningLessons).filter(x=>String(x.Active).toLowerCase()!=='no');return {courses:courses.map(c=>Object.assign(c,{lessons:lessons.filter(l=>norm_(l['Course ID'])===norm_(c.ID)).sort((a,b)=>Number(a.Order)-Number(b.Order))}))};}
function practicalPublic_(){return {modules:contentRows_(SHEETS.practicalModules).filter(x=>String(x.Active).toLowerCase()!=='no')};}
function quizPublic_(){return {questions:contentRows_(SHEETS.quizBank).filter(x=>String(x.Active).toLowerCase()!=='no')};}
'''
s=s.replace(marker,func+marker)
# routes
route_marker="    case 'admissionTests':"
routes="    case 'learningPublic': return learningPublic_();\n    case 'practicalPublic': return practicalPublic_();\n    case 'quizPublic': return quizPublic_();\n    case 'learningCourses': return contentRows_(SHEETS.learningCourses);\n    case 'learningLessons': return contentRows_(SHEETS.learningLessons);\n    case 'practicalModules': return contentRows_(SHEETS.practicalModules);\n    case 'quizBank': return contentRows_(SHEETS.quizBank);\n    case 'contentSave': return contentSave_(d.pin,d.type,d.headers||[],d.data||d);\n    case 'contentDelete': return contentDelete_(d.pin,d.type,d.id);\n"
s=s.replace(route_marker,routes+route_marker)
p.write_text(s)
