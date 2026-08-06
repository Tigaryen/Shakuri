
import React from 'react';
import { Link } from 'react-router-dom';

export const ValueCTA: React.FC = () => {
  return (
    <section className="bg-[#050505] px-6 md:px-12 py-20">
      <div className="max-w-7xl mx-auto reveal">
        {/* Gradient border: gradient wrapper with an inset dark panel */}
        <div className="bg-shakuri-gradient rounded-[2.5rem] p-[2px]">
          <div className="bg-[#080808] rounded-[2.4rem] px-8 py-14 md:px-16 md:py-20 text-center">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6">
              What is Roblox attention actually worth?
            </h2>
            <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto mb-10">
              Put your own numbers in and see the value in minutes, media and real-world outcomes.
            </p>
            <Link
              to="/calculator"
              className="btn-glow-multi inline-block bg-shakuri-gradient px-12 py-6 rounded-[2rem] text-xl font-black uppercase tracking-[0.2em] text-white transition-all active:scale-95"
            >
              Run the numbers
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
