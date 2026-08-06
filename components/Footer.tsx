
import React from 'react';
import { Link } from 'react-router-dom';
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
            Roblox natives building brand worlds that convert attention into outcomes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 md:gap-24">
          <div className="space-y-4">
            <h4 className="font-black text-xs uppercase tracking-widest text-gray-400">Contact</h4>
            <ul className="text-gray-500 space-y-2 text-sm font-bold">
              <li><a href="mailto:hello@shakuristudios.com" className="break-all hover:text-white transition-colors">hello@shakuristudios.com</a></li>
              <li>Manchester / London</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-black text-xs uppercase tracking-widest text-gray-400">Legal</h4>
            <ul className="text-gray-500 space-y-2 text-sm font-bold">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
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
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 space-y-4">
        <p className="text-xs font-medium leading-relaxed text-gray-600">
          Shakuri Studios Ltd, registered in England and Wales, company number 17194051.
          Registered office: 2nd Floor, 47 Lloyd St, Manchester, United Kingdom, M2 5LE.
        </p>
        <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-800">
          &copy; 2025 Shakuri Studios Ltd.
        </span>
      </div>
    </footer>
  );
};
