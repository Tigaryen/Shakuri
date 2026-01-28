
import React from 'react';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generate varied subtle particles
  const particles = [...Array(40)].map((_, i) => {
    const isShape = i % 4 === 0;
    const size = isShape ? Math.random() * 12 + 4 : Math.random() * 2 + 1;
    const duration = 15 + Math.random() * 25;
    const delay = Math.random() * -duration;
    const xDrift = (Math.random() - 0.5) * 400;
    const yDrift = (Math.random() - 0.5) * 400;
    const rotation = (Math.random() - 0.5) * 360;
    const maxOpacity = 0.05 + Math.random() * 0.15;
    
    return (
      <div 
        key={i}
        className={`absolute pointer-events-none animate-[drift_var(--duration)_infinite_linear] ${
          isShape ? 'border border-white/20' : 'bg-white/40 rounded-full'
        }`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${size}px`,
          height: `${size}px`,
          '--duration': `${duration}s`,
          '--x-drift': `${xDrift}px`,
          '--y-drift': `${yDrift}px`,
          '--rotation': `${rotation}deg`,
          '--max-opacity': maxOpacity,
          animationDelay: `${delay}s`,
          transform: isShape ? `rotate(${Math.random() * 360}deg)` : 'none'
        } as any}
      ></div>
    );
  });

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-32 pb-24 bg-black">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Morphing Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-[#FF8A00]/10 blur-[120px] rounded-full animate-[blob_20s_infinite_alternate] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#BD00FF]/10 blur-[120px] rounded-full animate-[blob_25s_infinite_alternate-reverse] mix-blend-screen"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#00FF94]/5 blur-[160px] rounded-full animate-[pulse_15s_infinite]"></div>

        {/* Subtle Drifting Particles & Abstract Shapes */}
        <div className="absolute inset-0">
          {particles}
        </div>
      </div>

      <div className="z-30 text-center max-w-7xl px-6 relative flex flex-col items-center w-full">
        <h1 className="text-6xl md:text-[11rem] font-black tracking-tighter leading-[0.8] mb-8">
          <span className="block opacity-90 hover:tracking-normal transition-all duration-700 cursor-default select-none">GAMING</span>
          <span className="text-gradient block hover:scale-105 hover:brightness-125 transition-all duration-500 cursor-default select-none">MATTERS</span>
        </h1>
        <p className="text-xl md:text-3xl text-gray-400 font-medium max-w-3xl mx-auto leading-tight mb-16">
          Most brands just don’t know where to start. That’s where we come in. <br className="hidden md:block" /> 
        </p>
        
        <div className="flex flex-col items-center justify-center relative">
          <button 
            onClick={() => scrollTo('contact')}
            className="group relative px-16 md:px-24 py-7 md:py-9 rounded-2xl font-black text-xl md:text-2xl transition-all duration-500 active:scale-90 hover:scale-110 hover:-translate-y-2 uppercase tracking-[0.2em] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          >
            {/* Base Background */}
            <div className="absolute inset-0 bg-white group-hover:bg-transparent transition-colors duration-500"></div>
            
            {/* Animated Conic Gradient (Border Beam Effect) */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_60%,#FF8A00,#FF00CC,#BD00FF,#00D1FF,#00FF94)] animate-[spin_4s_linear_infinite]"></div>
            </div>

            {/* Inner Mask (keeps button white/light inside) */}
            <div className="absolute inset-[2px] bg-white rounded-2xl group-hover:bg-neutral-50 transition-colors duration-500"></div>

            {/* Ambient Multi-color Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-40 blur-2xl bg-shakuri-gradient transition-opacity duration-500 pointer-events-none"></div>

            {/* Shine Sweep Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none"></div>

            <span className="relative z-10 text-black group-hover:scale-110 transition-transform duration-500 inline-block">
              Explore What's Possible
            </span>
          </button>
        </div>
      </div>

      {/* Perspective Grid with Scanning Line */}
      <div className="absolute bottom-0 w-full h-[60%] z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-20"></div>
        <div 
          className="absolute bottom-[-100px] left-[-20%] right-[-20%] h-[500px] opacity-20 z-10"
          style={{
            backgroundImage: 'linear-gradient(to right, #444 1px, transparent 1px), linear-gradient(to bottom, #444 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            transform: 'perspective(1000px) rotateX(65deg)'
          }}
        >
          {/* Scanning Line */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent h-[2px] animate-[scan_6s_linear_infinite]"></div>
        </div>
      </div>
    </section>
  );
};
