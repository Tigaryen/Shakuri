// Single source of truth for the services shown in the homepage bento mosaic
// and the /services detail cards. Array order is the /services card order.
//
// `span` / `aspect` drive the bento layout. The source images are either
// near-square (~1.2:1) or 2:3 portrait — none are wide — so no tile spans two
// columns on a single row, which would crop them in half.

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
  /** Bento tile shape: aspect ratio on mobile, grid spans from md up */
  aspect: string;
  span: string;
  /** Detail card fields */
  eyebrow: string;
  title: string;
  duration?: string;
  description: string;
}

export const services: Service[] = [
  {
    id: 'custom-worlds',
    label: 'Custom Worlds',
    tagline: 'Your always-on owned world, built from scratch',
    image: '/services/custom-worlds.webp',
    alt: 'A custom-built branded Roblox world',
    width: 1400,
    height: 1132,
    aspect: 'aspect-[5/4]',
    span: 'md:col-span-2 md:row-span-2',
    eyebrow: 'Owned world',
    title: 'Custom Experiences',
    duration: '8–12+ weeks',
    description:
      'A living, breathing world your audience never wants to leave. Built from scratch, user-first, engineered for recurring impact and long-term value rather than a one-off spike. This is your always-on home on the platform, not a pop-up.',
  },
  {
    id: 'brand-integrations',
    label: 'Integrations',
    tagline: 'Drop into games that already have the audience',
    image: '/services/brand-integrations.webp',
    alt: 'A brand integrated into an existing Roblox experience',
    width: 1400,
    height: 1137,
    aspect: 'aspect-[5/4]',
    span: '',
    eyebrow: 'Built-in audience',
    title: 'Brand Integrations',
    duration: '4–8+ weeks',
    description:
      'Integrate seamlessly into experiences that already have the audience. We connect you to the right in-game events, activations and placements, so you reach millions without building from scratch.',
  },
  {
    id: 'live-events',
    label: 'Live Events',
    tagline: 'Turn your biggest day into a playable world',
    image: '/services/live-events.webp',
    alt: 'A live event recreated as a playable Roblox experience',
    width: 1400,
    height: 1122,
    aspect: 'aspect-[5/4]',
    span: '',
    eyebrow: 'One event, infinite re-runs',
    title: 'Live Event Experiences',
    duration: '8–12 weeks',
    description:
      "We turn a live event, match, concert or premiere into a persistent Roblox world. Fans who couldn't get a ticket watch together inside the game, and every real-world moment triggers drops, reactions and rewards.",
  },
  {
    id: 'phygital-store',
    label: 'Phygital Store',
    tagline: 'A virtual store that drives real-world purchase',
    image: '/services/phygital-store.webp',
    alt: 'A virtual branded store connecting digital and physical retail',
    width: 933,
    height: 1400,
    aspect: 'aspect-[2/3]',
    span: 'md:row-span-2',
    eyebrow: 'Digital meets physical',
    title: 'Phygital Store',
    duration: '4+ weeks',
    description:
      'A fully integrated virtual store connecting your digital and physical worlds. Fans browse exclusive drops, earn loyalty points on every purchase and redeem rewards from their couch or inside your venue.',
  },
  {
    id: 'promotion',
    label: 'Promotion',
    tagline: 'Immersive ads and creator campaigns that land',
    image: '/services/promotion.webp',
    alt: 'In-world immersive advertising and creator campaigns',
    width: 933,
    height: 1400,
    aspect: 'aspect-[2/3]',
    span: 'md:row-span-2',
    eyebrow: 'Cut through the noise',
    title: 'Promotion',
    description:
      'Tailored campaigns, ad buying and influencer partnerships. From native 3D immersive ads and in-world billboards to creator-led campaigns with the Roblox stars your audience already follows. We plan, buy, optimise and report on the whole funnel.',
  },
  {
    id: 'ugc-collections',
    label: 'UGC Collections',
    tagline: 'Branded avatar items fans want to own',
    image: '/services/ugc-collections.webp',
    alt: 'Branded avatar items and accessories',
    width: 1350,
    height: 1165,
    aspect: 'aspect-[5/4]',
    span: '',
    eyebrow: 'Virtual fits, real hype',
    title: 'UGC Collections',
    description:
      'Kits, accessories, emotes and avatar upgrades give your brand an ecosystem of collectibles fans genuinely want to own and show off across Roblox. Every drop is a data goldmine on what fans actually want, before a single physical unit is made.',
  },
];

/**
 * Bento placement order — differs from the card order so the tall portrait
 * tiles interlock with the short near-square ones and the grid packs cleanly.
 */
export const mosaicOrder = [
  'custom-worlds',
  'phygital-store',
  'live-events',
  'promotion',
  'brand-integrations',
  'ugc-collections',
];
