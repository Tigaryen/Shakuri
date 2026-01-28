
import React from 'react';
import { Target, Zap, Construction, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Strategy",
      icon: <Target className="w-16 h-16 text-cyan-400" />,
      desc: "We don't just build; we think. We align your brand's core KPIs with the platform's unique culture to ensure every pixel serves a purpose.",
      details: ["Market Analysis", "Platform Fit", "ROI Forecasting", "Community Insights"]
    },
    {
      title: "Build",
      icon: <Construction className="w-16 h-16 text-pink-500" />,
      desc: "Our world-class developers and designers create immersive experiences that users actually want to play. No 'ad-worlds', just fun.",
      details: ["Environment Design", "UGC Items", "Game Mechanics", "Live Operations"]
    },
    {
      title: "Awareness",
      icon: <Zap className="w-16 h-16 text-purple-500" />,
      desc: "A great world is nothing without citizens. We drive high-intent traffic through influencer integration and internal ad tech.",
      details: ["Influencer Marketing", "Roblox Ads", "Social Amplification", "PR & Hype"]
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal mb-24">
          <span className="text-cyan-400 font-black tracking-[0.4em] uppercase text-xs mb-4 block">WHAT WE DO</span>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8">SERVICES</h1>
          <p className="text-2xl text-gray-400 max-w-2xl font-medium">A comprehensive ecosystem for brands to thrive in the new era of spatial computing and social gaming.</p>
        </div>

        <div className="space-y-32">
          {services.map((s, i) => (
            <div key={i} className={`reveal flex flex-col ${i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-16 items-center`}>
              <div className="flex-1">
                <div className="mb-6 p-6 bg-white/5 w-fit rounded-[2rem] border border-white/10">{s.icon}</div>
                <h2 className="text-5xl font-black mb-6 tracking-tight uppercase">{s.title}</h2>
                <p className="text-xl text-gray-400 mb-8 leading-relaxed font-medium">{s.desc}</p>
                <div className="grid grid-cols-2 gap-4">
                  {s.details.map((detail, d) => (
                    <div key={d} className="flex items-center gap-2 text-sm font-black tracking-widest text-gray-300 uppercase">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 w-full aspect-video bg-[#0a0a0a] rounded-[3rem] border border-white/10 overflow-hidden relative group">
                 <div className="absolute inset-0 bg-shakuri-gradient opacity-10 group-hover:opacity-20 transition-opacity"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/10 font-black text-8xl tracking-tighter group-hover:scale-110 transition-transform">{s.title}</span>
                 </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 reveal bg-white p-16 md:p-24 rounded-[4rem] text-black text-center relative overflow-hidden">
           <div className="relative z-10">
             <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">START YOUR JOURNEY</h2>
             <button 
               onClick={() => navigate('/contact')}
               className="bg-black text-white px-12 py-6 rounded-2xl font-black text-xl hover:scale-110 transition-all uppercase tracking-[0.2em] flex items-center gap-4 mx-auto"
             >
               Book a discovery call <ArrowRight />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};
