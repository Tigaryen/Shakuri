// Before the build: gather everything the client publishes in the CMS into data/cms.generated.json
//   webpages  content/webpages/*.json      → /:slug
//   work      content/case-studies/*.json  → /work and /work/:slug
//   journal   content/journal/*.json       → /journal and /journal/:slug
// After the build (--sitemap): add those URLs to dist/sitemap.xml.
// Drafts are left out, so nothing unpublished ever reaches the site.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'data', 'cms.generated.json');
const SITE = 'https://www.shakuristudios.com';

async function load(dir) {
  const full = path.join(ROOT, 'content', dir);
  const files = existsSync(full) ? (await readdir(full)).filter((f) => f.endsWith('.json')) : [];
  const out = [];
  for (const f of files) {
    const p = JSON.parse(await readFile(path.join(full, f), 'utf8'));
    if (p.status === 'published') out.push(p);
  }
  return out;
}
const byDate = (dir) => (a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0) * dir;
const meta = (p, fallbackDesc) => ({
  title: (p.seo && p.seo.title) || `${p.fields.title} | Shakuri Studios`,
  description: (p.seo && p.seo.description) || fallbackDesc || '',
});

const webpages = (await load('webpages')).sort(byDate(1)).map((p) => ({
  slug: p.slug, layout: p.layout || 'standard', date: p.date || '', ...meta(p, p.fields.intro),
  menuLabel: p.fields.menuLabel || p.fields.title, inMenu: !!p.fields.inMenu, fields: p.fields,
}));
const work = (await load('case-studies')).sort(byDate(-1)).map((p) => ({
  slug: p.slug, date: p.date || '', ...meta(p, p.fields.lede), fields: p.fields,
}));
const journal = (await load('journal')).sort(byDate(-1)).map((p) => ({
  slug: p.slug, date: p.date || '', ...meta(p, p.fields.excerpt), fields: p.fields,
}));

if (process.argv.includes('--sitemap')) {
  const file = path.join(ROOT, 'dist', 'sitemap.xml');
  const urls = [
    ...webpages.map((p) => `/${p.slug}`),
    ...(work.length ? ['/work', ...work.map((p) => `/work/${p.slug}`)] : []),
    ...(journal.length ? ['/journal', ...journal.map((p) => `/journal/${p.slug}`)] : []),
  ];
  if (existsSync(file) && urls.length) {
    const xml = await readFile(file, 'utf8');
    const add = urls.map((u) => `  <url><loc>${SITE}${u}</loc></url>`).join('\n');
    await writeFile(file, xml.replace('</urlset>', `${add}\n</urlset>`));
  }
  console.log(`cms-pages: ${urls.length} URL(s) added to sitemap`);
} else {
  await writeFile(OUT, JSON.stringify({ webpages, work, journal }, null, 2) + '\n');
  console.log(`cms-pages: ${webpages.length} page(s), ${work.length} case stud${work.length === 1 ? 'y' : 'ies'}, ${journal.length} journal post(s)`);
}
