import React, { useMemo } from 'react';

interface HeartParticle {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  type: 'heart' | 'sparkle' | 'star';
  color: string;
}

export const FloatingHearts: React.FC = () => {
  // Generate stable random particle positions
  const particles: HeartParticle[] = useMemo(() => {
    const colors = ['#f472b6', '#fb7185', '#c084fc', '#e879f9', '#fbcfe8', '#ffffff'];
    const types: ('heart' | 'sparkle' | 'star')[] = ['heart', 'heart', 'sparkle', 'star'];

    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: `${(i * 4.5 + Math.sin(i) * 5 + 4) % 94}%`,
      size: 10 + (i % 5) * 4, // 10px to 26px
      duration: 12 + (i % 6) * 3, // 12s to 27s
      delay: (i * 0.7) % 8, // staggered starts
      opacity: 0.25 + (i % 4) * 0.15,
      type: types[i % types.length],
      color: colors[i % colors.length],
    }));
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* Dreamy Ambient Glowing Color Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-pink-600/25 blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-purple-600/30 blur-3xl" />
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 w-72 h-72 rounded-full bg-fuchsia-600/20 blur-3xl" />

      {/* Floating Particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-[-40px] animate-float-particle"
          style={{
            left: p.left,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
            fontSize: `${p.size}px`,
            color: p.color,
            filter: `drop-shadow(0 0 6px ${p.color})`,
          }}
        >
          {p.type === 'heart' ? '💕' : p.type === 'sparkle' ? '✨' : '🌸'}
        </span>
      ))}
    </div>
  );
};
