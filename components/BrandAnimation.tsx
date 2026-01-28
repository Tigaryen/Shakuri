
import React from 'react';
import { Logo } from './Logo';

export const BrandAnimation: React.FC = () => {
  return (
    <section className="py-32 bg-black overflow-hidden relative border-y border-white/5">
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <Logo className="w-[800px] h-[800px]" />
      </div>
      
      <div className="relative z-10">
        <div className="flex animate-scroll whitespace-nowrap gap-12">
          {Array(10).fill(0).map((_, i) => (
            <div key={i} className="flex items-center gap-8">
              <span className="text-8xl md:text-[12rem] font-black text-transparent outline-text tracking-tighter" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>SHAKURI</span>
              <Logo className="w-24 h-24" />
            </div>
          ))}
        </div>
        <div className="flex animate-scroll whitespace-nowrap gap-12 mt-8 flex-row-reverse" style={{ animationDirection: 'reverse' }}>
          {Array(10).fill(0).map((_, i) => (
            <div key={i} className="flex items-center gap-8">
              <span className="text-8xl md:text-[12rem] font-black text-transparent outline-text tracking-tighter" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>STUDIOS</span>
              <Logo className="w-24 h-24" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
