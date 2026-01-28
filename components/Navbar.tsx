
import React from 'react';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-black/70 backdrop-blur-xl border-b border-white/10">
      <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="flex items-center gap-3 cursor-pointer group">
        <Logo className="w-10 h-10 group-hover:rotate-[360deg] transition-transform duration-1000 rounded-xl" />
        <span className="text-2xl font-black tracking-tighter uppercase group-hover:text-cyan-400 transition-colors">SHAKURI</span>
      </button>
      
      <div className="hidden md:flex gap-10 text-xs font-black tracking-widest uppercase">
        <button onClick={() => scrollTo('about')} className="text-gray-400 hover:text-[#FF8A00] transition-all hover:tracking-[0.25em]">About us</button>
        <button onClick={() => scrollTo('services')} className="text-gray-400 hover:text-[#BD00FF] transition-all hover:tracking-[0.25em]">Services</button>
        <button onClick={() => scrollTo('contact')} className="text-gray-400 hover:text-[#00FF94] transition-all hover:tracking-[0.25em]">Contact</button>
      </div>
      
      <button 
        onClick={() => scrollTo('contact')}
        className="bg-white text-black px-7 py-3 rounded-full font-black text-xs transition-all active:scale-90 btn-glow-cyan uppercase tracking-widest"
      >
        Speak to the team
      </button>
    </nav>
  );
};
