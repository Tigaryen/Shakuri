
import React, { useEffect, useRef, useState } from 'react';
import { Logo } from './Logo';

const SPOTLIGHT_SIZE = 800; // ~400px radius

export const BrandAnimation: React.FC = () => {
  // Pointer-driven effect only: off for touch and for reduced-motion users.
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(finePointer && !reducedMotion);

    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  // One state update per animation frame rather than one per mouse event.
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!enabled || frame.current !== null) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      setPosition({ x, y });
    });
  };

  return (
    <section
      className="py-32 bg-black overflow-hidden relative border-y border-white/5"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => enabled && setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <Logo className="w-[800px] h-[800px]" />
      </div>

      {/* Cursor spotlight: above the background logo, below the wordmark */}
      {enabled && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute top-0 left-0 z-[5] rounded-full bg-shakuri-gradient blur-3xl transition-opacity duration-300 ${
            visible ? 'opacity-20' : 'opacity-0'
          }`}
          style={{
            width: SPOTLIGHT_SIZE,
            height: SPOTLIGHT_SIZE,
            transform: `translate3d(${position.x - SPOTLIGHT_SIZE / 2}px, ${
              position.y - SPOTLIGHT_SIZE / 2
            }px, 0)`,
          }}
        ></div>
      )}

      <div className="relative z-10">
        <div className="flex animate-scroll whitespace-nowrap gap-12">
          {Array(10).fill(0).map((_, i) => (
            <div key={i} className="flex items-center gap-8">
              <span className="text-8xl md:text-[12rem] font-black text-transparent outline-text tracking-tighter" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.35)' }}>SHAKURI</span>
              <Logo className="w-24 h-24" />
            </div>
          ))}
        </div>
        <div className="flex animate-scroll whitespace-nowrap gap-12 mt-8 flex-row-reverse" style={{ animationDirection: 'reverse' }}>
          {Array(10).fill(0).map((_, i) => (
            <div key={i} className="flex items-center gap-8">
              <span className="text-8xl md:text-[12rem] font-black text-transparent outline-text tracking-tighter" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.35)' }}>STUDIOS</span>
              <Logo className="w-24 h-24" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
