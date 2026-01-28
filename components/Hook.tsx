
import React from 'react';

export const Hook: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-white text-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-pink-50/20 via-cyan-50/20 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
        <div className="reveal">
          <span className="text-sm font-black tracking-widest uppercase text-cyan-600 mb-4 block">THE SHAKURI EDGE</span>
          <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8 tracking-tighter">
            Your end-to-end partner for Roblox & Fortnite.
          </h2>
          <p className="text-xl md:text-2xl leading-relaxed font-medium text-gray-600">
            Shakuri architects success for brands who want to thrive on Roblox and Fortnite with <span className="text-black font-bold underline decoration-purple-500 decoration-4">clarity</span>, <span className="text-black font-bold underline decoration-cyan-400 decoration-4">cultural relevance</span>, and <span className="text-black font-bold underline decoration-pink-500 decoration-4">measurable outcomes</span>.
          </p>
        </div>
        
        <div className="reveal flex flex-col gap-8">
          {/* Fact Box 1 - DAU */}
          <div className="bg-black text-white p-10 md:p-14 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-gray-100 group hover:border-cyan-400 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/20 transition-all"></div>
            <div className="relative z-10">
              <span className="text-xs font-black tracking-[0.3em] uppercase text-cyan-400 mb-4 block">PLATFORM SCALE</span>
              <h3 className="text-6xl md:text-8xl font-black tracking-tighter mb-2 text-gradient">112M+</h3>
              <p className="text-xl font-bold text-gray-400 leading-tight">Daily Active Users craving immersive brand stories.</p>
            </div>
          </div>

          {/* Fact Box 2 - Engagement */}
          <div className="bg-black text-white p-10 md:p-14 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-gray-100 group hover:border-pink-500 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 blur-3xl group-hover:bg-pink-500/20 transition-all"></div>
            <div className="relative z-10">
              <span className="text-xs font-black tracking-[0.3em] uppercase text-pink-500 mb-4 block">ENGAGEMENT DEPTH</span>
              <h3 className="text-6xl md:text-8xl font-black tracking-tighter mb-2 text-gradient">2.5Hrs</h3>
              <p className="text-xl font-bold text-gray-400 leading-tight">Average Daily Use. Outpacing nearly every social platform.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
