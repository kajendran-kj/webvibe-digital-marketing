(function(){
  const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  fetch('/api/content').then(r=>r.ok?r.json():null).then(c=>{
    if(!c) return;
    const map = {'[data-cms="hero-badge"]':c.hero?.badge,'[data-cms="hero-title"]':c.hero?.title,'[data-cms="hero-description"]':c.hero?.description};
    Object.entries(map).forEach(([sel,val])=>{const el=document.querySelector(sel); if(el&&val) el.textContent=val;});
    const serviceGrid=document.querySelector('[data-cms-services]');
    if(serviceGrid && Array.isArray(c.services)){
      serviceGrid.querySelectorAll('[data-cms-service]').forEach((el,i)=>{const s=c.services.filter(x=>x.active!==false)[i]; if(s){const h=el.querySelector('h3'),p=el.querySelector('p'); if(h)h.textContent=s.name;if(p)p.textContent=s.description;}});
    }
    document.querySelectorAll('[data-cms-setting]').forEach(el=>{const k=el.dataset.cmsSetting; const v=c.settings?.[k]; if(v){if(el.tagName==='IMG')el.src=v; else el.textContent=v;}});
  }).catch(()=>{});
})();
