import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface WordScreenProps {
  words: string[];
  currentIndex: number;
  buttonText: string;
  onNext: () => void;
  onBack?: () => void;
}

export const WordScreen: React.FC<WordScreenProps> = ({
  words,
  currentIndex,
  buttonText,
  onNext,
}) => {
  const currentWord = words[currentIndex] || '';
  const [animating, setAnimating] = useState(true);

  // Trigger bounce animation on word change
  useEffect(() => {
    setAnimating(false);
    const t = setTimeout(() => setAnimating(true), 20);
    return () => clearTimeout(t);
  }, [currentIndex]);

  const handleNextClick = () => {
    soundFX.playSqueak(600 + currentIndex * 60);
    onNext();
  };

  // Word specific emoji garnishes
  const wordGarnishes: Record<string, string> = {
    'Will': '✨',
    'you': '🌸',
    'be': '💫',
    'my': '🎀',
    'best': '🌟',
    'friend?': '💕',
  };

  const garnish = wordGarnishes[currentWord] || '💕';

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center justify-between min-h-[580px] sm:min-h-[640px] px-4 py-6 z-10 text-center animate-fade-in">
      {/* Progress Dots Bar */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-md">
        {words.map((w, idx) => (
          <div
            key={idx}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex
                ? 'w-7 h-2 bg-gradient-to-r from-pink-400 to-fuchsia-400 shadow-[0_0_10px_rgba(244,63,142,0.8)]'
                : idx < currentIndex
                ? 'w-2 h-2 bg-pink-400/80'
                : 'w-2 h-2 bg-white/25'
            }`}
          />
        ))}
      </div>

      {/* Large Glowing Glass Card */}
      <div className="relative w-full my-auto py-10 sm:py-14 px-6 bg-white/10 backdrop-blur-3xl border border-white/25 rounded-3xl shadow-2xl shadow-purple-950/70 flex flex-col items-center justify-center overflow-hidden">
        {/* Neon Glow backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/15 via-purple-500/10 to-transparent pointer-events-none" />

        {/* Floating Mini Garnishes */}
        <div className="absolute top-4 left-6 text-pink-300/60 text-lg animate-pulse">✨</div>
        <div className="absolute top-5 right-6 text-pink-300/60 text-lg animate-pulse delay-200">🌸</div>
        <div className="absolute bottom-4 right-8 text-pink-300/60 text-lg animate-pulse delay-500">💫</div>

        {/* Word Garnish Icon */}
        <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-2xl shadow-inner mb-4 animate-bounce">
          {garnish}
        </div>

        {/* Animated Word */}
        <div className="h-28 flex items-center justify-center">
          <span
            className={`text-5xl sm:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-pink-100 to-pink-300 drop-shadow-[0_4px_20px_rgba(244,63,142,0.7)] transition-all duration-500 transform ${
              animating
                ? 'scale-100 translate-y-0 opacity-100'
                : 'scale-75 translate-y-4 opacity-0'
            }`}
          >
            {currentWord}
          </span>
        </div>

        {/* Cute step subtitle */}
        <p className="text-xs text-pink-200/70 font-medium tracking-widest uppercase mt-2">
          Step {currentIndex + 1} of {words.length}
        </p>
      </div>

      {/* Large Bottom Action Button */}
      <div className="w-full">
        <button
          onClick={handleNextClick}
          type="button"
          className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-pink-600 hover:from-pink-400 hover:to-pink-500 text-white font-bold text-base sm:text-lg tracking-wide shadow-[0_0_25px_rgba(244,63,142,0.55)] hover:shadow-[0_0_35px_rgba(244,63,142,0.8)] border border-pink-300/40 transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center gap-2 group"
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-5 h-5 text-white/90 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
