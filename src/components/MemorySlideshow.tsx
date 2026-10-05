import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface MemorySlideshowProps {
  photos: string[];
  messages: string[];
  onFinish: () => void;
}

export const MemorySlideshow: React.FC<MemorySlideshowProps> = ({
  photos,
  messages,
  onFinish,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(true);

  // Each photo + message pair is shown for 3.2 seconds
  useEffect(() => {
    soundFX.playSparkle();
    setAnimating(true);

    const interval = setTimeout(() => {
      setAnimating(false);
      setTimeout(() => {
        if (currentIndex < photos.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          onFinish();
        }
      }, 350); // slight fade transition delay
    }, 3200);

    return () => clearTimeout(interval);
  }, [currentIndex, photos.length, onFinish]);

  const currentPhoto = photos[currentIndex] || photos[0];
  const currentMessage = messages[currentIndex % messages.length];
  const isEven = currentIndex % 2 === 0;

  return (
    <div className="w-full max-w-[390px] mx-auto min-h-[100dvh] flex flex-col justify-between items-center px-4 py-5 z-10 text-center animate-fade-in select-none">
      {/* Top Memory Counter Bar */}
      <div className="flex items-center gap-2 pt-2">
        {photos.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === currentIndex
                ? 'w-7 bg-pink-400 shadow-[0_0_8px_rgba(244,63,142,0.8)]'
                : i < currentIndex
                ? 'w-2 bg-pink-400/80'
                : 'w-2 bg-white/25'
            }`}
          />
        ))}
      </div>

      {/* Main Memory Display (Alternating Full Photograph & Glass Photo Card) */}
      <div className="w-full my-auto flex flex-col items-center">
        <div
          className={`w-full relative transition-all duration-700 transform ${
            animating
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-2'
          }`}
        >
          {/* Ambient Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-600 rounded-[2.2rem] blur-xl opacity-70 animate-pulse pointer-events-none" />

          {/* Container: Alternating Glass Card vs Bordered Frame */}
          <div
            className={`relative rounded-[2rem] overflow-hidden shadow-2xl shadow-purple-950/80 ${
              isEven
                ? 'bg-white/15 backdrop-blur-2xl border-2 border-white/30 p-3 sm:p-3.5'
                : 'bg-black/40 border-2 border-pink-400/40 p-2 sm:p-2.5'
            }`}
          >
            {/* Memory Image with Ken Burns slow zoom */}
            <div className="relative w-full h-[380px] sm:h-[440px] rounded-2xl overflow-hidden bg-purple-950">
              <img
                src={currentPhoto}
                alt="Friendship Memory"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-3500 ease-out transform scale-105 hover:scale-110"
              />

              {/* Heart Badge Overlay */}
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-pink-600/85 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-yellow-200" />
                <span>Memory {currentIndex + 1}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Emotional Message Below Photo */}
        <div className="h-16 flex items-center justify-center mt-5 px-3">
          <p
            className={`text-lg sm:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-white to-purple-200 tracking-tight drop-shadow-[0_2px_12px_rgba(244,63,142,0.7)] transition-all duration-500 ${
              animating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            “{currentMessage}”
          </p>
        </div>
      </div>

      {/* Footer Progress Text */}
      <p className="text-[11px] text-pink-300/60 font-semibold tracking-wider uppercase pb-3">
        Cherishing every moment together 🫶✨
      </p>
    </div>
  );
};
