
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

export const BrandHeroVisual: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem('shakuri_hero_visual_v30');
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(!imageUrl);
  const [quotaHit, setQuotaHit] = useState(false);

  useEffect(() => {
    if (imageUrl) return;

    const generateHero = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = "A cinematic, ultra-high-definition 3D render of a massive frosted-glass brand emblem floating in a digital void. The emblem is a rounded square with depth and refraction. Inside the glass, a glowing 'S' shape pulses with a vibrant rainbow gradient (pink, orange, teal). A sharp, brilliant white lightning bolt is etched into the center. Volumetric lighting, drifting data embers, and reflections on a dark mirrored floor create a futuristic atmosphere. 8k, masterpiece quality.";
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: prompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: "16:9"
            }
          },
        });

        const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
        if (imagePart?.inlineData?.data) {
          const url = `data:image/png;base64,${imagePart.inlineData.data}`;
          setImageUrl(url);
          try {
            localStorage.setItem('shakuri_hero_visual_v30', url);
          } catch (e) {
            console.warn("Storage full.");
          }
        }
      } catch (err: any) {
        console.error("Hero visual generation failed:", err);
        if (err.message?.includes('429') || err.message?.includes('quota')) {
          setQuotaHit(true);
        }
      } finally {
        setLoading(false);
      }
    };

    generateHero();
  }, [imageUrl]);

  return (
    <div className="w-full max-w-5xl aspect-video rounded-[3rem] overflow-hidden relative glass border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] transition-all duration-1000 group">
      {loading ? (
        <div className="absolute inset-0 bg-white/5 flex flex-col items-center justify-center gap-4">
          <div className="w-24 h-24 bg-shakuri-gradient rounded-full blur-3xl animate-pulse opacity-50"></div>
          <span className="text-xs font-black tracking-[0.4em] text-white/40 uppercase">Generating Brand Universe...</span>
        </div>
      ) : quotaHit ? (
        <div className="absolute inset-0 bg-neutral-900 flex flex-col items-center justify-center text-center p-12">
          <div className="absolute inset-0 bg-shakuri-gradient opacity-10 blur-3xl"></div>
          <h4 className="text-2xl font-black text-white/60 uppercase tracking-tighter mb-4">Rendering System Recalibrating</h4>
          <p className="text-gray-500 font-medium max-w-md">Our high-fidelity brand visual generator has reached its capacity. Please return in a few moments to see the full experience.</p>
        </div>
      ) : (
        <>
          <img 
            src={imageUrl || ''} 
            alt="Shakuri Brand Visual" 
            className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[2000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 pointer-events-none"></div>
          <div className="absolute inset-0 bg-shakuri-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>
        </>
      )}
    </div>
  );
};
