export function mountAnchoredList(root, opts = {}) {
  if (!root) return { destroy(){} };
  const min = opts.minAge ?? 18;
  const max = opts.maxAge ?? 100;
  const anchor = opts.anchor ?? 30;
  const h = opts.height ?? 240;
  const ages = [];
  const seen = new Set();
  const A = Math.min(max, Math.max(min, Math.round(anchor)));
  const push = (n) => { if (n < min || n > max || seen.has(n)) return; seen.add(n); ages.push(n); };
  push(A);
  let k = 1;
  while (ages.length < (max - min + 1)) { push(A + k); push(A - k); k++; }
  const id = 'anchored-' + Math.random().toString(36).slice(2,8);
  const lid = id + '-label';
  const L = document.createElement('label'); L.id = lid; L.className = 'sr-only'; L.htmlFor = id; L.textContent = opts.label || 'Age';
  const U = document.createElement('ul'); U.id = id; U.setAttribute('role','listbox'); U.tabIndex = 0; U.className = 'anchored-list'; U.style.height = h + 'px'; U.style.maxHeight = h + 'px'; U.style.overflowY = 'auto';
  const optId = (i) => id + '-opt-' + i; let active = 0, selected = -1; const items = [];
  function paint(i){ const li = items[i]; if(!li) return; const on = i===active, sel = i===selected; li.className = ['cursor-pointer select-none px-3 py-2 text-sm', on?'bg-teal-600/20 text-white':'text-gray-200', sel?'font-medium':''].filter(Boolean).join(' '); li.setAttribute('aria-selected', String(!!sel)); }
  function setActive(i, reveal=true){ i=Math.max(0, Math.min(items.length-1, i)); if(i===active) return; const prev=active; active=i; if(prev>=0) paint(prev); paint(active); U.setAttribute('aria-activedescendant', optId(active)); if(reveal) items[active].scrollIntoView({block:'nearest'}); }
  ages.forEach((age,i)=>{ const li=document.createElement('li'); li.id=optId(i); li.setAttribute('role','option'); li.className='cursor-pointer select-none px-3 py-2 text-sm text-gray-200'; li.textContent=String(age); li.addEventListener('mouseenter',()=>setActive(i,false)); li.addEventListener('mousedown',e=>e.preventDefault()); li.addEventListener('click',()=>{selected=i; paint(i);}); items.push(li); U.appendChild(li); });
  U.addEventListener('keydown', (e)=>{ switch(e.key){ case 'ArrowDown': e.preventDefault(); setActive(active+1); break; case 'ArrowUp': e.preventDefault(); setActive(active-1); break; case 'Home': e.preventDefault(); setActive(0); items[0].scrollIntoView({block:'nearest'}); break; case 'End': e.preventDefault(); setActive(items.length-1); items[items.length-1].scrollIntoView({block:'nearest'}); break; case 'PageDown': e.preventDefault(); setActive(active+5); break; case 'PageUp': e.preventDefault(); setActive(active-5); break; case ' ': case 'Enter': e.preventDefault(); selected=active; paint(active); break; }});
  root.innerHTML=''; root.appendChild(L); root.appendChild(U); requestAnimationFrame(()=>{ paint(active); U.setAttribute('aria-activedescendant', optId(active)); items[0].scrollIntoView({block:'center'}); });
  return { destroy(){ U.replaceWith(U.cloneNode(false)); }, getActive:()=>ages[active], getSelected:()=> (selected>=0?ages[selected]:null), focus:()=>U.focus(), root:U, items:[...ages] };
}
if (typeof window!=='undefined' && typeof document!=='undefined'){ const r=document.getElementById('demo-anchored-root'); if(r) mountAnchoredList(r,{minAge:18,maxAge:100,anchor:30,height:240}); }
export default mountAnchoredList;
