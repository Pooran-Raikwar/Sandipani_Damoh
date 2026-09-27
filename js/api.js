/* Sandipani API client: GitHub Pages -> Google Apps Script */
const API = (() => {
  const url = (typeof CONFIG !== 'undefined' && CONFIG.API_URL) ? CONFIG.API_URL : '';

  async function call(action, data = {}) {
    if (!url) throw new Error('Google Apps Script URL is not configured.');
    const res = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type':'text/plain;charset=utf-8'},
      body: JSON.stringify({action, ...data})
    });
    const text = await res.text();
    let out;
    try { out = JSON.parse(text); }
    catch(e) { throw new Error('Invalid response from Google Apps Script. Check the Web App deployment.'); }
    if (out && out.ok === false) throw new Error(out.error || 'Request failed.');
    return out && Object.prototype.hasOwnProperty.call(out,'data') ? out.data : out;
  }

  return {
    call,
    getSettings:()=>call('settings'),
    getConfig:()=>call('config'),
    registerStudent:data=>call('register',{data}),

    verifyAdmin:pin=>call('verifyAdmin',{pin}),
    getStats:(pin,filters)=>call('stats',{pin,filters}),
    getStudents:(pin,filters)=>call('students',{pin,filters}),
    updateStudent:(pin,row,data)=>call('updateStudent',{pin,row,data}),
    deleteStudent:(pin,row)=>call('deleteStudent',{pin,row}),
    getDeleted:pin=>call('deleted',{pin}),
    restoreDeleted:(pin,row)=>call('restore',{pin,row}),
    saveSettings:(pin,settings)=>call('saveSettings',{pin,settings}),
    saveConfig:(pin,config)=>call('saveConfig',{pin,config}),

    saveMarks:(pin,data)=>call('saveMarks',{pin,data}),
    getMarks:(pin,studentRow)=>call('getMarks',{pin,studentRow}),
    getResult:(roll,medium,Class)=>call('result',{roll,medium,class:Class}),

    // Gallery API — matches the current Gallery backend exactly.
    getGallery:()=>call('galleryList'),

    uploadGallery:(pin,data)=>{
      const d = data || {};
      const sectionMap = {
        guest:'Guest Lectures Photos',
        industrial:'Industrial Visit Photos',
        classroom:'Class Room Teaching',
        activities:'Student Activities'
      };
      const rawSection = d.section || d.category || '';
      const section = sectionMap[rawSection] || rawSection;
      return call('galleryUpload',{
        pin,
        data:{
          section,
          title:d.title || '',
          mimeType:d.mimeType || 'image/jpeg',
          base64:d.base64 || ''
        }
      });
    },

    deleteGallery:(pin,id)=>call('galleryDelete',{pin,id}),

    // Books & Notes
    getBooks:(filters)=>call('booksList',{filters}),
    getNotes:(filters)=>call('notesList',{filters}),
    uploadResource:(pin,data)=>call('resourceUpload',{pin,data}),
    deleteResource:(pin,id,type)=>call('resourceDelete',{pin,id,type}),

    // Advanced administration
    getNotices:()=>call('noticesList'),
    saveNotice:(pin,data)=>call('noticeSave',{pin,data}),
    deleteNotice:(pin,id)=>call('noticeDelete',{pin,id}),
    getGuestLectures:(pin)=>call('guestLectures',{pin}),
    saveGuestLecture:(pin,data)=>call('guestLectureSave',{pin,data}),
    deleteGuestLecture:(pin,id)=>call('guestLectureDelete',{pin,id}),
    getApplications:(pin)=>call('applications',{pin}),
    getStaff:(pin)=>call('staffList',{pin}),
    saveStaff:(pin,data)=>call('staffSave',{pin,data}),
    deleteStaff:(pin,id)=>call('staffDelete',{pin,id}),
    getDocuments:(pin)=>call('documentsList',{pin}),
    uploadDocument:(pin,data)=>call('documentUpload',{pin,data})
  };
})();

function apiCall(action,data){return API.call(action,data);}

API.aiChat = async function(data){ return API.call('aiChat', {data:data||{}}); };
API.aiStatus = async function(pin){ return API.call('aiStatus', {pin:pin}); };
