import React, { useEffect, useState } from 'react';

interface MemorySlideshowProps {
  photos: string[];
  messages: string[];
  onFinish: () => void;
}

export const MemorySlideshow: React.FC<MemorySlideshowProps> = ({ photos, messages, onFinish }) => {
  const [index, setIndex] = useState(0);
  // Interleave every message with the original photos, then finish on the portrait.
  const slides: Array<{ photo?: string; message?: string }> = [];
  photos.forEach((photo, i) => {
    slides.push({ photo });
    if (messages[i]) slides.push({ message: messages[i] });
  });
  messages.slice(photos.length).forEach(message => slides.push({ message }));
  if (photos[0]) slides.push({ photo: photos[0] });

  useEffect(() => {
    const nextPhoto = slides.slice(index + 1).find(slide => slide.photo)?.photo;
    if (nextPhoto) { const image = new Image(); image.src = nextPhoto; }
    const timer = setTimeout(() => {
      if (index < slides.length - 1) setIndex(index + 1);
      else onFinish();
    }, slides[index]?.photo ? 3200 : 2200);
    return () => clearTimeout(timer);
  }, [index, photos, messages, onFinish]);

  return (
    <div className="memory-screen w-full max-w-[430px] min-h-[100dvh] px-4 py-6 flex flex-col items-center justify-between z-10 text-center">
      <p className="text-xs tracking-[0.2em] uppercase text-pink-200">Our little forever 💕</p>
      <div className="memory-stage w-full relative my-6" aria-live="polite">
        {slides.map((slide, i) => (
          <div key={i} aria-hidden={i !== index} className={`memory-layer ${i === index ? 'is-active' : ''} ${i % 4 === 0 ? 'glass-memory' : ''}`}>
            {slide.photo ? (
              <div className="memory-photo-wrap"><img src={slide.photo} alt={`Friendship memory ${photos.indexOf(slide.photo) + 1}`} className={i === index ? 'memory-photo gently-moving' : 'memory-photo'} /></div>
            ) : (
              <div className="memory-message"><span aria-hidden="true">✧</span><p>{slide.message}</p><span aria-hidden="true">💕</span></div>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-1.5" aria-label={`Memory sequence ${index + 1} of ${slides.length}`}>
        {slides.map((_, i) => <span key={i} className={`h-1 rounded-full transition-all ${i === index ? 'w-5 bg-pink-300' : 'w-2 bg-white/25'}`} />)}
      </div>
    </div>
  );
};
