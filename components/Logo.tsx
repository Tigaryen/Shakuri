
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface LogoProps {
  className?: string;
}

/**
 * BRAND LOGO SPECIFICATION (v30):
 * Inspired by high-fidelity tech glassmorphism icons.
 * 
 * DESIGN DETAILS:
 * - Rounded square base with a frosted glass / acrylic effect.
 * - Central stylized 'S' shape filled with a vibrant, glowing rainbow gradient.
 * - Gradient transitions: Neon Pink -> Bright Orange -> Yellow -> Lime Green -> Electric Cyan.
 * - A razor-sharp, solid white lightning bolt is perfectly centered on the 'S'.
 * - Depth effects: Inner glows, soft drop shadows, and high-quality refraction.
 * - NO WORDS, NO TEXT, NO LETTERS other than the 'S' shape.
 * - Model: gemini-2.5-flash-image (Nano Banana).
 */
const BRAND_LOGO_PROMPT = `A high-fidelity, professional tech studio emblem. 
The logo is strictly a graphical emblem in a "glassmorphism" style. 
The shape is a rounded square with a frosted glass texture and subtle inner-glow edges. 
Centrally featured is a bold, stylized 'S' shape filled with a vibrant, luminous rainbow gradient transitioning from neon pink to orange to yellow to cyan. 
A crisp, solid white lightning bolt is vertically centered within the 'S'. 
The lighting is cinematic and clean, suggesting a premium software or gaming brand. 
NO WORDS, NO TEXT. The entire emblem is centered on a solid black background.`;

export const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(() => {
    try {
      // Key updated to v30 to refresh the brand visual style
      return localStorage.getItem('shakuri_brand_emblem_v30');
    } catch {
      return null;
    }
  });
  const [isGenerating, setIsGenerating] = useState(!logoUrl);

  useEffect(() => {
    if (logoUrl) return;

    const generateBrandLogo = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image', // Nano Banana
          contents: {
            parts: [{ text: BRAND_LOGO_PROMPT }],
          },
          config: {
            imageConfig: {
              aspectRatio: "1:1"
            }
          },
        });

        const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
        if (part?.inlineData?.data) {
          const base64 = `data:image/png;base64,${part.inlineData.data}`;
          setLogoUrl(base64);
          try {
            localStorage.setItem('shakuri_brand_emblem_v30', base64);
          } catch (e) {
            console.warn("Storage full, could not cache logo.");
          }
        }
      } catch (err: any) {
        console.error("AI Logo generation failed:", err);
        if (err.message?.includes('429')) {
          setLogoUrl(null);
        }
      } finally {
        setIsGenerating(false);
      }
    };

    generateBrandLogo();
  }, [logoUrl]);

  if (isGenerating) {
    return (
      <div className={`${className} bg-shakuri-gradient rounded-xl animate-pulse flex items-center justify-center border border-white/10 overflow-hidden`}>
        <div className="w-full h-full bg-black/40 backdrop-blur-md flex items-center justify-center">
          <div className="w-2 h-2 bg-white/40 rounded-full animate-ping"></div>
        </div>
      </div>
    );
  }

  // Robust CSS Fallback
  if (!logoUrl) {
    return (
      <div className={`${className} bg-shakuri-gradient rounded-xl flex items-center justify-center font-black text-white text-xl border border-white/20 shadow-lg relative overflow-hidden group`}>
        <span className="relative z-10 drop-shadow-md">S</span>
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
      </div>
    );
  }

  return (
    <div className={`${className} relative overflow-hidden flex items-center justify-center`}>
      <img 
        src={logoUrl} 
        alt="Brand Emblem" 
        className="w-full h-full object-contain transition-all duration-700 select-none pointer-events-none"
      />
    </div>
  );
};
