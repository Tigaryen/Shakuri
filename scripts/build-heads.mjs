// Writes a static HTML shell per route into dist/, each with its own title,
// description, canonical, OG and Twitter tags, plus FAQPage structured data on
// /faqs. Runs after `vite build`; vercel.json rewrites each route to its file.
//
// Crawlers that do not execute JS (LinkedIn, Slack, WhatsApp, and most AI
// crawlers) only ever see these tags, so they have to be in the HTML itself.

import { build } from 'esbuild';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const CACHE = path.join(ROOT, 'node_modules', '.cache', 'prerender');

// The data lives in .ts so the app can import it; transpile to load it here.
async function loadData() {
  await mkdir(CACHE, { recursive: true });
  await build({
    entryPoints: [path.join(ROOT, 'data', 'routeMeta.ts'), path.join(ROOT, 'data', 'faqs.ts')],
    outdir: CACHE,
    format: 'esm',
    outExtension: { '.js': '.mjs' },
    logLevel: 'silent',
  });
  const meta = await import(pathToFileURL(path.join(CACHE, 'routeMeta.mjs')).href);
  const faqs = await import(pathToFileURL(path.join(CACHE, 'faqs.mjs')).href);
  return { ...meta, faqSections: faqs.faqSections };
}

const escapeAttr = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// JSON-LD sits inside a <script>, so a literal </script> in the data would end
// the block early. Escaping the slash keeps the JSON valid and the tag intact.
const safeJson = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

function faqSchema(faqSections) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqSections.flatMap((section) =>
      section.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.source ? `${faq.a} (Source: ${faq.source})` : faq.a,
        },
      }))
    ),
  };
}

// Replaces the content of a tag matched by `pattern`, failing loudly if the tag
// is missing — a silent no-op here would ship the homepage's tags on every page.
function replaceOrThrow(html, pattern, replacement, label, file) {
  if (!pattern.test(html)) {
    throw new Error(`build-heads: could not find ${label} in ${file}`);
  }
  return html.replace(pattern, replacement);
}

function applyMeta(html, route, { SITE_URL, OG_IMAGE }) {
  const url = `${SITE_URL}${route.path}`;
  const title = escapeAttr(route.title);
  const description = escapeAttr(route.description);

  const edits = [
    [/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`, 'title'],
    [
      /<meta name="description" content="[^"]*">/,
      `<meta name="description" content="${description}">`,
      'meta description',
    ],
    [
      /<link rel="canonical" href="[^"]*">/,
      `<link rel="canonical" href="${url}">`,
      'canonical',
    ],
    [/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`, 'og:url'],
    [
      /<meta property="og:title" content="[^"]*">/,
      `<meta property="og:title" content="${title}">`,
      'og:title',
    ],
    [
      /<meta property="og:description" content="[^"]*">/,
      `<meta property="og:description" content="${description}">`,
      'og:description',
    ],
    [
      /<meta property="og:image" content="[^"]*">/,
      `<meta property="og:image" content="${OG_IMAGE}">`,
      'og:image',
    ],
    [
      /<meta name="twitter:title" content="[^"]*">/,
      `<meta name="twitter:title" content="${title}">`,
      'twitter:title',
    ],
    [
      /<meta name="twitter:description" content="[^"]*">/,
      `<meta name="twitter:description" content="${description}">`,
      'twitter:description',
    ],
  ];

  return edits.reduce(
    (acc, [pattern, replacement, label]) =>
      replaceOrThrow(acc, pattern, replacement, label, route.file),
    html
  );
}

async function main() {
  const { routeMeta, SITE_URL, OG_IMAGE, faqSections } = await loadData();
  const template = await readFile(path.join(DIST, 'index.html'), 'utf8');

  for (const route of routeMeta) {
    let html = applyMeta(template, route, { SITE_URL, OG_IMAGE });

    if (route.schema === 'faq') {
      const json = safeJson(faqSchema(faqSections));
      html = html.replace(
        '</head>',
        `<script type="application/ld+json">${json}</script>\n</head>`
      );
    }

    await writeFile(path.join(DIST, route.file), html);
    const extra = route.schema === 'faq' ? ` + ${faqSchema(faqSections).mainEntity.length}-question FAQPage` : '';
    console.log(`  ${route.path.padEnd(12)} -> dist/${route.file}${extra}`);
  }

  console.log(`build-heads: wrote ${routeMeta.length} head shells`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
