import React, { useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/audio';

interface SuccessScreenProps {
  title: string;
  message: string;
  tagline: string;
  promptText: string;
  onProceedToMemories: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  title,
  message,
  tagline,
  promptText,
  onProceedToMemories,
}) => {
  useEffect(() => {
    soundFX.playSparkle();

    const fire = () => {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#ec4899', '#c084fc', '#fb7185', '#ffd700'],
      });
    };

    fire();
    const t1 = setTimeout(fire, 600);

    // Automatically transition to the memory experience after ~3.2s
    const t2 = setTimeout(() => {
      onProceedToMemories();
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onProceedToMemories]);

  return (
    <div className="w-full max-w-[390px] mx-auto min-h-[100dvh] flex flex-col justify-between items-center px-4 py-8 z-10 text-center animate-fade-in select-none">
      {/* Top Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/25 backdrop-blur-xl border border-pink-400/50 text-pink-200 text-xs font-bold shadow-lg shadow-pink-950/40 mt-3">
        <Sparkles className="w-4 h-4 text-yellow-300 animate-spin duration-3000" />
        <span>Official Verification: 100%</span>
        <Heart className="w-3.5 h-3.5 text-pink-400 fill-current animate-bounce" />
      </div>

      {/* Main Glassmorphic Card */}
      <div className="w-full bg-white/10 backdrop-blur-2xl border border-white/25 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/70 my-auto flex flex-col items-center gap-5">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-pink-500 via-fuchsia-500 to-purple-600 flex items-center justify-center text-4xl shadow-[0_0_35px_rgba(244,63,142,0.8)] animate-bounce">
          👯‍♀️
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-white to-purple-200 tracking-tight drop-shadow-[0_2px_15px_rgba(244,63,142,0.8)] animate-pulse">
            {title}
          </h2>
          <p className="text-base font-bold text-pink-100">
            {message}
          </p>
          <p className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-fuchsia-200 to-purple-300">
            {tagline}
          </p>
        </div>

        {/* Look at us teaser button / prompt */}
        <button
          onClick={onProceedToMemories}
          type="button"
          className="mt-2 py-3 px-6 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white font-bold text-sm tracking-wide shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2 animate-bounce"
        >
          <span>{promptText}</span>
          <Heart className="w-4 h-4 text-pink-400 fill-current" />
        </button>
      </div>

      <p className="text-xs text-pink-300/70 font-semibold tracking-wider uppercase pb-2">
        Beginning Memory Slideshow ✨
      </p>
    </div>
  );
};
