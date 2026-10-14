// Before the build: gather published CMS pages into data/cmsPages.generated.json.
// After the build (--sitemap): add them to dist/sitemap.xml.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIR = path.join(ROOT, 'content', 'webpages');
const OUT = path.join(ROOT, 'data', 'cmsPages.generated.json');
const SITE = 'https://www.shakuristudios.com';

const files = existsSync(DIR) ? (await readdir(DIR)).filter((f) => f.endsWith('.json')) : [];
const pages = [];
for (const f of files) {
  const p = JSON.parse(await readFile(path.join(DIR, f), 'utf8'));
  if (p.status !== 'published') continue;
  const fl = p.fields || {};
  pages.push({
    slug: p.slug, layout: p.layout || 'standard', date: p.date || '',
    title: (p.seo && p.seo.title) || `${fl.title} | Shakuri Studios`,
    description: (p.seo && p.seo.description) || fl.intro || '',
    menuLabel: fl.menuLabel || fl.title, inMenu: !!fl.inMenu, fields: fl,
  });
}
pages.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));

if (process.argv.includes('--sitemap')) {
  const file = path.join(ROOT, 'dist', 'sitemap.xml');
  if (existsSync(file) && pages.length) {
    const xml = await readFile(file, 'utf8');
    const add = pages.map((p) => `  <url><loc>${SITE}/${p.slug}</loc></url>`).join('\n');
    await writeFile(file, xml.replace('</urlset>', `${add}\n</urlset>`));
  }
  console.log(`cms-pages: ${pages.length} page(s) added to sitemap`);
} else {
  await writeFile(OUT, JSON.stringify(pages, null, 2) + '\n');
  console.log(`cms-pages: ${pages.length} published page(s)`);
}
