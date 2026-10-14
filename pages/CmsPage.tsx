import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { findCmsPage, type CmsPage as Page } from '../data/cmsPages';

// Renders the pages a client creates in the CMS. Two layouts, both in the Shakuri look:
//   standard  title, intro, optional image, flowing text, optional closing panel
//   points    title, intro, numbered points, optional closing panel
// Text is rendered as plain text (paragraphs split on blank lines), so nothing a client types can run as code.

const paragraphs = (text = '') =>
  text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

const SmartLink: React.FC<{ href: string; className: string; children: React.ReactNode }> = ({ href, className, children }) =>
  href.startsWith('/') ? <Link to={href} className={className}>{children}</Link>
    : <a href={href} className={className} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{children}</a>;

const Hero: React.FC<{ f: Record<string, any> }> = ({ f }) => (
  <div className="reveal mb-16 max-w-4xl">
    {f.kicker && <span className="mb-4 block text-xs font-black uppercase tracking-[0.3em] text-gradient">{f.kicker}</span>}
    <h1 className="mb-6 text-5xl font-black tracking-tighter sm:text-6xl md:text-8xl">{f.title}</h1>
    {f.intro && <p className="max-w-3xl text-xl font-medium leading-relaxed text-gray-400 md:text-2xl">{f.intro}</p>}
  </div>
);

const Closing: React.FC<{ f: Record<string, any> }> = ({ f }) =>
  !f.ctaTitle ? null : (
    <section className="bg-[#050505] px-6 pb-24 md:px-12">
      <div className="reveal mx-auto max-w-7xl">
        <div className="rounded-[2.5rem] bg-shakuri-gradient p-[2px]">
          <div className="rounded-[2.4rem] bg-[#080808] px-8 py-14 text-center md:px-16 md:py-20">
            <h2 className="mb-10 text-4xl font-black leading-none tracking-tighter md:text-6xl">{f.ctaTitle}</h2>
            {f.cta?.label && f.cta?.href && (
              <SmartLink href={f.cta.href} className="btn-glow-multi inline-block rounded-[2rem] bg-shakuri-gradient px-8 py-5 text-base font-black uppercase tracking-[0.15em] text-white transition-all active:scale-95 sm:px-12 sm:py-6 sm:text-xl">
                {f.cta.label}
              </SmartLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );

const Standard: React.FC<{ f: Record<string, any> }> = ({ f }) => (
  <>
    <section className="px-6 pb-20 pt-40 md:px-12">
      <div className="mx-auto max-w-7xl">
        <Hero f={f} />
        {f.image?.src && (
          <figure className="reveal mb-16 overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a]">
            <img src={f.image.src} alt={f.image.alt || ''} width={1400} height={875} decoding="async" className="h-auto w-full object-cover" />
          </figure>
        )}
        <div className="reveal max-w-3xl space-y-6">
          {paragraphs(f.body).map((p, i) => (
            <p key={i} className="text-lg font-medium leading-relaxed text-gray-300 md:text-xl">{p}</p>
          ))}
        </div>
      </div>
    </section>
    <Closing f={f} />
  </>
);

const Points: React.FC<{ f: Record<string, any> }> = ({ f }) => (
  <>
    <section className="px-6 pb-20 pt-40 md:px-12">
      <div className="mx-auto max-w-7xl">
        <Hero f={f} />
        {f.pointsLabel && <h2 className="reveal mb-8 text-xs font-black uppercase tracking-[0.3em] text-gray-400">{f.pointsLabel}</h2>}
        <ol className="grid gap-6 md:grid-cols-2">
          {(f.points || []).map((pt: { t: string; d?: string }, i: number) => (
            <li key={i} className="reveal glass relative overflow-hidden rounded-[2rem] border border-white/10 p-8 md:p-10">
              <span className="mb-4 block text-5xl font-black tracking-tighter text-gradient">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mb-3 text-2xl font-black uppercase tracking-tight md:text-3xl">{pt.t}</h3>
              {pt.d && <p className="text-lg font-medium leading-relaxed text-gray-400">{pt.d}</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
    <Closing f={f} />
  </>
);

export const CmsPage: React.FC = () => {
  const { slug = '' } = useParams();
  const page: Page | undefined = findCmsPage(slug);
  if (!page) {
    return (
      <section className="px-6 pb-32 pt-48 text-center md:px-12">
        <h1 className="mb-6 text-5xl font-black tracking-tighter md:text-7xl">Page not found</h1>
        <Link to="/" className="text-lg font-bold text-gray-400 underline hover:text-white">Back to the homepage</Link>
      </section>
    );
  }
  return <div className="bg-[#050505]">{page.layout === 'points' ? <Points f={page.fields} /> : <Standard f={page.fields} />}</div>;
};
