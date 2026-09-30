// Accessible Combobox (vanilla JS, ARIA 1.2)
// Progressive enhancement: renders a year picker with keyboard support
// Keys: ArrowUp/Down, Home/End, Enter (select), Escape (close), typeahead buffer

(function initComboboxModule() {
  const root = document.getElementById('demo-birthyear-root');
  if (!root) return; // Nothing to do on pages without the demo container

  // Utility: unique ids per instance
  let uidCounter = 0;
  const uid = function (prefix) { return prefix + '-' + (++uidCounter); };

  // Dataset: birth years from current year back 120 years
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 121 }, function (_, i) { return String(currentYear - i); });

  // Build DOM
  const wrap = document.createElement('div');
  wrap.className = 'relative';

  const labelId = uid('label');
  const listboxId = uid('listbox');
  const helpId = uid('help');

  const label = document.createElement('label');
  label.id = labelId;
  label.className = 'block text-sm font-medium text-slate-700';
  label.textContent = 'Birth year';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = [
    'mt-1 block w-full rounded-md border border-slate-300 bg-white',
    'px-3 py-2 text-base text-slate-900 placeholder-slate-400',
    'focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500',
  ].join(' ');
  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('aria-expanded', 'false');
  input.setAttribute('aria-controls', listboxId);
  input.setAttribute('aria-labelledby', labelId);
  input.setAttribute('aria-describedby', helpId);
  input.placeholder = 'e.g. ' + String(currentYear - 70);
  input.autocomplete = 'off';
  input.spellcheck = false;

  const help = document.createElement('p');
  help.id = helpId;
  help.className = 'mt-2 text-sm text-slate-600';
  help.textContent = 'Use Arrow keys to navigate, Enter to select, Escape to close.';

  const listbox = document.createElement('div');
  listbox.id = listboxId;
  listbox.setAttribute('role', 'listbox');
  listbox.className = [
    'absolute left-0 right-0 mt-1 max-h-60 overflow-auto z-10',
    'rounded-md border border-slate-200 bg-white shadow-lg',
    'hidden',
  ].join(' ');
  listbox.tabIndex = -1; // managed focus with aria-activedescendant

  // Populate options
  const optionEls = years.map(function (y) {
    const opt = document.createElement('div');
    opt.setAttribute('role', 'option');
    opt.id = uid('option');
    opt.textContent = y;
    opt.className = 'cursor-pointer px-3 py-2 text-slate-900 hover:bg-slate-100';
    opt.setAttribute('aria-selected', 'false');
    listbox.appendChild(opt);
    return opt;
  });

  // State
  let open = false;
  let activeIndex = -1; // highlighted option index
  let selectedIndex = -1; // committed selection
  let typeBuffer = '';
  let typeTimer = 0;

  function openList() {
    if (open) return;
    open = true;
    listbox.classList.remove('hidden');
    input.setAttribute('aria-expanded', 'true');
    if (activeIndex === -1) setActive(Math.max(0, selectedIndex));
  }

  function closeList() {
    if (!open) return;
    open = false;
    listbox.classList.add('hidden');
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
  }

  function setActive(index) {
    const clamped = Math.max(0, Math.min(optionEls.length - 1, index));
    if (activeIndex === clamped) return;
    if (activeIndex >= 0) optionEls[activeIndex].classList.remove('bg-sky-600', 'text-white');
    activeIndex = clamped;
    const el = optionEls[activeIndex];
    el.classList.add('bg-sky-600', 'text-white');
    input.setAttribute('aria-activedescendant', el.id);
    // Ensure visibility
    el.scrollIntoView({ block: 'nearest' });
  }

  function clearActiveVisual() {
    if (activeIndex >= 0) optionEls[activeIndex].classList.remove('bg-sky-600', 'text-white');
    activeIndex = -1;
  }

  function commit(index) {
    const el = optionEls[index];
    if (!el) return;
    // Update selection flags
    if (selectedIndex >= 0) optionEls[selectedIndex].setAttribute('aria-selected', 'false');
    selectedIndex = index;
    el.setAttribute('aria-selected', 'true');
    // Reflect in input
    input.value = el.textContent || '';
    // Announce selection
    input.title = 'Selected ' + input.value;
    closeList();
  }

  function move(delta) {
    if (!open) openList();
    setActive((activeIndex === -1 ? 0 : activeIndex) + delta);
  }

  function moveHome() {
    if (!open) openList();
    setActive(0);
  }

  function moveEnd() {
    if (!open) openList();
    setActive(optionEls.length - 1);
  }

  function isPrintableKey(evt) {
    return (
      evt.key.length === 1 &&
      !evt.ctrlKey &&
      !evt.metaKey &&
      !evt.altKey
    );
  }

  function typeahead(ch) {
    window.clearTimeout(typeTimer);
    typeBuffer += ch.toLowerCase();
    const idx = optionEls.findIndex(function (el) { return (el.textContent || '').toLowerCase().startsWith(typeBuffer); });
    if (idx !== -1) {
      if (!open) openList();
      setActive(idx);
    }
    typeTimer = window.setTimeout(function () {
      typeBuffer = '';
    }, 500);
  }

  // Event wiring
  input.addEventListener('focus', function () {
    // Do nothing; open on first Arrow/Home/End
  });

  input.addEventListener('click', function () {
    if (open) closeList(); else openList();
  });

  input.addEventListener('keydown', function (evt) {
    switch (evt.key) {
      case 'ArrowDown':
        evt.preventDefault();
        move(1);
        break;
      case 'ArrowUp':
        evt.preventDefault();
        move(-1);
        break;
      case 'Home':
        evt.preventDefault();
        moveHome();
        break;
      case 'End':
        evt.preventDefault();
        moveEnd();
        break;
      case 'Enter':
        if (open && activeIndex >= 0) {
          evt.preventDefault();
          commit(activeIndex);
        }
        break;
      case 'Escape':
        if (open) {
          evt.preventDefault();
          closeList();
          clearActiveVisual();
        }
        break;
      default:
        if (isPrintableKey(evt)) typeahead(evt.key);
        break;
    }
  });

  // Click selection
  listbox.addEventListener('mousedown', function (evt) {
    const target = evt.target;
    const el = target && target.closest ? target.closest('[role=option]') : null;
    if (!el) return;
    evt.preventDefault();
    const idx = optionEls.indexOf(el);
    if (idx !== -1) commit(idx);
  });

  // Close on outside click
  document.addEventListener('mousedown', function (evt) {
    if (!open) return;
    if (wrap.contains(evt.target)) return;
    closeList();
  });

  // Mount
  wrap.appendChild(label);
  wrap.appendChild(input);
  wrap.appendChild(listbox);
  wrap.appendChild(help);
  root.innerHTML = '';
  root.appendChild(wrap);
})();

export {};
