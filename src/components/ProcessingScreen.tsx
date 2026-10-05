import React, { useState, useEffect } from 'react';
import { Check, Sparkles, Heart, Loader2 } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface ProcessingScreenProps {
  heading: string;
  durationMs?: number;
  steps: string[];
  onComplete: () => void;
}

export const ProcessingScreen: React.FC<ProcessingScreenProps> = ({
  heading,
  durationMs = 4500,
  steps,
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    let animationFrameId: number;

    const update = (now: number) => {
      const elapsed = now - startTime;
      const currentPct = Math.min(100, Math.floor((elapsed / durationMs) * 100));
      setProgress(currentPct);

      const stepIdx = Math.min(
        steps.length - 1,
        Math.floor((currentPct / 100) * steps.length)
      );

      if (stepIdx !== activeStepIndex) {
        soundFX.playSparkle();
        setActiveStepIndex(stepIdx);
      }

      if (elapsed < durationMs) {
        animationFrameId = requestAnimationFrame(update);
      } else {
        setProgress(100);
        setTimeout(() => {
          onComplete();
        }, 350);
      }
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [durationMs, steps.length, onComplete, activeStepIndex]);

  return (
    <div className="w-full max-w-[390px] mx-auto min-h-[100dvh] flex flex-col justify-between items-center px-4 py-6 z-10 text-center animate-fade-in select-none">
      {/* Top Pill */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 backdrop-blur-xl border border-pink-400/40 text-pink-200 text-xs font-semibold shadow-md mt-2">
        <Loader2 className="w-3.5 h-3.5 text-pink-300 animate-spin" />
        <span>Synchronizing Heartwaves</span>
        <Sparkles className="w-3 h-3 text-yellow-300" />
      </div>

      {/* Main Glassmorphism Card */}
      <div className="relative w-full my-auto py-8 px-5 bg-white/10 backdrop-blur-3xl border border-white/25 rounded-3xl shadow-2xl shadow-purple-950/70 flex flex-col items-center">
        {/* Soft Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/15 via-purple-500/10 to-transparent pointer-events-none rounded-3xl" />

        {/* Pulsing Central Heart Icon */}
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(244,63,142,0.6)] mb-6 animate-pulse">
          <Heart className="w-10 h-10 text-white fill-current animate-bounce" />
          <div className="absolute -inset-2 rounded-full border border-pink-400/50 animate-ping duration-1500" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-white to-purple-200 tracking-tight mb-5 drop-shadow-md">
          {heading}
        </h2>

        {/* Progress Bar Container */}
        <div className="w-full space-y-2 mb-6">
          <div className="flex justify-between items-center text-xs font-bold text-pink-200 px-1">
            <span>Vibe Compatibility</span>
            <span className="font-mono text-pink-300 text-sm">{progress}%</span>
          </div>

          <div className="w-full h-4 bg-black/40 rounded-full p-0.5 backdrop-blur-md border border-white/20 overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-pink-300 shadow-[0_0_15px_rgba(244,63,142,0.9)] transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps List with Checkmarks */}
        <div className="w-full space-y-2.5 text-left">
          {steps.map((step, idx) => {
            const isCompleted = progress >= ((idx + 1) / steps.length) * 100;
            const isCurrent =
              progress >= (idx / steps.length) * 100 &&
              progress < ((idx + 1) / steps.length) * 100;

            return (
              <div
                key={idx}
                className={`flex items-center gap-3 p-2.5 rounded-2xl border transition-all duration-300 ${
                  isCompleted
                    ? 'bg-pink-500/20 border-pink-400/40 text-pink-100 shadow-sm'
                    : isCurrent
                    ? 'bg-white/15 border-white/30 text-white shadow-md scale-[1.02]'
                    : 'bg-black/20 border-white/10 text-white/35'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-all ${
                    isCompleted
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-black shadow-[0_0_8px_rgba(52,211,153,0.8)]'
                      : isCurrent
                      ? 'bg-pink-500 text-white animate-spin'
                      : 'bg-white/10 text-white/40'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : isCurrent ? (
                    <Sparkles className="w-3 h-3" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                <span className="text-xs font-semibold tracking-wide flex-1">
                  {isCompleted && '✓ '}{step}
                </span>

                {isCompleted && (
                  <Heart className="w-3.5 h-3.5 text-pink-400 fill-current animate-pulse shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-[11px] text-pink-300/60 font-medium pb-2">
        Calibrating lifelong memories &amp; laughs... 👭✨
      </p>
    </div>
  );
};
