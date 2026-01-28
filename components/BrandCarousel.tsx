
import React from 'react';

const brands = [
  'Lego', 'Mtn Dew', 'AT&T', 'ORAL-B', 
  'Lavazza', 'Sony', 'Hasbro', 'WWF',
  'Lego', 'Mtn Dew', 'AT&T', 'ORAL-B', 
  'Lavazza', 'Sony', 'Hasbro', 'WWF',
];

export const BrandCarousel: React.FC = () => {
  return (
    <section className="py-24 bg-black overflow-hidden relative">
      {/* Background glow for the section */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-pink-500/10 pointer-events-none"></div>
      
      <div className="text-center mb-16 px-6 reveal">
        <h3 className="text-2xl md:text-5xl font-black tracking-tight uppercase text-white max-w-4xl mx-auto leading-none mb-4">
          The world's biggest brands are already here.
        </h3>
        <p className="text-3xl md:text-6xl font-black tracking-tighter uppercase text-cyan-400 drop-shadow-[0_0_30px_rgba(0,209,255,0.5)]">
          Why aren't you?
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
  );
};
