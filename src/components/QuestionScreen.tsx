import React, { useState } from 'react';
import { Heart, Sparkles, Frown } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface QuestionScreenProps {
  prefixText: string;
  mainText: string;
  yesButtonText: string;
  noButtonText: string;
  hasAttemptedNo: boolean;
  onYes: () => void;
  onNo: () => void;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  prefixText,
  mainText,
  yesButtonText,
  noButtonText,
  hasAttemptedNo,
  onYes,
  onNo,
}) => {
  const [noOffset, setNoOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [noHoverCount, setNoHoverCount] = useState<number>(0);

  const handleNoDodge = () => {
    if (hasAttemptedNo) {
      soundFX.playSqueak(760);
      const nextCount = noHoverCount + 1;
      setNoHoverCount(nextCount);
      const offsets = [
        { x: -30, y: -12 },
        { x: 32, y: 14 },
        { x: -24, y: 16 },
        { x: 26, y: -14 },
      ];
      setNoOffset(offsets[nextCount % offsets.length]);
    }
  };

  const handleYes = () => {
    soundFX.playBubblePop();
    onYes();
  };

  const handleNo = () => {
    soundFX.playSqueak(460);
    onNo();
  };

  return (
    <div className="w-full max-w-[390px] mx-auto min-h-[100dvh] flex flex-col justify-between items-center px-4 py-6 z-10 text-center animate-fade-in select-none">
      {/* Top Badge */}
      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-pink-300 text-xs font-semibold shadow-md mt-2">
        <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin duration-3000" />
        <span>The Moment of Truth</span>
        <Heart className="w-3 h-3 text-pink-400 fill-current animate-pulse" />
      </div>

      {/* Main Glass Card */}
      <div className="relative w-full my-auto py-10 px-6 bg-white/10 backdrop-blur-3xl border border-white/25 rounded-3xl shadow-2xl shadow-purple-950/70 flex flex-col items-center">
        {/* Soft Ambient Inner Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/15 via-purple-500/10 to-transparent pointer-events-none rounded-3xl" />

        {/* Floating Crown Emoji */}
        <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-3xl shadow-lg mb-5 animate-bounce">
          👑
        </div>

        {/* Text Section */}
        <div className="space-y-2 mb-8">
          <p className="text-pink-300 font-bold text-lg sm:text-xl tracking-wide">
            {prefixText}
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-white to-purple-200 tracking-tight leading-tight drop-shadow-[0_2px_15px_rgba(244,63,142,0.6)]">
            {mainText}
          </h2>
          <div className="text-lg">💕💕</div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-3.5 relative">
          {/* YES Button (Bright Primary Pink Neon) */}
          <button
            onClick={handleYes}
            type="button"
            className="w-full py-4 px-6 rounded-2xl font-black text-xl tracking-wide text-white bg-gradient-to-r from-pink-500 via-fuchsia-500 to-pink-600 hover:from-pink-400 hover:to-pink-500 shadow-[0_0_35px_rgba(244,63,142,0.85)] border border-pink-300/60 transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] animate-pulse"
          >
            <Heart className="w-5 h-5 fill-current" />
            <span>{yesButtonText}</span>
            <Sparkles className="w-5 h-5 text-yellow-200" />
          </button>

          {/* NO Button (Darker Purple Secondary) */}
          <div
            className="w-full transition-transform duration-200"
            style={{
              transform: `translate(${noOffset.x}px, ${noOffset.y}px)`,
            }}
            onMouseEnter={handleNoDodge}
            onTouchStart={handleNoDodge}
          >
            <button
              onClick={handleNo}
              type="button"
              className="w-full py-3.5 px-6 rounded-2xl bg-purple-950/80 hover:bg-purple-900/90 backdrop-blur-md border border-purple-500/40 text-purple-200/90 font-bold text-base tracking-wide shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <Frown className="w-4 h-4 text-purple-300" />
              <span>{noButtonText}</span>
            </button>
          </div>

          {hasAttemptedNo && (
            <p className="text-[11px] text-pink-300/80 italic mt-1 animate-fade-in">
              Hint: Besties only have one correct button 😉💕
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <p className="text-[11px] text-pink-300/60 font-medium pb-2">
        Choose with all your heart 💖
      </p>
    </div>
  );
};
