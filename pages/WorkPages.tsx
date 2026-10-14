import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import workPage from '../content/pages/work.json';
import { caseStudies, findCaseStudy, type CmsEntry } from '../data/cmsPages';
import { cleanRich } from '../data/richText';
import { Hero, Closing } from './CmsPage';

// Case studies the client adds in the CMS. /work lists them, /work/:slug tells one story.
// Every word and picture comes from the CMS; the layout stays on-brand.

const Tags: React.FC<{ tags?: { t: string }[] }> = ({ tags }) =>
  !tags?.length ? null : (
    <div className="flex flex-wrap gap-2">
      {tags.filter((x) => x.t).map((x, i) => (
        <span key={i} className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-gray-300">{x.t}</span>
      ))}
    </div>
  );

const Card: React.FC<{ c: CmsEntry; big?: boolean }> = ({ c, big }) => {
  const f = c.fields;
  return (
    <Link to={`/work/${c.slug}`} className={`reveal group block overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a] transition-all duration-500 hover:-translate-y-1 hover:border-white/25 ${big ? 'md:col-span-2' : ''}`}>
      <div className={`relative overflow-hidden ${big ? 'aspect-[16/9] md:aspect-[21/9]' : 'aspect-[16/10]'}`}>
        {f.hero?.src
          ? <img src={f.hero.src} alt={f.hero.alt || ''} width={1600} height={1000} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          : <div className="h-full w-full bg-shakuri-gradient opacity-30" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        {f.client && <span className="absolute left-6 top-6 rounded-full bg-black/60 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-white backdrop-blur">{f.client}</span>}
      </div>
      <div className="p-8 md:p-10">
        {f.kicker && <span className="mb-3 block text-xs font-black uppercase tracking-[0.3em] text-gradient">{f.kicker}</span>}
        <h2 className={`mb-4 font-black leading-[0.95] tracking-tighter ${big ? 'text-4xl md:text-6xl' : 'text-3xl md:text-4xl'}`}>{f.title}</h2>
        {f.lede && <p className="mb-6 max-w-3xl text-lg font-medium leading-relaxed text-gray-400">{f.lede}</p>}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Tags tags={f.services} />
          <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-white">Read the case <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
        </div>
      </div>
    </Link>
  );
};

export const WorkPage: React.FC = () => {
  const f = workPage.slots as Record<string, any>;
  return (
    <div className="bg-[#050505]">
      <section className="px-6 pb-20 pt-40 md:px-12">
        <div className="mx-auto max-w-7xl">
          <Hero f={f} />
          {caseStudies.length ? (
            <div className="grid gap-8 md:grid-cols-2">
              {caseStudies.map((c, i) => <Card key={c.slug} c={c} big={i === 0 && caseStudies.length % 2 === 1} />)}
            </div>
          ) : (
            <p className="reveal text-lg font-medium text-gray-500">Case studies are on their way.</p>
          )}
        </div>
      </section>
      <Closing f={f} />
    </div>
  );
};

export const CaseStudyPage: React.FC = () => {
  const { slug = '' } = useParams();
  const c = findCaseStudy(slug);
  if (!c) return <NotFound back="/work" label="See all our work" />;
  const f = c.fields;
  const stats = (f.stats || []).filter((s: any) => s.value);
  const did = (f.did || []).filter((d: any) => d.t);
  const others = caseStudies.filter((x) => x.slug !== c.slug).slice(0, 2);
  return (
    <div className="bg-[#050505]">
      <section className="px-6 pb-16 pt-40 md:px-12">
        <div className="mx-auto max-w-7xl">
          <Link to="/work" className="mb-10 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-gray-400 transition-colors hover:text-white"><ArrowLeft className="h-4 w-4" /> All work</Link>
          <div className="reveal mb-12 max-w-5xl">
            <span className="mb-4 block text-xs font-black uppercase tracking-[0.3em] text-gradient">{[f.client, f.kicker].filter(Boolean).join(' · ') || 'Case study'}</span>
            <h1 className="mb-6 text-5xl font-black leading-[0.9] tracking-tighter sm:text-6xl md:text-8xl">{f.title}</h1>
            {f.lede && <p className="max-w-3xl text-xl font-medium leading-relaxed text-gray-400 md:text-2xl">{f.lede}</p>}
          </div>
          <div className="reveal mb-12"><Tags tags={f.services} /></div>
          {f.hero?.src && (
            <figure className="reveal overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a]">
              <img src={f.hero.src} alt={f.hero.alt || ''} width={1600} height={1000} decoding="async" className="aspect-[16/9] h-auto w-full object-cover" />
            </figure>
          )}
        </div>
      </section>

      {stats.length > 0 && (
        <section className="px-6 pb-16 md:px-12">
          <div className={`reveal mx-auto grid max-w-7xl gap-6 ${stats.length > 2 ? 'md:grid-cols-4' : 'md:grid-cols-2'} grid-cols-2`}>
            {stats.map((s: any, i: number) => (
              <div key={i} className="glass rounded-[2rem] border border-white/10 p-6 md:p-8">
                <div className="mb-2 text-4xl font-black tracking-tighter text-gradient md:text-6xl">{s.value}</div>
                <div className="text-sm font-bold uppercase tracking-[0.15em] text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="px-6 pb-24 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
          {did.length > 0 ? (
            <aside className="reveal">
              <h2 className="mb-6 text-xs font-black uppercase tracking-[0.3em] text-gray-400">What we did</h2>
              <ul className="space-y-4">
                {did.map((d: any, i: number) => (
                  <li key={i} className="flex gap-4 text-lg font-bold leading-snug"><span className="text-gradient font-black">{String(i + 1).padStart(2, '0')}</span>{d.t}</li>
                ))}
              </ul>
            </aside>
          ) : <div />}
          <article className="reveal">
            {f.headline && <h2 className="mb-8 text-3xl font-black leading-[1.05] tracking-tighter md:text-5xl">{f.headline}</h2>}
            <div className="cms-rich" dangerouslySetInnerHTML={{ __html: cleanRich(f.body) }} />
          </article>
        </div>
      </section>

      {others.length > 0 && (
        <section className="px-6 pb-24 md:px-12">
          <div className="mx-auto max-w-7xl">
            <h2 className="reveal mb-8 text-xs font-black uppercase tracking-[0.3em] text-gray-400">More work</h2>
            <div className="grid gap-8 md:grid-cols-2">{others.map((o) => <Card key={o.slug} c={o} />)}</div>
          </div>
        </section>
      )}
      <Closing f={workPage.slots as Record<string, any>} />
    </div>
  );
};

export const NotFound: React.FC<{ back: string; label: string }> = ({ back, label }) => (
  <section className="px-6 pb-32 pt-48 text-center md:px-12">
    <h1 className="mb-6 text-5xl font-black tracking-tighter md:text-7xl">Page not found</h1>
    <Link to={back} className="text-lg font-bold text-gray-400 underline hover:text-white">{label}</Link>
  </section>
);
