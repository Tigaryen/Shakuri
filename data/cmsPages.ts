// Everything the client publishes in the CMS: their own pages, case studies and journal posts.
// scripts/cms-pages.mjs gathers the published ones into cms.generated.json before every build,
// so the app, the per-page <head> shells and the pre-render all read the same lists.
// Inside the CMS's live preview, setDraft() swaps in the entry being edited before it is saved.
import data from './cms.generated.json';

export interface CmsPage {
  slug: string;
  layout: 'standard' | 'points';
  title: string;
  description: string;
  menuLabel: string;
  inMenu: boolean;
  fields: Record<string, any>;
}
export interface CmsEntry {
  slug: string;
  date: string;
  title: string;
  description: string;
  fields: Record<string, any>;
}

const published = data as { webpages: CmsPage[]; work: CmsEntry[]; journal: CmsEntry[] };

export let cmsPages: CmsPage[] = published.webpages;
export let menuPages: CmsPage[] = cmsPages.filter((p) => p.inMenu);
export let caseStudies: CmsEntry[] = published.work;
export let journalPosts: CmsEntry[] = published.journal;

export const findCmsPage = (slug: string) => cmsPages.find((p) => p.slug === slug);
export const findCaseStudy = (slug: string) => caseStudies.find((p) => p.slug === slug);
export const findPost = (slug: string) => journalPosts.find((p) => p.slug === slug);

const COLLECTIONS: Record<string, 'webpages' | 'work' | 'journal'> = { webpages: 'webpages', 'case-studies': 'work', journal: 'journal' };

/** Preview only: show the CMS's unsaved copy of one entry (added, or replacing the published one). */
export function setDraft(collection: string, slug: string, item: { slug?: string; layout?: string; date?: string; status?: string; fields: Record<string, any> }) {
  const list = COLLECTIONS[collection];
  if (!list || !item || !item.fields) return;
  const f = item.fields;
  const base = { slug, date: item.date || '', title: f.title || '', description: '', fields: f };
  if (list === 'webpages') {
    const page: CmsPage = { ...base, layout: (item.layout as CmsPage['layout']) || 'standard', menuLabel: f.menuLabel || f.title || '', inMenu: !!f.inMenu };
    cmsPages = [...published.webpages.filter((p) => p.slug !== slug), page];
    menuPages = cmsPages.filter((p) => p.inMenu);
  } else if (list === 'work') {
    caseStudies = [base, ...published.work.filter((p) => p.slug !== slug)];
  } else {
    journalPosts = [base, ...published.journal.filter((p) => p.slug !== slug)];
  }
}
