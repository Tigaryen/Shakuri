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

export const faqSections: FaqSection[] = [
  {
    title: 'The audience',
    faqs: [
      {
        q: 'Isn’t Roblox just for young children?',
        a: 'No, and this is the most common misconception. 65% of age-checked users are 13 or older, and the fastest-growing segment is US 18-to-34 year olds, up around 40% year on year. The platform has aged up with its original users.',
        source: 'Roblox Q1 2026 Shareholder Letter',
      },
      {
        q: 'How big is the audience?',
        a: '132 million daily active users spending an average of 2.4 hours a day on the platform. For context, that’s more daily time than most social platforms command.',
        source: 'Roblox Q1 2026 Shareholder Letter',
      },
      {
        q: 'Roblox user numbers have declined recently. Should that worry us?',
        a: 'It’s worth understanding rather than ignoring. Daily active users fell sequentially in 2026 and Roblox cut its full-year bookings guidance, with the CFO naming safety friction as the direct cause. Mandatory age verification added a step that some users didn’t complete. We’d argue that’s a company choosing long-term platform integrity over a quarter, which is exactly what a brand should want from a platform it’s investing in. The engagement depth per user hasn’t changed, and that’s what drives brand outcomes.',
      },
      {
        q: 'Why does attention on Roblox matter more than reach elsewhere?',
        a: 'Sessions run to minutes, not the seconds of a scroll. An independent eye-tracking study for Roblox found attention to branded content was 100 times higher than social ads and 35 times higher than streaming TV ads.',
        source: 'MediaScience eye-tracking study for Roblox, 2025, n=140 US users aged 13-34',
      },
    ],
  },
  {
    title: 'Safety and brand suitability',
    faqs: [
      {
        q: 'Is Roblox safe for our brand to be on?',
        a: 'Roblox rebuilt its safety architecture through 2026 and is now the only major platform that publicly acknowledges children use it, rather than hiding behind an unenforced age gate. Mandatory age verification, age-based account tiers, and continuously monitored chat are all live.',
      },
      {
        q: 'What age controls are actually in place?',
        a: 'Two new account tiers went live globally on 16 June 2026. Roblox Kids (5-8) has chat off by default and access limited to Minimal and Mild rated games. Roblox Select (9-15) unlocks filtered, age-bracketed chat gradually. Users 16+ get the standard experience. Accounts move up automatically at 9 and 16.',
      },
      {
        q: 'How is age actually verified?',
        a: 'Facial age estimation or ID upload, mandatory globally for chat since 1 January 2026. Over 50% of global users and 65% of US users had completed it as of April 2026.',
      },
      {
        q: 'How is chat moderated?',
        a: 'Chat has never been encrypted on Roblox, deliberately, so the platform can scan for grooming and off-platform contact attempts. An AI system scans roughly 6 billion messages a day, flagging patterns that build across many messages rather than single words. Flagged cases go to human review and, where warranted, to law enforcement.',
      },
      {
        q: 'Can our brand control what appears around our experience?',
        a: 'Yes. Owned worlds are entirely within your control. For integrations we select partner experiences on brand-suitability criteria before anything is agreed, and every experience visible to under-16 accounts goes through additional review on top of standard moderation.',
      },
      {
        q: 'Does restricting chat reduce engagement?',
        a: 'The biggest experiences on Roblox don’t rely on chat to grow. Tower of Hell has close to 28 billion visits on pure gameplay. Grow a Garden passed 21 billion within its first year. Roblox’s discovery algorithm rewards games that hold and re-engage players, so a genuinely good experience grows regardless.',
      },
      {
        q: 'Is Roblox facing regulatory scrutiny?',
        a: 'Yes, in several markets, and we’d rather flag it than have you find it later. It’s worth reviewing with your legal team as part of any platform decision. The safety infrastructure above is Roblox’s published response to that scrutiny.',
      },
    ],
  },
  {
    title: 'Commercial and measurement',
    faqs: [
      {
        q: 'How much does a Roblox activation cost?',
        a: 'It depends entirely on scope and objective. A UGC collection, a brand integration and a bespoke owned world are very different investments with very different timelines. We scope against your objective and give you a number, not a rate card.',
      },
      {
        q: 'How do we measure whether it worked?',
        a: 'Everything inside the experience is instrumented: visits, engagement time, repeat visitation, approval ratings and where players dwell. For larger campaigns we run independent brand lift studies. And we design mechanics that link in-game action to real-world outcomes, so impact is attributable off-platform too.',
      },
      {
        q: 'Can Roblox drive actual sales, not just awareness?',
        a: 'Yes. Our rewards technology connects in-game actions to real-world outcomes: email and presale sign-ups, loyalty enrolment, discount redemption, app installs and store visits. An anonymous player becomes a verified, contactable customer in your CRM.',
      },
      {
        q: 'Can a Roblox experience make money, or is it purely a marketing cost?',
        a: 'It can do both. The same world can earn through in-experience purchases, Roblox\u2019s engagement-based payouts, immersive ad placements, digital ticketing and memberships, and virtual merchandise. Most brands plan it as a marketing investment and are surprised by the commercial tail. We model the realistic streams for your category before you commit.',
      },
      {
        q: 'What revenue streams are actually available to us?',
        a: 'It depends on your build and category, but broadly: UGC and avatar item sales, in-experience purchases, sponsorship inventory inside your own world, event-day passes and virtual ticketing, membership unlocks, and Roblox\u2019s own creator payouts based on engagement. Live event experiences in particular can carry tiered sponsorship from day one.',
      },
      {
        q: 'How does a Roblox presence feed our other channels?',
        a: 'Gameplay generates content, content drives discovery, and discovery sends new players back into the experience. It\u2019s a self-reinforcing loop. One children\u2019s entertainment brand runs a dedicated Roblox-gameplay YouTube channel with over 179 million views, built entirely from gameplay footage. Your Roblox presence becomes a content engine for social, not a silo.',
      },
      {
        q: 'How does this compare to what we’d spend on social?',
        a: 'Use our calculator to model it against your own numbers. Broadly, you are buying minutes of active participation rather than seconds of passive impression, which is a different unit and usually a better one.',
      },
    ],
  },
  {
    title: 'Working with us',
    faqs: [
      {
        q: 'Should we build our own world or integrate into an existing one?',
        a: 'Integrations give you scale from day one by dropping into games that already have the audience, which suits campaign moments and launches. Owned worlds take longer but become a permanent, always-on asset you control. Most brands start with an integration and build toward a world.',
      },
      {
        q: 'How long does it take?',
        a: 'Integrations typically run 4 to 8 weeks. Owned worlds and live event experiences run 8 to 12 weeks or more, depending on scope.',
      },
      {
        q: 'Who owns the experience once it’s built?',
        a: 'You do. We build it, you own it.',
      },
      {
        q: 'What happens after launch?',
        a: 'An experience that isn’t updated decays. Roblox’s algorithm rewards games that hold and re-engage players, so we plan seasonal content, events and drops from the start rather than treating launch as the end.',
      },
    ],
  },
];
