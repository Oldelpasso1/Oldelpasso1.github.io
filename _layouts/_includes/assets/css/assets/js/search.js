// fetch search.json and do simple full-text search on title and content
(async function(){
  const input = document.getElementById('search-input');
  const resultsBox = document.getElementById('search-results');
  if(!input) return;
  let index = [];
  try {
    const r = await fetch('/search.json');
    index = await r.json();
  } catch(e) {
    console.warn('Impossible de charger search.json', e);
  }

  input.addEventListener('input', function(){
    const q = this.value.trim().toLowerCase();
    resultsBox.innerHTML = '';
    if(!q) return;
    const hits = index.filter(p => (p.title + ' ' + p.content).toLowerCase().includes(q));
    for(const h of hits.slice(0,20)){
      const el = document.createElement('div');
      el.className = 'search-hit';
      el.innerHTML = `<a href="${h.url}">${h.title}</a><div class="hit-meta">${h.date}</div>`;
      resultsBox.appendChild(el);
    }
  });
})();
