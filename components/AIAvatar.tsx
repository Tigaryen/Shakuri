
import React from 'react';

interface AIAvatarProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  staticImage?: string;
}

export const AIAvatar: React.FC<AIAvatarProps> = ({ className = '', size = 'md', staticImage }) => {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-80 h-80',
    lg: 'w-96 h-96',
    hero: 'w-[300px] h-[300px] md:w-[500px] md:h-[500px]'
  };

  if (!staticImage) {
    return null;
  }

  return (
    <div className={`${sizeClasses[size]} ${className} relative group`}>
      <div className="absolute inset-0 bg-shakuri-gradient opacity-20 group-hover:opacity-40 blur-3xl transition-opacity duration-700 rounded-full"></div>
      <div className="w-full h-full rounded-full border border-white/10 shadow-2xl relative z-10 animate-[float_6s_ease-in-out_infinite] overflow-hidden bg-black/40 backdrop-blur-sm">
        <img
          src={staticImage}
          alt="Roblox Character"
          className="w-[140%] h-[140%] object-cover absolute top-0 left-1/2 -translate-x-1/2 transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
      </div>
    </div>
  );
};
