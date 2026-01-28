
import React, { useState } from 'react';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-black/70 backdrop-blur-xl border-b border-white/10">
        <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="flex items-center gap-3 cursor-pointer group">
          <Logo className="w-10 h-10 group-hover:rotate-[360deg] transition-transform duration-1000 rounded-xl" />
          <span className="text-2xl font-black tracking-tighter uppercase group-hover:text-cyan-400 transition-colors">SHAKURI</span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-10 text-xs font-black tracking-widest uppercase">
          <button onClick={() => scrollTo('about')} className="text-gray-400 hover:text-[#FF8A00] transition-all hover:tracking-[0.25em]">About us</button>
          <button onClick={() => scrollTo('services')} className="text-gray-400 hover:text-[#BD00FF] transition-all hover:tracking-[0.25em]">Services</button>
          <button onClick={() => scrollTo('contact')} className="text-gray-400 hover:text-[#00FF94] transition-all hover:tracking-[0.25em]">Contact</button>
        </div>

        {/* Desktop CTA Button */}
        <button
          onClick={() => scrollTo('contact')}
          className="hidden md:block bg-white text-black px-7 py-3 rounded-full font-black text-xs transition-all active:scale-90 btn-glow-cyan uppercase tracking-widest"
        >
          Speak to the team
        </button>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white p-2 hover:text-cyan-400 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className={`flex flex-col items-center justify-center h-full gap-8 transition-all duration-500 ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-10'
        }`}>
          <button
            onClick={() => scrollTo('about')}
            className="text-3xl font-black tracking-widest uppercase text-white hover:text-[#FF8A00] transition-all"
          >
            About us
          </button>
          <button
            onClick={() => scrollTo('services')}
            className="text-3xl font-black tracking-widest uppercase text-white hover:text-[#BD00FF] transition-all"
          >
            Services
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="text-3xl font-black tracking-widest uppercase text-white hover:text-[#00FF94] transition-all"
          >
            Contact
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="mt-8 bg-white text-black px-10 py-4 rounded-full font-black text-sm transition-all active:scale-90 uppercase tracking-widest"
          >
            Speak to the team
          </button>
        </div>
      </div>
    </>
  );
};
