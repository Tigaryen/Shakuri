import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import journalPage from '../content/pages/journal.json';
import { journalPosts, findPost } from '../data/cmsPages';
import { cleanRich } from '../data/richText';
import { Hero } from './CmsPage';
import { NotFound } from './WorkPages';

// News, articles and ideas the client writes in the CMS. /journal lists them, newest first.

const fmtDate = (iso: string) => {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00Z');
  return isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
};
const Meta: React.FC<{ f: Record<string, any>; date: string }> = ({ f, date }) => (
  <span className="block text-xs font-black uppercase tracking-[0.3em]">
    {f.category && <span className="text-gradient">{f.category}</span>}
    {f.category && date && <span className="text-gray-600"> · </span>}
    {date && <span className="text-gray-400">{fmtDate(date)}</span>}
  </span>
);

export const JournalPage: React.FC = () => {
  const f = journalPage.slots as Record<string, any>;
  const [lead, ...rest] = journalPosts;
  return (
    <div className="bg-[#050505]">
      <section className="px-6 pb-28 pt-40 md:px-12">
        <div className="mx-auto max-w-7xl">
          <Hero f={f} />
          {!lead && <p className="reveal text-lg font-medium text-gray-500">The first post is on its way.</p>}
          {lead && (
            <Link to={`/journal/${lead.slug}`} className="reveal group mb-16 grid overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a] transition-all duration-500 hover:border-white/25 md:grid-cols-2">
              <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
                {lead.fields.cover?.src
                  ? <img src={lead.fields.cover.src} alt={lead.fields.cover.alt || ''} width={1600} height={1000} decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  : <div className="h-full min-h-[240px] w-full bg-shakuri-gradient opacity-30" />}
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <div className="mb-5"><Meta f={lead.fields} date={lead.date} /></div>
                <h2 className="mb-5 text-4xl font-black leading-[0.95] tracking-tighter md:text-5xl">{lead.fields.title}</h2>
                {lead.fields.excerpt && <p className="mb-8 text-lg font-medium leading-relaxed text-gray-400">{lead.fields.excerpt}</p>}
                <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em]">Read <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </div>
            </Link>
          )}
          {rest.length > 0 && (
            <div className="divide-y divide-white/10 border-y border-white/10">
              {rest.map((p) => (
                <Link key={p.slug} to={`/journal/${p.slug}`} className="reveal group grid items-center gap-6 py-8 md:grid-cols-[1fr_auto]">
                  <div>
                    <div className="mb-3"><Meta f={p.fields} date={p.date} /></div>
                    <h3 className="mb-2 text-2xl font-black tracking-tight transition-colors group-hover:text-[#00D1FF] md:text-3xl">{p.fields.title}</h3>
                    {p.fields.excerpt && <p className="max-w-3xl font-medium text-gray-400">{p.fields.excerpt}</p>}
                  </div>
                  <ArrowRight className="hidden h-6 w-6 text-gray-500 transition-all group-hover:translate-x-1 group-hover:text-white md:block" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export const PostPage: React.FC = () => {
  const { slug = '' } = useParams();
  const p = findPost(slug);
  if (!p) return <NotFound back="/journal" label="Back to the journal" />;
  const f = p.fields;
  return (
    <div className="bg-[#050505]">
      <article className="px-6 pb-28 pt-40 md:px-12">
        <div className="mx-auto max-w-4xl">
          <Link to="/journal" className="mb-10 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-gray-400 transition-colors hover:text-white"><ArrowLeft className="h-4 w-4" /> Journal</Link>
          <header className="reveal mb-12">
            <div className="mb-6"><Meta f={f} date={p.date} /></div>
            <h1 className="mb-6 text-4xl font-black leading-[0.95] tracking-tighter sm:text-5xl md:text-7xl">{f.title}</h1>
            {f.excerpt && <p className="text-xl font-medium leading-relaxed text-gray-400 md:text-2xl">{f.excerpt}</p>}
          </header>
        </div>
        {f.cover?.src && (
          <figure className="reveal mx-auto mb-14 max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a]">
            <img src={f.cover.src} alt={f.cover.alt || ''} width={1600} height={1000} decoding="async" className="aspect-[16/9] h-auto w-full object-cover" />
          </figure>
        )}
        <div className="reveal mx-auto max-w-3xl">
          <div className="cms-rich" dangerouslySetInnerHTML={{ __html: cleanRich(f.body) }} />
        </div>
      </article>
    </div>
  );
};
