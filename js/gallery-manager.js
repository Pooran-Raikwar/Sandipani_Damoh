(function(){
const API_URL=()=>localStorage.getItem('sandipani_api_url')||((typeof CONFIG!=='undefined'&&CONFIG.API_URL)||'');
let PIN='';
const $=id=>document.getElementById(id);

async function call(action,data={}){
  const r=await fetch(API_URL(),{
    method:'POST',
    headers:{'Content-Type':'text/plain;charset=utf-8'},
    body:JSON.stringify({action,...data})
  });
  const t=await r.text();
  let o;
  try{o=JSON.parse(t)}catch(e){throw new Error('Invalid backend response.')}
  if(o.ok===false)throw new Error(o.error||'Request failed');
  return o.data;
}

function msg(id,t,type){
  const e=$(id);
  e.textContent=t;
  e.className='message '+type;
  e.style.display='block';
}

function esc(v){
  return String(v??'').replace(/[&<>"']/g,m=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
  }[m]));
}

/*
  The Gallery sheet uses these exact backend header names:
  ID, Section, Title, File ID, Image URL.
  Keep compatibility with the old lowercase field names too.
*/
function field(row,primary,fallback){
  if(row && row[primary]!==undefined && row[primary]!==null && row[primary]!=='') return row[primary];
  return row ? row[fallback] : '';
}

async function load(){
  const rows=await call('galleryList');

  $('list').innerHTML=rows.length
    ? rows.map(x=>{
        const id=field(x,'ID','id');
        const title=field(x,'Title','title');
        const section=field(x,'Section','section');
        const url=field(x,'Image URL','url');

        return `<div class="manager-card">
          <img src="${esc(url)}" alt="${esc(title)}" loading="lazy" onerror="this.style.display='none';this.parentElement.classList.add('image-error')">
          <div class="body">
            <b>${esc(title)}</b><br><small>${esc(section)}</small><br>
            <div class="manager-actions"><button class="btn secondary" data-edit="${esc(id)}">Edit / Replace</button><button class="btn danger" data-id="${esc(id)}">Delete</button></div>
          </div>
        </div>`;
      }).join('')
    : '<div class="notice">No uploaded photos yet.</div>';

  document.querySelectorAll('.manager-card [data-id]').forEach(b=>b.onclick=async()=>{
    if(!confirm('Delete this gallery photo?'))return;
    try{await call('galleryDelete',{pin:PIN,id:b.dataset.id});await load();}catch(e){alert(e.message);}
  });
  document.querySelectorAll('.manager-card [data-edit]').forEach(b=>b.onclick=()=>editGallery(b.dataset.edit));
}

async function editGallery(id){
  const title=prompt('New photo title (leave blank to keep current):');
  const f=await chooseImage_();
  if(title===null && !f)return;
  const data={}; if(title!==null && title.trim())data.title=title.trim();
  if(f){const prepared=await fileToBase64_(f);Object.assign(data,prepared);}
  try{await call('galleryUpdate',{pin:PIN,id,data});await load();}catch(e){alert(e.message);}
}
function chooseImage_(){return new Promise(resolve=>{const i=document.createElement('input');i.type='file';i.accept='image/*';i.onchange=()=>resolve(i.files[0]||null);i.click();});}
function fileToBase64_(f){return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve({base64:r.result,mimeType:f.type,fileName:f.name});r.onerror=reject;r.readAsDataURL(f);});}
$('loginBtn').onclick=async()=>{
  try{
    const d=await call('verifyAdmin',{pin:$('pin').value.trim()});
    if(!d.valid)throw new Error('Invalid Admin PIN');
    PIN=$('pin').value.trim();
    if(window.SiteMedia)window.SiteMedia.setPin(PIN);
    $('login').classList.add('hidden');
    $('panel').classList.remove('hidden');
    await load();
  }catch(e){
    msg('loginMsg',e.message,'error');
  }
};

$('file').onchange=()=>{
  const f=$('file').files[0];
  if(!f)return;
  $('preview').src=URL.createObjectURL(f);
  $('preview').classList.remove('hidden');
};

$('uploadBtn').onclick=async()=>{
  const f=$('file').files[0];
  if(!f)return msg('status','Please select an image.','error');
  if(f.size>5*1024*1024)return msg('status','Please use an image below 5 MB.','error');

  const reader=new FileReader();
  reader.onload=async()=>{
    try{
      $('uploadBtn').disabled=true;
      $('uploadBtn').textContent='Uploading…';

      await call('galleryUpload',{
        pin:PIN,
        data:{
          category:$('category').value,
          title:$('title').value.trim(),
          mimeType:f.type,
          base64:reader.result
        }
      });

      $('title').value='';
      $('file').value='';
      $('preview').classList.add('hidden');
      msg('status','Photo uploaded successfully.','success');
      await load();
    }catch(e){
      msg('status',e.message,'error');
    }finally{
      $('uploadBtn').disabled=false;
      $('uploadBtn').textContent='Upload Photo';
    }
  };
  reader.readAsDataURL(f);
};
})();