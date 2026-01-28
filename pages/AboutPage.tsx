
import React from 'react';
import { Hook } from '../components/Hook';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen text-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal mb-24">
          <span className="text-cyan-600 font-black tracking-[0.4em] uppercase text-xs mb-4 block">OUR MANIFESTO</span>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8">WHY ROBLOX?</h1>
          <p className="text-2xl text-gray-600 max-w-3xl font-medium leading-relaxed">
            The next generation isn't scrolling—they're playing. Shakuri Studios was born from a simple realization: the traditional advertising model is broken. To reach Gen-Z and Gen-Alpha, you must exist within their worlds.
          </p>
        </div>
      </div>
      
      <Hook />

      <div className="bg-black text-white py-32 mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="reveal">
              <h3 className="text-4xl font-black mb-6 uppercase tracking-tight">Culture<br/>First</h3>
              <p className="text-gray-400 font-medium text-lg leading-relaxed">We don't just translate brand assets. We translate brand DNA into spatial language that resonates with platform natives.</p>
            </div>
            <div className="reveal">
              <h3 className="text-4xl font-black mb-6 uppercase tracking-tight">End-To-End<br/>Clarity</h3>
              <p className="text-gray-400 font-medium text-lg leading-relaxed">From initial brainstorming to final deployment and maintenance—we handle the technical complexity so you don't have to.</p>
            </div>
            <div className="reveal">
              <h3 className="text-4xl font-black mb-6 uppercase tracking-tight">Measurable<br/>Outcomes</h3>
              <p className="text-gray-400 font-medium text-lg leading-relaxed">Likes and impressions are old-world metrics. We provide the data that matters, track dwell time, interaction depth, and commerce conversion.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
