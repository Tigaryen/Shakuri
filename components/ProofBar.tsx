
import React from 'react';

const stats = [
  { value: '700M+', label: 'Plays worldwide' },
  { value: '850M+', label: 'Impressions' },
  { value: '120M+', label: 'Engagement hours' },
];

export const ProofBar: React.FC = () => {
  return (
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
  );
};
