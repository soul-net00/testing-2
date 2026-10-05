import React, { useEffect, useState } from 'react';
import { Heart, RotateCcw, Share2, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/audio';

interface FinalScreenProps {
  finalPhoto: string;
  title: string;
  subtitle: string;
  message: string;
  submessage: string;
  replayText: string;
  nickname: string;
  onReplay: () => void;
}

export const FinalScreen: React.FC<FinalScreenProps> = ({
  finalPhoto,
  title,
  subtitle,
  message,
  submessage,
  replayText,
  nickname,
  onReplay,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    soundFX.playSparkle();
    confetti({
      particleCount: 100,
      spread: 85,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#ec4899', '#c084fc', '#fb7185', '#ffd700'],
    });
  }, []);

  const handleShare = async () => {
    soundFX.playBubblePop();
    const shareData = {
      title: 'BESTIE 💕 — Friendship Activated!',
      text: `${nickname} and I are officially best friends forever! 🫶💕`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // clipboard fallback
      }
    }
  };

  const handleReplay = () => {
    soundFX.playBubblePop();
    onReplay();
  };

  return (
    <div className="w-full max-w-[390px] mx-auto min-h-[100dvh] flex flex-col justify-between items-center px-4 py-6 z-10 text-center animate-fade-in select-none">
      {/* Top Banner */}
      <div className="flex flex-col items-center pt-2 space-y-1">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pink-500/25 backdrop-blur-xl border border-pink-400/50 text-pink-200 text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(244,63,142,0.4)]">
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-current animate-bounce" />
          <span>{title}</span>
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-current animate-bounce" />
        </div>
        <p className="text-xs text-pink-300 font-semibold tracking-wide">
          {subtitle}
        </p>
      </div>

      {/* Main Glass Memory Frame with Final Strongest Photo */}
      <div className="w-full my-auto flex flex-col items-center">
        <div className="w-full relative">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-600 rounded-[2.2rem] blur-xl opacity-75 animate-pulse pointer-events-none" />

          <div className="relative bg-white/15 backdrop-blur-2xl border-2 border-white/35 rounded-[2rem] p-3.5 shadow-2xl shadow-purple-950/80 flex flex-col items-center">
            <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-white/25 bg-purple-950 shadow-inner">
              <img
                src={finalPhoto}
                alt="Best Friends Forever"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold shadow-md border border-white/30 whitespace-nowrap">
                {nickname} &amp; Me 🫶
              </div>
            </div>

            <div className="pt-3 pb-1 space-y-1">
              <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-white to-purple-200">
                {message}
              </h3>
              <p className="text-xs text-pink-200/90 font-medium px-2 leading-relaxed">
                {submessage}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-2.5 pb-4">
        {/* Share Button */}
        <button
          onClick={handleShare}
          type="button"
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-pink-600 hover:from-pink-400 hover:to-pink-500 text-white font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(244,63,142,0.6)] border border-pink-300/40 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Link Copied! Send to {nickname} 💕</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" />
              <span>Share this moment 💕</span>
            </>
          )}
        </button>

        {/* Replay Button */}
        <button
          onClick={handleReplay}
          type="button"
          className="w-full py-3 px-6 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white/90 font-semibold text-xs tracking-wider uppercase transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{replayText}</span>
        </button>
      </div>
    </div>
  );
};
