
import React from 'react';

const brands = [
  'Hasbro', 'Moonbug', 'Netflix', 'Max Mara', 'Spin Master',
  'Danone', 'UPS', 'Kraft Heinz', 'Chupa Chups',
  'Hasbro', 'Moonbug', 'Netflix', 'Max Mara', 'Spin Master',
  'Danone', 'UPS', 'Kraft Heinz', 'Chupa Chups',
];

const stats = [
  { value: '700M+', label: 'Plays worldwide' },
  { value: '850M+', label: 'Impressions' },
  { value: '120M+', label: 'Engagement hours' },
];

export const BrandCarousel: React.FC = () => {
  return (
    <>
    <section className="py-24 bg-black overflow-hidden relative">
      {/* Background glow for the section */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-pink-500/10 pointer-events-none"></div>
      
      <div className="text-center mb-16 px-6 reveal">
        <h3 className="text-2xl md:text-5xl font-black tracking-tight uppercase text-white max-w-4xl mx-auto leading-none mb-4">
          The teams behind Roblox's biggest brand worlds.
        </h3>
        <p className="text-3xl md:text-6xl font-black tracking-tighter uppercase text-cyan-400 drop-shadow-[0_0_30px_rgba(0,209,255,0.5)]">
          Now building yours.
        </p>
      </div>

      <div className="relative flex">
        <div className="flex animate-scroll whitespace-nowrap gap-8 md:gap-12 items-center py-4">
          {brands.map((brand, idx) => (
            <div key={idx} className="border-beam-card cursor-pointer group">
              <div className="border-beam-content bg-[#121212] px-10 py-5 rounded-full relative z-10 transition-all duration-300 group-hover:bg-[#1a1a1a]">
                <span className="text-2xl md:text-4xl font-black text-white/60 transition-all duration-500 uppercase select-none group-hover:text-white group-hover:drop-shadow-[0_0_20px_rgba(0,209,255,0.8)]">
                  {brand}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle bottom edge gradient to section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </section>

    {/* Proof bar */}
    <section className="bg-black text-white py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto reveal">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="relative group">
              {/* Gradient glow behind the box */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2 rounded-[1.5rem] bg-shakuri-gradient opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
              ></div>

              <div className="relative rounded-2xl border border-white/10 bg-white/5 px-8 py-12 text-center">
                <h3 className="text-6xl md:text-8xl font-black tracking-tighter text-gradient">{stat.value}</h3>
                <p className="mt-4 text-sm font-black uppercase tracking-[0.25em] text-gray-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};
