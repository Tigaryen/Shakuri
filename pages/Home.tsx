
import React from 'react';
import { Hero } from '../components/Hero';
import { Hook } from '../components/Hook';
import { BrandCarousel } from '../components/BrandCarousel';
import { Services } from '../components/Services';
import { BrandAnimation } from '../components/BrandAnimation';
import { ContactForm } from '../components/ContactForm';
import { AIAvatar } from '../components/AIAvatar';

export const Home: React.FC = () => {
  return (
    <>
      <div id="hero">
        <Hero />
      </div>
      
      <div id="about" className="reveal">
        <Hook />
      </div>

      <div className="bg-black text-white py-32 border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="reveal flex flex-col items-start">
              <div className="mb-8">
                <AIAvatar prompt="wearing a stylish streetwear outfit with purple accents, urban cool vibe" size="md" />
              </div>
              <span className="text-purple-500 font-black tracking-widest text-[10px] uppercase mb-4 block">PILLAR 01</span>
              <h3 className="text-4xl font-black mb-6 uppercase tracking-tight">Culture<br/>First</h3>
              <p className="text-gray-400 font-medium text-lg leading-relaxed">We don't just translate brand assets. We translate brand DNA into spatial language that resonates with platform natives.</p>
            </div>
            <div className="reveal flex flex-col items-start">
              <div className="mb-8">
                <AIAvatar prompt="wearing a futuristic cyberpunk suit with glowing cyan lights, tech-focused style" size="md" />
              </div>
              <span className="text-cyan-400 font-black tracking-widest text-[10px] uppercase mb-4 block">PILLAR 02</span>
              <h3 className="text-4xl font-black mb-6 uppercase tracking-tight">End-To-End<br/>Clarity</h3>
              <p className="text-gray-400 font-medium text-lg leading-relaxed">From initial brainstorming to final deployment and maintenance—we handle the technical complexity so you don't have to.</p>
            </div>
            <div className="reveal flex flex-col items-start">
              <div className="mb-8">
                <AIAvatar prompt="wearing a sharp pink and white luxury fashion outfit, holding a glowing data tablet, success oriented" size="md" />
              </div>
              <span className="text-pink-500 font-black tracking-widest text-[10px] uppercase mb-4 block">PILLAR 03</span>
              <h3 className="text-4xl font-black mb-6 uppercase tracking-tight">Measurable<br/>Outcomes</h3>
              <p className="text-gray-400 font-medium text-lg leading-relaxed">Likes and impressions are old-world metrics. We track dwell time, interaction depth, and commerce conversion.</p>
            </div>
          </div>
        </div>
      </div>

      <BrandCarousel />

      <div id="services" className="reveal">
        <Services />
      </div>

      <BrandAnimation />

      <div id="contact" className="reveal">
        <ContactForm />
      </div>
    </>
  );
};
