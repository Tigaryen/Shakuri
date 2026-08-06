// Snapshots each route with headless Chrome and writes the rendered markup
// into the <div id="root"> of the shell that build-heads.mjs already produced.
// The <head> is untouched, so per-route meta and the FAQPage schema survive.
//
// Fail-soft by design: if a browser cannot be launched — no bundled Chromium,
// missing system libraries, a locked-down CI image — this logs and exits 0,
// leaving the meta-only shells in place rather than breaking the deploy.
// Set PRERENDER=0 to skip it deliberately.

import { build } from 'esbuild';
import { createServer } from 'node:http';
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const CACHE = path.join(ROOT, 'node_modules', '.cache', 'prerender');
const PORT = 41731;

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

async function loadRoutes() {
  await mkdir(CACHE, { recursive: true });
  await build({
    entryPoints: [path.join(ROOT, 'data', 'routeMeta.ts')],
    outdir: CACHE,
    format: 'esm',
    outExtension: { '.js': '.mjs' },
    logLevel: 'silent',
  });
  const mod = await import(pathToFileURL(path.join(CACHE, 'routeMeta.mjs')).href);
  return mod.routeMeta;
}

// Serves dist/ with the same path -> file mapping vercel.json applies, so the
// snapshot sees exactly what production serves.
function serve(routes) {
  const byPath = new Map(routes.map((r) => [r.path, r.file]));

  const server = createServer(async (req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    let file = byPath.get(url.pathname);

    if (!file) {
      const candidate = path.join(DIST, url.pathname);
      file = existsSync(candidate) && (await stat(candidate)).isFile()
        ? path.relative(DIST, candidate)
        : 'index.html';
    }

    try {
      const body = await readFile(path.join(DIST, file));
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404).end('not found');
    }
  });

  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

async function resolveBrowser(puppeteer) {
  const fromEnv = process.env.PUPPETEER_EXECUTABLE_PATH;
  if (fromEnv && existsSync(fromEnv)) return fromEnv;

  try {
    const bundled = await puppeteer.executablePath();
    if (bundled && existsSync(bundled)) return bundled;
  } catch {
    // no bundled browser — fall through to the system ones
  }

  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
  ];
  return candidates.find((p) => existsSync(p));
}

async function main() {
  if (process.env.PRERENDER === '0') {
    console.log('prerender: skipped (PRERENDER=0)');
    return;
  }

  const puppeteer = (await import('puppeteer')).default;
  const executablePath = await resolveBrowser(puppeteer);

  if (!executablePath) {
    console.warn('prerender: no Chrome found, keeping meta-only shells');
    return;
  }

  const routes = await loadRoutes();
  let server;
  let browser;

  try {
    server = await serve(routes);
    browser = await puppeteer.launch({
      executablePath,
      args: ['--no-sandbox', '--disable-dev-shm-usage'],
    });

    for (const route of routes) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 900 });
      await page.goto(`http://localhost:${PORT}${route.path}`, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });

      // Wait for React to mount, then let the reveal observer mark whatever is
      // in view, so the snapshot is not a page of opacity-0 sections.
      await page.waitForFunction(() => document.getElementById('root')?.childElementCount > 0, {
        timeout: 15000,
      });
      await new Promise((r) => setTimeout(r, 400));

      const markup = await page.evaluate(() => document.getElementById('root').innerHTML);
      await page.close();

      const shellPath = path.join(DIST, route.file);
      const shell = await readFile(shellPath, 'utf8');
      const marker = '<div id="root"></div>';

      if (!shell.includes(marker)) {
        throw new Error(`prerender: ${route.file} has no empty #root to fill`);
      }

      const before = Buffer.byteLength(shell);
      const filled = shell.replace(marker, `<div id="root">${markup}</div>`);
      await writeFile(shellPath, filled);

      const after = Buffer.byteLength(filled);
      const kb = (n) => (n / 1024).toFixed(1);
      console.log(
        `  ${route.path.padEnd(12)} ${kb(before)} kB -> ${kb(after)} kB  (+${kb(after - before)} kB)`
      );
    }
  } finally {
    if (browser) await browser.close();
    if (server) server.close();
  }

  console.log(`prerender: snapshotted ${routes.length} routes`);
}

main().catch((err) => {
  // Never fail the build over prerendering; the shells are still valid.
  console.warn('prerender: skipped —', err.message.split('\n')[0]);
});
