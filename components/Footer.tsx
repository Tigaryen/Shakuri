
import React from 'react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="py-20 px-6 md:px-12 border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Logo className="w-12 h-12" />
            <span className="text-3xl font-black tracking-tighter uppercase">SHAKURI</span>
          </div>
          <p className="text-gray-500 max-w-sm font-medium leading-relaxed">
            Building the future of brand engagement on Roblox and Fortnite. Cultural relevance, measurable outcomes, total clarity.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-12 md:gap-24">
          <div className="space-y-4">
            <h4 className="font-black text-xs uppercase tracking-widest text-gray-400">Contact</h4>
            <ul className="text-gray-500 space-y-2 text-sm font-bold">
              <li><a href="mailto:hello@shakuristudios.com" className="hover:text-white transition-colors">hello@shakuristudios.com</a></li>
              <li>London / Manchester / Dubai</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-black text-xs uppercase tracking-widest text-gray-400">Social</h4>
            <ul className="text-gray-500 space-y-2 text-sm font-bold">
              <li><a href="https://www.linkedin.com/company/shakuristudios/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-800">
        <span>&copy; 2025 SHAKURI STUDIOS LTD.</span>
        <span></span>
      </div>
    </footer>
  );
};
