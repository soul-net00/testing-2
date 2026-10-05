import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, AlertCircle, Heart } from 'lucide-react';
import { CharacterSVG } from './CharacterSVG';
import { computeAnimationState, AnimationFrameState } from './characterData';
import { soundFX } from '../utils/audio';

interface NoScreenProps {
  heading: string;
  subheading: string;
  reassurance: string;
  tryAgainButtonText: string;
  onTryAgain: () => void;
}

export const NoScreen: React.FC<NoScreenProps> = ({
  heading,
  subheading,
  reassurance,
  tryAgainButtonText,
  onTryAgain,
}) => {
  const [progress, setProgress] = useState(0);
  const requestRef = useRef<number | null>(null);
  const prevTimeRef = useRef<number | null>(null);

  useEffect(() => {
    soundFX.playSqueak(850);
  }, []);

  useEffect(() => {
    const loopDuration = 2.4;
    const animate = (time: number) => {
      if (prevTimeRef.current !== null) {
        const delta = (time - prevTimeRef.current) / 1000;
        setProgress((prev) => (prev + delta / loopDuration) % 1);
      }
      prevTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const currentState: AnimationFrameState = computeAnimationState(progress, 1.25);

  const handleTryAgain = () => {
    soundFX.playBubblePop();
    onTryAgain();
  };

  return (
    <div className="w-full max-w-[390px] mx-auto min-h-[100dvh] flex flex-col justify-between items-center px-4 py-6 z-10 text-center animate-fade-in select-none">
      {/* Alert Pill */}
      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-500/20 backdrop-blur-xl border border-rose-400/40 text-rose-200 text-xs font-bold shadow-md mt-2">
        <AlertCircle className="w-3.5 h-3.5 text-rose-300 animate-bounce" />
        <span>System Alert: Illegal Selection 🚫</span>
      </div>

      {/* Main Glass Card with Character */}
      <div className="relative w-full my-auto py-6 px-4 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl shadow-2xl shadow-purple-950/70 flex flex-col items-center">
        {/* Soft Red/Pink glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-rose-500/15 via-transparent to-purple-500/10 rounded-3xl pointer-events-none" />

        {/* Text Headers */}
        <div className="space-y-1 mb-2">
          <h2 className="text-3xl sm:text-4xl font-black text-rose-300 drop-shadow-[0_2px_15px_rgba(244,63,94,0.6)] animate-wiggle">
            {heading}
          </h2>
          <p className="text-lg font-bold text-white tracking-wide">
            {subheading}
          </p>
          <p className="text-sm text-pink-200/90 font-medium">
            {reassurance}
          </p>
        </div>

        {/* Character Stage: Rapid head-shaking pink cutie with bouncing ears */}
        <div className="w-64 h-64 my-1 flex items-center justify-center drop-shadow-[0_10px_25px_rgba(244,63,142,0.4)]">
          <CharacterSVG state={currentState} />
        </div>

        {/* Large Try Again Button */}
        <button
          onClick={handleTryAgain}
          type="button"
          className="w-full mt-2 py-4 px-8 rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-pink-600 hover:from-pink-400 hover:to-pink-500 text-white font-black text-lg tracking-wide shadow-[0_0_25px_rgba(244,63,142,0.6)] hover:shadow-[0_0_35px_rgba(244,63,142,0.8)] border border-pink-300/40 transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center gap-2 group"
        >
          <RotateCcw className="w-5 h-5 text-white/90 group-hover:-rotate-45 transition-transform" />
          <span>{tryAgainButtonText}</span>
          <Heart className="w-4 h-4 fill-current text-white/90" />
        </button>
      </div>

      <p className="text-[11px] text-pink-300/60 font-medium pb-2">
        Don't worry, everyone deserves a second chance! 😉
      </p>
    </div>
  );
};
