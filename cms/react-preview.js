/**
 * Live preview for React (data mode) sites. Copy into the site as cms/react-preview.js.
 *
 * The site loads this only when it is opened inside the CMS with ?cms-preview, so normal
 * visitors never download it. The CMS posts the unsaved content; the site's own `apply`
 * swaps it in and re-renders; this file then finds which element shows which field so a
 * click on the page jumps to that field in the CMS, and a field focused in the CMS lights
 * up on the page.
 *
 *   startPreview({ origins: ['https://admin.supasonicai.com'], apply(msg) { ... } })
 *
 * Messages are accepted only from the listed CMS addresses, never from any other page.
 */
const STYLE = `
[data-cms-key]{cursor:pointer;outline:2px dashed transparent;outline-offset:4px;transition:outline-color .15s}
[data-cms-key]:hover{outline-color:rgba(237,78,156,.8)}
.cms-hl{outline:2px solid #ED4E9C !important;outline-offset:4px;box-shadow:0 0 0 6px rgba(237,78,156,.18)}
`;

const norm = s => String(s || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const srcPath = s => { try { return new URL(s, location.href).pathname; } catch { return s; } };

/** Every text / image value in the content, with the CMS field key that holds it. */
function collect(obj, prefix, texts, images) {
  for (const [k, v] of Object.entries(obj || {})) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'string') addText(key, v, texts);
    else if (Array.isArray(v)) v.forEach((item, i) => { if (item && typeof item === 'object') collect(item, `${key}[${i}]`, texts, images); else if (typeof item === 'string') addText(`${key}[${i}]`, item, texts); });
    else if (v && typeof v === 'object') {
      if ('src' in v) { if (v.src) images.set(srcPath(v.src), key); if (v.cmsSrc) images.set(srcPath(v.cmsSrc), key); if (v.alt) addText(key, v.alt, texts); }
      else if ('label' in v && 'href' in v) addText(key, v.label, texts);
      else collect(v, key, texts, images);
    }
  }
}
function addText(key, value, texts) {
  const t = norm(value);
  if (t.length < 2 || /^(https?:|mailto:|\/)/.test(t)) return;
  if (!texts.has(t)) texts.set(t, key);
  // long text is often shown as several paragraphs: match each one too
  if (t.length > 60) for (const para of String(value).split(/\n\s*\n|<\/p>/i)) { const p = norm(para); if (p.length > 20 && !texts.has(p)) texts.set(p, key); }
}

function annotate(fields) {
  for (const el of document.querySelectorAll('[data-cms-key]')) el.removeAttribute('data-cms-key');
  const texts = new Map(), images = new Map();
  collect(fields, '', texts, images);
  const hits = [];
  for (const el of document.body.querySelectorAll('*')) {
    if (el.closest('script,style,noscript,svg,head')) continue;
    if (el.tagName === 'IMG') { const k = images.get(srcPath(el.getAttribute('src'))); if (k) hits.push([el, k]); continue; }
    const t = norm(el.textContent);
    if (t.length < 2 || t.length > 8000) continue;
    const k = texts.get(t);
    if (k) hits.push([el, k]);
  }
  for (const [el, k] of hits) el.setAttribute('data-cms-key', k);
  // keep the innermost element only, so the outline hugs the words
  for (const [el, k] of hits) if (el.querySelector(`[data-cms-key="${CSS.escape(k)}"]`)) el.removeAttribute('data-cms-key');
}

function highlight(key) {
  for (const el of document.querySelectorAll('.cms-hl')) el.classList.remove('cms-hl');
  if (!key) return;
  const els = Array.from(document.querySelectorAll('[data-cms-key]')).filter(el => { const k = el.getAttribute('data-cms-key'); return k === key || k.startsWith(key + '[') || k.startsWith(key + '.'); });
  els.forEach(el => el.classList.add('cms-hl'));
  if (els[0]) els[0].scrollIntoView({ block: 'center', behavior: 'smooth' });
}

/** New uploads aren't on the live site until the next publish, so the CMS sends the files themselves. */
const blobUrls = new Map();
function useLocalImages(m) {
  const files = m.images || {};
  if (!Object.keys(files).length) return;
  const urlFor = src => { if (!blobUrls.has(src) && files[src] instanceof Blob) blobUrls.set(src, URL.createObjectURL(files[src])); return blobUrls.get(src); };
  const seen = new Set();
  const walk = v => {
    if (!v || typeof v !== 'object' || seen.has(v)) return; seen.add(v);
    if (Array.isArray(v)) { v.forEach(walk); return; }
    if (typeof v.src === 'string' && files[v.src]) { const u = urlFor(v.src); if (u) { v.cmsSrc = v.src; v.src = u; } }
    for (const k of Object.keys(v)) if (k !== 'images') walk(v[k]);
  };
  for (const k of ['slots', 'site', 'item', 'fields']) walk(m[k]);
}

export function startPreview({ origins, apply }) {
  const allowed = new Set(origins);
  let parentOrigin = null, lastFields = null, lastKey = null;
  const send = msg => { if (parentOrigin) window.parent.postMessage({ source: 'cms-preview', ...msg }, parentOrigin); };
  const style = document.createElement('style'); style.textContent = STYLE; document.head.append(style);

  const refresh = () => requestAnimationFrame(() => requestAnimationFrame(() => { if (lastFields) annotate(lastFields); if (lastKey) highlight(lastKey); }));
  // the page can change under us (accordions, reveal animations, route changes): re-tag after it settles
  let t = null;
  new MutationObserver(() => { clearTimeout(t); t = setTimeout(() => { if (lastFields) annotate(lastFields); }, 250); }).observe(document.body, { childList: true, subtree: true, characterData: true });

  window.addEventListener('message', e => {
    const m = e.data;
    if (!allowed.has(e.origin) || e.source !== window.parent || !m || m.source !== 'cms-admin') return;
    parentOrigin = e.origin;
    if (m.type === 'hello') send({ type: 'ready' });
    if (m.type === 'data') { useLocalImages(m); try { apply(m); } catch (err) { console.error('cms preview', err); } lastFields = m.fields || null; refresh(); }
    if (m.type === 'highlight') { lastKey = m.key; highlight(m.key); }
  });

  document.addEventListener('click', e => {
    const hit = e.target.closest('[data-cms-key]');
    if (hit) { e.preventDefault(); e.stopPropagation(); send({ type: 'select', key: hit.getAttribute('data-cms-key') }); return; }
    // links and menu buttons are switched off so the preview stays on the page being edited
    if (e.target.closest('a[href], nav button, footer button')) { e.preventDefault(); e.stopPropagation(); }
  }, true);
  document.addEventListener('keydown', e => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') { e.preventDefault(); send({ type: 'save' }); } });

  // We can't post to the CMS until we know its address, so announce to each allowed one.
  for (const o of allowed) { try { window.parent.postMessage({ source: 'cms-preview', type: 'ready' }, o); } catch {} }
}
