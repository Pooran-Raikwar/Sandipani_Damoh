async function load(){
  const box=document.getElementById('siteMediaList');
  if(!box)return;

  // UI immediately show — backend response ka wait nahi karega
  box.innerHTML=`
    <div class="manager-card">
      <div class="body">
        <b>Teacher Profile</b>
        <small>Teacher profile photo</small>
        <input type="file" accept="image/*" data-key="teacher-profile">
        <button class="btn primary site-media-upload" data-key="teacher-profile">
          Replace Image
        </button>
      </div>
    </div>

    <div class="manager-card">
      <div class="body">
        <b>School Logo</b>
        <small>School website logo</small>
        <input type="file" accept="image/*" data-key="school-logo">
        <button class="btn primary site-media-upload" data-key="school-logo">
          Replace Image
        </button>
      </div>
    </div>
  `;

  bindButtons();

  // Backend data background me load hoga
  try{
    const rows=await call('siteMediaList');

    if(Array.isArray(rows)&&rows.length){
      box.innerHTML=rows.map(x=>`
        <div class="manager-card">
          <img src="${esc(x['Image URL']||'')}"
               alt="${esc(x.Title||x.Key)}"
               onerror="this.style.display='none'">
          <div class="body">
            <b>${esc(x.Title||x.Key)}</b>
            <small>${esc(x.Description||'')}</small>
            <input type="file" accept="image/*" data-key="${esc(x.Key)}">
            <button class="btn primary site-media-upload" data-key="${esc(x.Key)}">
              Replace Image
            </button>
          </div>
        </div>
      `).join('');

      bindButtons();
    }
  }catch(e){
    console.warn('Site media data load failed:',e);
  }

  function bindButtons(){
    box.querySelectorAll('.site-media-upload').forEach(b=>{
      b.onclick=()=>replace(
        b.dataset.key,
        b.previousElementSibling
      );
    });
  }
}
