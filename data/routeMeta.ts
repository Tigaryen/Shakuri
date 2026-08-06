// Per-route <head> content. Consumed twice:
//   1. scripts/build-heads.mjs, which writes a static HTML shell per route
//      so crawlers that do not execute JS get the right tags.
//   2. App.tsx, which updates the tags on client-side navigation.
// Keeping both off one source means the static and runtime tags cannot drift.

export const SITE_URL = 'https://www.shakuristudios.com';
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

export interface RouteMeta {
  path: string;
  /** Output filename in dist/. The homepage keeps index.html. */
  file: string;
  title: string;
  description: string;
  /** Set for routes that ship extra structured data in their shell. */
  schema?: 'faq';
}

export const routeMeta: RouteMeta[] = [
  {
    path: '/',
    file: 'index.html',
    title: 'Roblox Brand Activation Agency | Shakuri Studios',
    description:
      'Roblox-native end-to-end brand activation agency. We design, build and measure Roblox experiences that turn global audiences into commercial growth and real-world outcomes.',
  },
  {
    path: '/services',
    file: 'services.html',
    title: 'Roblox Brand Activation Services | Shakuri Studios',
    description:
      'Custom worlds, brand integrations, live events, phygital stores, UGC and promotion. Ideation to delivery, under one roof.',
  },
  {
    path: '/results',
    file: 'results.html',
    title: 'Measuring Roblox Campaigns | Shakuri Studios',
    description:
      'How brand campaigns on Roblox are measured and how in-game action converts to real-world outcomes.',
  },
  {
    path: '/calculator',
    file: 'calculator.html',
    title: 'Roblox Value Calculator | Shakuri Studios',
    description:
      'Model the earned media value and attention value of a Roblox audience against the channels you already buy.',
  },
  {
    path: '/faqs',
    file: 'faqs.html',
    title: 'Roblox for Brands: FAQs | Shakuri Studios',
    description:
      'Straight answers on Roblox audience, safety, measurement and cost for brand teams considering the platform.',
    schema: 'faq',
  },
];

export const metaForPath = (pathname: string) =>
  routeMeta.find((r) => r.path === pathname) ?? routeMeta[0];
