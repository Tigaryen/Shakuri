// Pages the client creates in the CMS (content/webpages/*.json).
// scripts/cms-pages.mjs gathers the published ones into cmsPages.generated.json before every build,
// so the app, the per-page <head> shells and the pre-render all read the same list.
import pages from './cmsPages.generated.json';

export interface CmsPage {
  slug: string;
  layout: 'standard' | 'points';
  title: string;
  description: string;
  menuLabel: string;
  inMenu: boolean;
  fields: Record<string, any>;
}

export const cmsPages = pages as CmsPage[];
export const menuPages = cmsPages.filter((p) => p.inMenu);
export const findCmsPage = (slug: string) => cmsPages.find((p) => p.slug === slug);
