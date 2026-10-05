import React from 'react';
import { Heart } from 'lucide-react';

interface HomeScreenProps {
  brand: string;
  subtitle: string;
  nickname: string;
  startButtonText: string;
  onStart: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  brand,
  subtitle,
  nickname,
  startButtonText,
  onStart,
}) => {
  return (
    <div className="w-full max-w-[390px] mx-auto min-h-[100dvh] flex flex-col justify-between items-center px-4 py-5 z-10 text-center animate-fade-in select-none">
      {/* Top Header Branding */}
      <div className="flex flex-col items-center pt-2 space-y-1">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-pink-300 text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(244,63,142,0.35)]">
          <Heart className="w-3 h-3 text-pink-400 fill-current" />
          <span>{brand}</span>
          <Heart className="w-3 h-3 text-pink-400 fill-current" />
        </div>
        <p className="text-xs sm:text-sm text-pink-200/90 font-medium tracking-wide">
          {subtitle}
        </p>
      </div>

      {/* Friendship illustration; personal photos appear later in the memories. */}
      <div className="w-full relative my-auto py-6 flex flex-col items-center">
        <div aria-hidden="true" className="absolute inset-x-8 top-12 bottom-12 rounded-full bg-gradient-to-br from-emerald-300/15 to-sky-300/20 blur-3xl pointer-events-none" />
        <img
          src="/assets/friendship-icon.png"
          alt="A mint green heart and a light blue heart hugging"
          width={1280}
          height={1280}
          fetchPriority="high"
          className="relative w-full h-[min(46dvh,390px)] object-contain drop-shadow-[0_12px_30px_rgba(125,211,252,0.15)]"
        />
        <p className="relative mt-3 text-xs tracking-[0.2em] uppercase font-semibold text-sky-100/90">A little friendship magic ✨</p>
      </div>
      {/* Under Card Greeting & Action */}
      <div className="w-full flex flex-col items-center space-y-3 pb-4">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-white to-purple-200 drop-shadow-[0_2px_12px_rgba(244,63,142,0.5)]">
            Hi {nickname} 🤍
          </h2>
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
