
import React from 'react';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="reveal">
    <h2 className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-gradient">{title}</h2>
    <div className="space-y-4 text-lg font-medium leading-relaxed text-gray-400">{children}</div>
  </section>
);

export const PrivacyPage: React.FC = () => {
  return (
    <div className="bg-[#050505] px-6 md:px-12 pt-40 pb-32">
      <div className="mx-auto max-w-3xl">
        <div className="reveal mb-16">
          <h1 className="mb-4 text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-none">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-sm font-medium tracking-wide text-gray-500">
            Last updated: 6 August 2026
          </p>
        </div>

        <div className="space-y-12">
          <Section title="Who we are">
            <p>
              Shakuri Studios Ltd, registered in England and Wales, company number 17194051.
              Registered office: 2nd Floor, 47 Lloyd St, Manchester, United Kingdom, M2 5LE.
            </p>
            <p>
              You can reach us at{' '}
              <a
                href="mailto:hello@shakuristudios.com"
                className="break-all text-white underline decoration-cyan-400 decoration-2 underline-offset-4 hover:decoration-4"
              >
                hello@shakuristudios.com
              </a>
              .
            </p>
          </Section>

          <Section title="What we collect">
            <p>
              Only what you submit through the contact form: your name, email address, the service
              you’re interested in, and your message.
            </p>
            <p>We do not use cookies and we do not store anything on your device.</p>
          </Section>

          <Section title="Why we collect it">
            <p>
              To respond to your enquiry and, if it progresses, to discuss working together.
            </p>
          </Section>

          <Section title="Lawful basis">
            <p>Legitimate interests: responding to a business enquiry you initiated.</p>
          </Section>

          <Section title="Who else processes it">
            <p>
              Formspree, which delivers the contact form to us and is US-based, and Google
              Workspace, which hosts our email. Both act as processors on our behalf.
            </p>
          </Section>

          <Section title="Analytics">
            <p>
              We use Vercel Web Analytics and Speed Insights. Both are cookieless and collect
              aggregate page views and performance data only. They do not identify individual
              visitors and set nothing on your device.
            </p>
          </Section>

          <Section title="How long we keep it">
            <p>We keep enquiries for 24 months, then delete them.</p>
          </Section>

          <Section title="Your rights">
            <p>
              Under UK GDPR you can request access to, correction of, or deletion of your data,
              object to processing, or request a copy. Email{' '}
              <a
                href="mailto:hello@shakuristudios.com"
                className="break-all text-white underline decoration-cyan-400 decoration-2 underline-offset-4 hover:decoration-4"
              >
                hello@shakuristudios.com
              </a>
              .
            </p>
            <p>
              You can also complain to the Information Commissioner’s Office at{' '}
              <a
                href="https://ico.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline decoration-cyan-400 decoration-2 underline-offset-4 hover:decoration-4"
              >
                ico.org.uk
              </a>
              .
            </p>
          </Section>

          <Section title="Links to other sites">
            <p>
              We link to external sites, including our scheduling page. This policy doesn’t cover
              them.
            </p>
          </Section>

          <Section title="Changes">
            <p>We’ll update this page and the date above if anything changes.</p>
          </Section>
        </div>
      </div>
    </div>
  );
};
