
import React from 'react';
import home from '../content/pages/home.json';

const c = home.slots;
// Card colours stay with the design; the words and numbers come from the CMS.
const looks = [
  {
    glow: 'bg-cyan-500/10 group-hover:bg-cyan-500/20',
    hover: 'hover:border-cyan-400',
  },
  {
    glow: 'bg-pink-500/10 group-hover:bg-pink-500/20',
    hover: 'hover:border-pink-500',
  },
  {
    glow: 'bg-purple-500/10 group-hover:bg-purple-500/20',
    hover: 'hover:border-purple-500',
  },
  {
    glow: 'bg-emerald-500/10 group-hover:bg-emerald-500/20',
    hover: 'hover:border-emerald-400',
  },
];

const stats = c['edge.stats'].map((s, i) => ({ ...looks[i % looks.length], ...s }));
const underline = ['decoration-purple-500', 'decoration-cyan-400', 'decoration-pink-500'];
const hl = c['edge.highlights'];

export const Hook: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-white text-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-pink-50/20 via-cyan-50/20 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="reveal max-w-4xl mb-16">
          <span className="text-sm font-black tracking-widest uppercase text-cyan-600 mb-4 block">{c['edge.kicker']}</span>
          <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8 tracking-tighter">
            {c['edge.headBefore']} <span className="text-gradient">{c['edge.headHighlight']}</span> {c['edge.headAfter']}
          </h2>
          <p className="text-xl md:text-2xl leading-relaxed font-medium text-gray-600">
            {c['edge.intro']}{' '}
            {hl.map((h, i) => (
              <React.Fragment key={i}>
                {i > 0 && (i === hl.length - 1 ? ', and ' : ', ')}
                <span className={`text-black font-bold underline decoration-4 ${underline[i % underline.length]}`}>{h.t}</span>
              </React.Fragment>
            ))}.
          </p>
        </div>

        <div className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.value + stat.label}
              className={`bg-black text-white p-8 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-gray-100 group transition-all duration-500 relative overflow-hidden ${stat.hover}`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl transition-all ${stat.glow}`}></div>
              <div className="relative z-10">
                <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-3 text-gradient leading-none">{stat.value}</h3>
                <p className="text-base font-bold text-gray-400 leading-tight">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="reveal mt-8 text-xs font-medium text-gray-400 tracking-wide">
          {c['edge.sources']}
        </p>
      </div>
    </section>
  );
};
