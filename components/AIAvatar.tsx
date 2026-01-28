
import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";

interface AIAvatarProps {
  prompt?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  staticImage?: string;
}

export const AIAvatar: React.FC<AIAvatarProps> = ({ prompt = '', className = '', size = 'md', staticImage }) => {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
    hero: 'w-[300px] h-[300px] md:w-[500px] md:h-[500px]'
  };

  // If a static image is provided, render it directly
  if (staticImage) {
    return (
      <div className={`${sizeClasses[size]} ${className} relative group`}>
        <div className="absolute inset-0 bg-shakuri-gradient opacity-20 group-hover:opacity-40 blur-3xl transition-opacity duration-700 rounded-full"></div>
        <div className="w-full h-full rounded-full border border-white/10 shadow-2xl relative z-10 animate-[float_6s_ease-in-out_infinite] overflow-hidden bg-black/40 backdrop-blur-sm">
          <img
            src={staticImage}
            alt="Roblox Character"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
        </div>
      </div>
    );
  }

  // Use unique key based on prompt to cache different characters
  const cacheKey = `shakuri_avatar_${btoa(prompt).substring(0, 16)}`;
  
  const [imageUrl, setImageUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem(cacheKey);
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(!imageUrl);
  const [error, setError] = useState(false);
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  const generateImage = useCallback(async () => {
    if (imageUrl) return;
    
    try {
      setLoading(true);
      setError(false);
      setQuotaExceeded(false);
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: `A high-quality 3D render of a single Roblox character, standing centrally, ${prompt}. Style: blocky but polished, modern Roblox avatar aesthetics, cinematic neon lighting, clean 3D render, dark neutral background, vibrant streetwear textures.`,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        },
      });

      const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
      
      if (imagePart?.inlineData?.data) {
        const dataUrl = `data:image/png;base64,${imagePart.inlineData.data}`;
        setImageUrl(dataUrl);
        try {
          localStorage.setItem(cacheKey, dataUrl);
        } catch (e) {
          console.warn("Local storage full, character not cached.");
        }
      } else {
        setError(true);
      }
    } catch (err: any) {
      console.error("AI Image generation failed:", err);
      if (err.message?.includes('quota') || err.message?.includes('429')) {
        setQuotaExceeded(true);
      } else {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  }, [prompt, imageUrl, cacheKey]);

  useEffect(() => {
    generateImage();
  }, [generateImage]);

  if (loading) {
    return (
      <div className={`${sizeClasses[size]} ${className} bg-white/5 rounded-full animate-pulse flex flex-col items-center justify-center border border-white/10 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-shakuri-gradient opacity-10 animate-pulse"></div>
        <div className="relative z-10 text-[8px] font-black uppercase tracking-[0.3em] text-white/40 text-center px-4">
          Rendering Character...
        </div>
      </div>
    );
  }

  if (quotaExceeded) {
    return (
      <div className={`${sizeClasses[size]} ${className} bg-black/40 rounded-full flex flex-col items-center justify-center border border-white/10 text-center px-4`}>
        <div className="w-12 h-12 bg-shakuri-gradient rounded-full blur-xl absolute opacity-20"></div>
        <span className="text-[8px] font-black uppercase tracking-widest text-cyan-400 mb-1">Quota Limited</span>
        <span className="text-[10px] text-gray-500 font-bold leading-tight">System Cooling Down...</span>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <button 
        onClick={() => { setImageUrl(null); generateImage(); }}
        className={`${sizeClasses[size]} ${className} bg-red-500/5 rounded-full flex flex-col items-center justify-center border border-red-500/20 hover:bg-red-500/10 transition-colors group`}
      >
        <span className="text-red-500 text-2xl font-black mb-1">!</span>
        <span className="text-red-400 text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Retry</span>
      </button>
    );
  }

  return (
    <div className={`${sizeClasses[size]} ${className} relative group`}>
      <div className="absolute inset-0 bg-shakuri-gradient opacity-20 group-hover:opacity-40 blur-3xl transition-opacity duration-700 rounded-full"></div>
      <div className="w-full h-full rounded-full border border-white/10 shadow-2xl relative z-10 animate-[float_6s_ease-in-out_infinite] overflow-hidden bg-black/40 backdrop-blur-sm">
        <img 
          src={imageUrl} 
          alt="AI Generated Roblox Character" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
      </div>
    </div>
  );
};
