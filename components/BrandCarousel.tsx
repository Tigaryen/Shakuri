import React from 'react';

const brands = [
  'Hasbro', 'Moonbug', 'Netflix', 'Max Mara', 'Spin Master',
  'Danone', 'UPS', 'Kraft Heinz', 'Chupa Chups',
  'Hasbro', 'Moonbug', 'Netflix', 'Max Mara', 'Spin Master',
  'Danone', 'UPS', 'Kraft Heinz', 'Chupa Chups',
];

// Sits under the network diagram on /how-we-work, so it borrows that page's
// background rather than painting its own black band.
export const BrandCarousel: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="relative text-center mb-16 px-6 reveal">
        <p className="mb-6 text-xs font-black uppercase tracking-[0.3em] text-gray-400">
          Our partner network
        </p>
        <h2 className="text-2xl md:text-5xl font-black tracking-tight uppercase text-white max-w-4xl mx-auto leading-none mb-4">
          Proven on household names.
        </h2>
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
    </section>
  );
};
