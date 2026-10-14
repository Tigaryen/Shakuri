// FAQ content. Single source for the rendered accordion and the FAQPage
// JSON-LD, so the structured data can never drift from the visible copy.

export interface Faq {
  q: string;
  a: string;
  source?: string;
}

export interface FaqSection {
  title: string;
  faqs: Faq[];
}

import content from '../content/pages/faqs.json';

// Edited in the CMS (content/pages/faqs.json).
const build = (): FaqSection[] => content.slots.sections.map((sec) => ({
  title: sec.title,
  faqs: sec.faqs.map((f) => ({ q: f.q, a: f.a, source: f.source || undefined })),
}));
export let faqSections: FaqSection[] = build();
/** Live preview: re-read the content after the CMS swaps in unsaved edits. */
export const refreshFaqs = () => { faqSections = build(); };
