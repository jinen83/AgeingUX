// Year Input Validation Demo (ES module)
export function validateYear(input, min, max) {
  const raw = String(input ?? "").trim();
  if (raw.length === 0) return { valid: false, error: "Enter a 4-digit year" };
  if (!/^\d{1,4}$/.test(raw)) return { valid: false, error: "Use digits only (0-9)" };
  if (raw.length < 4) return { valid: false, error: "Enter all 4 digits" };
  const year = Number(raw);
  if (Number.isNaN(year)) return { valid: false, error: "Enter a valid year" };
  if (year < min) return { valid: false, error: "Year must be >= " + String(min) };
  if (year > max) return { valid: false, error: "Year must be <= " + String(max) };
  return { valid: true, value: year };
}

function getOrCreateErrorEl(input) {
  const doc = input.ownerDocument || document;
  const id = input.getAttribute("id");
  let errId = id ? `${id}-error` : "";
  if (!errId) {
    errId = `year-input-error-${Math.random().toString(36).slice(2, 8)}`;
  }
  let el = doc.getElementById(errId);
  if (!el) {
    el = doc.createElement("p");
    el.id = errId;
    el.setAttribute("role", "alert");
    el.setAttribute("aria-live", "polite");
    el.className = "mt-1 text-sm text-red-600";
    input.insertAdjacentElement("afterend", el);
  }
  return el;
}

function setDescribedBy(input, errId, present) {
  const tokens = new Set(
    (input.getAttribute("aria-describedby") || "")
      .split(/\s+/)
      .filter(Boolean)
  );
  if (present) tokens.add(errId); else tokens.delete(errId);
  const next = Array.from(tokens).join(" ");
  if (next) input.setAttribute("aria-describedby", next);
  else input.removeAttribute("aria-describedby");
}

function getBounds(input) {
  const now = new Date();
  const fallbackMin = 1900;
  const fallbackMax = now.getFullYear();
  const readNum = (attr) => {
    const v = input.getAttribute(attr);
    return v != null && v !== "" && !Number.isNaN(Number(v)) ? Number(v) : null;
  };
  const dataMin = readNum("data-min");
  const dataMax = readNum("data-max");
  const attrMin = readNum("min");
  const attrMax = readNum("max");
  const min = (dataMin ?? attrMin ?? fallbackMin);
  const max = (dataMax ?? attrMax ?? fallbackMax);
  return { min, max };
}

export function enhanceYearInput(input, opts = {}) {
  if (!input || input.__yearInputEnhanced) return;
  input.__yearInputEnhanced = true;
  const { min, max } = { ...getBounds(input), ...opts };
  const errorEl = getOrCreateErrorEl(input);

  const apply = () => {
    const digits = (input.value || "").replace(/\D+/g, "");
    if (digits !== input.value) input.value = digits;
    const result = validateYear(digits, min, max);
    if (result.valid) {
      errorEl.textContent = "";
      errorEl.hidden = true;
      input.setAttribute("aria-invalid", "false");
      setDescribedBy(input, errorEl.id, false);
    } else {
      errorEl.textContent = result.error || "Enter a valid year";
      errorEl.hidden = false;
      input.setAttribute("aria-invalid", "true");
      setDescribedBy(input, errorEl.id, true);
    }
  };

  input.addEventListener("input", apply);
  input.addEventListener("blur", apply);
  input.addEventListener("change", apply);
  apply();
}

export function initYearInputs(root = document) {
  const scope = root instanceof Document ? root : root.ownerDocument || document;
  const candidates = Array.from(
    scope.querySelectorAll(
      [
        "input[data-year-input]",
        "input[data-demo=\"year-input\"]",
        "input.js-year-input",
        "input[type=\"number\"]",
        "input[type=\"text\"]",
        "input:not([type])"
      ].join(", ")
    )
  );

  const filtered = candidates.filter((el) => {
    if (!(el instanceof HTMLInputElement)) return false;
    const t = (s) => (s ? String(s).toLowerCase() : "");
    const name = t(el.getAttribute("name"));
    const id = t(el.getAttribute("id"));
    const aria = t(el.getAttribute("aria-label"));
    const ph = t(el.getAttribute("placeholder"));
    if (el.matches("[data-year-input], [data-demo=\"year-input\"], .js-year-input")) return true;
    return (
      name.includes("year") || id.includes("year") || aria.includes("year") || ph.includes("year")
    );
  });

  filtered.forEach((input) => enhanceYearInput(input));
  return filtered;
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initYearInputs(document));
  } else {
    initYearInputs(document);
  }
  window.YearInputDemo = { init: initYearInputs, enhance: enhanceYearInput, validateYear };
}

export default { init: initYearInputs, enhance: enhanceYearInput, validateYear };
