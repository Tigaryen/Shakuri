// Live preview inside the CMS (admin.supasonicai.com). Switched off for normal visitors: it only
// starts when the site is opened in the CMS's preview frame with ?cms-preview, and the preview
// code itself is a separate file that visitors never download.
import home from '../content/pages/home.json';
import servicesPage from '../content/pages/services.json';
import faqsPage from '../content/pages/faqs.json';
import workPage from '../content/pages/work.json';
import journalPage from '../content/pages/journal.json';
import site from '../content/site.json';
import { refreshServices } from './services';
import { refreshFaqs } from './faqs';
import { setDraft } from './cmsPages';

const CMS_ORIGINS = ['https://admin.supasonicai.com'];

export const isCmsPreview =
  typeof window !== 'undefined' && window.parent !== window && new URLSearchParams(window.location.search).has('cms-preview');

let version = 0;
const listeners = new Set<() => void>();
export const subscribePreview = (fn: () => void) => { listeners.add(fn); return () => { listeners.delete(fn); }; };
export const previewVersion = () => version;

const pages: Record<string, { slots: Record<string, any> }> = { home, services: servicesPage, faqs: faqsPage, work: workPage, journal: journalPage };
const replace = (target: Record<string, any>, next: Record<string, any>) => {
  for (const k of Object.keys(target)) if (!(k in next)) delete target[k];
  Object.assign(target, next);
};

interface PreviewMessage { page?: string; slots?: Record<string, any>; site?: Record<string, any>; collection?: string; slug?: string; item?: any }

function apply(m: PreviewMessage) {
  if (m.page && pages[m.page] && m.slots) replace(pages[m.page].slots, m.slots);
  if (m.site) replace(site.slots, m.site);
  if (m.collection && m.item) setDraft(m.collection, m.slug || m.item.slug, m.item);
  refreshServices();
  refreshFaqs();
  version++;
  listeners.forEach((fn) => fn());
}

if (isCmsPreview) {
  const origins = window.location.hostname === 'localhost' ? [...CMS_ORIGINS, 'http://localhost:3312'] : CMS_ORIGINS;
  import('../cms/react-preview.js').then(({ startPreview }) => startPreview({ origins, apply }));
}
