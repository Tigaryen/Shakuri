// Single source of truth for the services shown in the homepage bento mosaic
// and the /services detail cards. Array order drives both surfaces.
//
// The mosaic renders every tile as an identical 4:3 cell, so tile shape lives
// in the component rather than here. Array order is the on-page order.

export interface Service {
  id: string;
  /** Bento tile headline */
  label: string;
  /** One line of muted copy under the tile headline */
  tagline: string;
  image: string;
  alt: string;
  /** Intrinsic dimensions, set on the <img> to reserve space and avoid CLS */
  width: number;
  height: number;
  /** Detail card fields */
  eyebrow: string;
  title: string;
  duration?: string;
  description: string;
}

import content from '../content/pages/services.json';
import sizes from './imageSizes.json';

// Edited in the CMS (content/pages/services.json). Image sizes reserve space while images load;
// newly uploaded images fall back to the 4:3 tile ratio.
const build = (): Service[] => content.slots.services.map((s) => {
  const [width, height] = (sizes as Record<string, number[]>)[s.image.src] || [1400, 1050];
  return { id: s.id, label: s.label, tagline: s.tagline, image: s.image.src, alt: s.image.alt, width, height,
    eyebrow: s.eyebrow, title: s.title, duration: s.duration || undefined, description: s.description };
});
export let services: Service[] = build();
/** Live preview: re-read the content after the CMS swaps in unsaved edits. */
export const refreshServices = () => { services = build(); };
