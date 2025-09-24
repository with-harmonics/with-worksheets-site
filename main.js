async function load(){
  const res = await fetch('data/worksheets.json'); const list = await res.json();
  const q=document.getElementById('q'), grade=document.getElementById('grade'), subject=document.getElementById('subject'), results=document.getElementById('results');
  function render(items){ results.innerHTML=''; if(items.length===0){results.innerHTML='<p>該当するプリントが見つかりませんでした。</p>'; return;}
    for(const w of items){ const card=document.createElement('article'); card.className='card'; card.innerHTML=`
      <img src="${w.thumb}" alt="${w.title}のサムネイル">
      <div class="meta"><h3 class="title">${w.title}</h3><div class="chips"><span class="chip">${w.grade}</span><span class="chip">${w.subject}</span><span class="chip">${w.level}</span></div></div>
      <div class="actions"><a class="button primary" href="${w.pdf}" target="_blank" rel="noopener">PDFを印刷</a><a class="button secondary" href="worksheet.html?id=${w.id}">詳細</a></div>`; results.appendChild(card);}}
  function filter(){ const qv=q.value.trim(), gv=grade.value, sv=subject.value;
    render(list.filter(w=>{const inQ=!qv||(w.title+' '+w.unit+' '+w.tags.join(' ')).includes(qv); const inG=!gv||w.grade===gv; const inS=!sv||w.subject===sv; return inQ&&inG&&inS;}));}
  q.addEventListener('input',filter); grade.addEventListener('change',filter); subject.addEventListener('change',filter); render(list);
} document.addEventListener('DOMContentLoaded',load);