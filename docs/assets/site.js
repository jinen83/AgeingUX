(function () {
  const yearEl = document.getElementById(year);
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const toggle = document.getElementById(nav-toggle);
  const mobile = document.getElementById(site-nav-mobile);
  if (toggle && mobile) {
    toggle.addEventListener(click, () => {
      const expanded = toggle.getAttribute(aria-expanded) === "true";
      toggle.setAttribute(aria-expanded, String(!expanded));
      mobile.classList.toggle(hidden);
    });
  }
})();
