import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface HomeScreenProps {
  brand: string;
  subtitle: string;
  nickname: string;
  introQuestion: string;
  startButtonText: string;
  photos: string[];
  photoCardLabel: string;
  photoCardSubtext: string;
  onStart: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  brand,
  subtitle,
  nickname,
  introQuestion,
  startButtonText,
  photos,
  photoCardLabel,
  photoCardSubtext,
  onStart,
}) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Automatically cycle photos with smooth crossfade
  useEffect(() => {
    if (photos.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <div className="w-full max-w-[390px] mx-auto min-h-[100dvh] flex flex-col justify-between items-center px-4 py-5 z-10 text-center animate-fade-in select-none">
      {/* Top Header Branding */}
      <div className="flex flex-col items-center pt-2 space-y-1">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-pink-300 text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(244,63,142,0.35)]">
          <Heart className="w-3 h-3 text-pink-400 fill-current animate-pulse" />
          <span>{brand}</span>
          <Heart className="w-3 h-3 text-pink-400 fill-current animate-pulse" />
        </div>
        <p className="text-xs sm:text-sm text-pink-200/90 font-medium tracking-wide">
          {subtitle}
        </p>
      </div>

      {/* Main Glassmorphism Photo Memory Card */}
      <div className="w-full relative my-auto py-2">
        {/* Ambient Neon Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-600 to-fuchsia-500 rounded-[2.2rem] blur-xl opacity-60 animate-pulse pointer-events-none" />

        <div className="relative bg-white/10 backdrop-blur-2xl border border-white/25 rounded-[2rem] p-3.5 shadow-2xl shadow-purple-950/70 overflow-hidden flex flex-col items-center">
          {/* Top Memory Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/80 backdrop-blur-md border border-white/30 text-[10px] font-bold tracking-wider uppercase text-white shadow-md mb-2.5">
            <Sparkles className="w-3 h-3 text-yellow-200 animate-spin duration-3000" />
            <span>{photoCardLabel}</span>
          </div>

          {/* Crossfading Photo Frame */}
          <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/20 bg-purple-950/80 shadow-inner">
            {photos.map((src, idx) => (
              <img
                key={src}
                src={src}
                alt="Bestie Memory"
                referrerPolicy="no-referrer"
                className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 transform ${
                  idx === currentPhotoIndex
                    ? 'opacity-100 scale-105'
                    : 'opacity-0 scale-100'
                }`}
              />
            ))}
          </div>

          {/* Under picture caption */}
          <p className="text-pink-100 text-xs font-semibold tracking-wide mt-2.5">
            {photoCardSubtext}
          </p>

          {/* Photo Dots Indicator */}
          <div className="flex items-center gap-1.5 mt-2">
            {photos.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === currentPhotoIndex
                    ? 'w-5 bg-pink-400 shadow-[0_0_8px_rgba(244,63,142,0.8)]'
                    : 'w-1.5 bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Under Card Greeting & Action */}
      <div className="w-full flex flex-col items-center space-y-3 pb-4">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-white to-purple-200 drop-shadow-[0_2px_12px_rgba(244,63,142,0.5)]">
            Hi {nickname} 🤍
          </h2>
          <p className="text-sm sm:text-base text-pink-200/90 font-medium">
            {introQuestion}
          </p>
        </div>

        {/* Large Glowing Start Button */}
        <button
          onClick={onStart}
          type="button"
          className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-pink-600 hover:from-pink-400 hover:to-pink-500 text-white font-extrabold text-lg tracking-wide shadow-[0_0_30px_rgba(244,63,142,0.7)] hover:shadow-[0_0_40px_rgba(244,63,142,0.9)] border border-pink-300/50 transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center gap-2 group"
        >
          <span>{startButtonText}</span>
          <Heart className="w-5 h-5 fill-current group-hover:scale-125 transition-transform" />
        </button>
      </div>
    </div>
  );
};
