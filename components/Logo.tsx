
import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`${className} relative overflow-hidden flex items-center justify-center`}>
      <img
        src="/shakuri_logo.png"
        alt="Shakuri Studios Logo"
        className="w-full h-full object-contain transition-all duration-700 select-none pointer-events-none"
      />
    </div>
  );
};
