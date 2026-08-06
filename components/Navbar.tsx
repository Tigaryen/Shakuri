
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Escape to close, and lock body scroll while the panel is open.
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  // Homepage sections only exist on '/', so from any other route we route home
  // first and let ScrollManager handle the scroll.
  const scrollTo = (id: string) => {
    if (pathname !== '/') {
      navigate(`/#${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  // Always lands at the very top: smooth-scrolls when already home, otherwise
  // routes to '/' where ScrollManager resets the scroll position.
  const goHome = () => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
    setIsMenuOpen(false);
  };

  const goTo = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', hover: 'hover:text-[#FF8A00]', action: goHome },
    { label: 'Our Services', hover: 'hover:text-[#BD00FF]', action: () => goTo('/services') },
    { label: 'The Results', hover: 'hover:text-[#FF00CC]', action: () => goTo('/results') },
    { label: 'Value Calculator', hover: 'hover:text-[#00D1FF]', action: () => goTo('/calculator') },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-black/70 backdrop-blur-xl border-b border-white/10">
        <button onClick={goHome} className="flex items-center gap-3 cursor-pointer group">
          <Logo className="w-10 h-10 group-hover:rotate-[360deg] transition-transform duration-1000 rounded-xl" />
          <span className="text-2xl font-black tracking-tighter uppercase group-hover:text-cyan-400 transition-colors">SHAKURI</span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-7 text-xs font-black tracking-widest uppercase">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`text-gray-400 transition-all hover:tracking-[0.25em] ${item.hover}`}
            >
              {item.label}
            </button>
          ))}
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
          className="lg:hidden text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:text-cyan-400 transition-colors"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay — tapping the backdrop closes it */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`flex flex-col items-center justify-center h-full gap-6 transition-all duration-500 ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-10'
          }`}
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`flex items-center min-h-[44px] px-6 py-3 text-3xl font-black tracking-widest uppercase text-white transition-all ${item.hover}`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="mt-6 min-h-[44px] bg-white text-black px-10 py-4 rounded-full font-black text-sm transition-all active:scale-90 uppercase tracking-widest"
          >
            Speak to the team
          </button>
        </div>
      </div>
    </>
  );
};
