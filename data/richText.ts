// Rich text from the CMS (case studies, journal posts). The CMS already cleans it on save; this is a
// second, independent allowlist so only plain formatting tags can ever reach the page: no scripts,
// no styles, no event handlers, and links only to web, mail or on-site addresses.
const ALLOWED = new Set(['p', 'br', 'h2', 'h3', 'h4', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li', 'blockquote', 'a', 'hr']);
const SAFE_HREF = /^(https?:\/\/|mailto:|\/(?!\/)|#)/i;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export function cleanRich(html = ''): string {
  // drop whole blocks whose content must never show
  let s = String(html).replace(/<(script|style|iframe|object|embed|template|svg|math)\b[\s\S]*?<\/\1\s*>/gi, '');
  s = s.replace(/<!--[\s\S]*?-->/g, '');
  return s.replace(/<\/?([a-zA-Z0-9]+)\b([^>]*)>/g, (tag, name: string, attrs: string) => {
    const n = name.toLowerCase();
    if (!ALLOWED.has(n)) return '';
    if (tag.startsWith('</')) return `</${n}>`;
    if (n !== 'a') return `<${n}>`;
    const m = attrs.match(/\bhref\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/i);
    const href = m ? (m[2] ?? m[3] ?? m[4] ?? '').replace(/&amp;/g, '&').trim() : '';
    if (!SAFE_HREF.test(href)) return '<a>';
    const external = /^https?:/i.test(href);
    return `<a href="${esc(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>`;
  }).replace(/<(?![a-zA-Z/])/g, '&lt;');
}
