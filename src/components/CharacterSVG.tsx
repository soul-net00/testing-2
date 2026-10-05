import React from 'react';
import { AnimationFrameState } from './characterData';

interface CharacterSVGProps {
  state: AnimationFrameState;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const CharacterSVG: React.FC<CharacterSVGProps> = ({
  state,
  className = '',
  width = '100%',
  height = '100%',
}) => {
  const {
    headShakeX,
    headShakeAngle,
    squashX,
    squashY,
    bodyY,
    leftEarAngle,
    leftEarScaleY,
    rightEarAngle,
    rightEarScaleY,
    bowJiggle,
    pawsY,
    pawsTilt,
    eyebrowOffset,
    cheeksPulse,
    bubbleY,
    bubbleScale,
    bubbleAngle,
    shakeLineOpacity,
    shakeLineOffset,
    heartWobble1,
    heartWobble2,
    heartWobble3,
  } = state;

  return (
    <svg
      viewBox="0 0 600 600"
      width={width}
      height={height}
      className={`overflow-visible select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Soft Drop Shadow Filter for Character & Bubble */}
        <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#8B3278" floodOpacity="0.16" />
        </filter>

        {/* Bubble Drop Shadow */}
        <filter id="bubble-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#7A1869" floodOpacity="0.22" />
        </filter>

        {/* Glow for Sparkles */}
        <filter id="sparkle-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Speech Bubble Fill Gradient */}
        <radialGradient id="cloud-fill" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="65%" stopColor="#FFF4FC" />
          <stop offset="100%" stopColor="#FCE2F5" />
        </radialGradient>

        {/* 3D Bubble Text Gradient (Vertical: candy pink to rich fuchsia) */}
        <linearGradient id="bubble-text-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFA6E3" />
          <stop offset="25%" stopColor="#FF77CC" />
          <stop offset="70%" stopColor="#D933A9" />
          <stop offset="100%" stopColor="#9E1985" />
        </linearGradient>

        {/* Body Fur Base Radial Gradient */}
        <radialGradient id="fur-ambient" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#FFF6FA" />
          <stop offset="85%" stopColor="#FDE1F0" />
          <stop offset="100%" stopColor="#F2D2F5" />
        </radialGradient>

        {/* Cheek Blush Radial Gradient */}
        <radialGradient id="blush-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF7BA3" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#FF8CB0" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FFA4C0" stopOpacity="0" />
        </radialGradient>

        {/* Left Ear Gradient (fades to lavender at tip) */}
        <linearGradient id="ear-left-grad" x1="0.7" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor="#FFF9FC" />
          <stop offset="45%" stopColor="#FDE3F1" />
          <stop offset="80%" stopColor="#DCA8F4" />
          <stop offset="100%" stopColor="#B37CE3" />
        </linearGradient>

        {/* Right Ear Gradient (fades to lavender at tip) */}
        <linearGradient id="ear-right-grad" x1="0.3" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#FFF9FC" />
          <stop offset="45%" stopColor="#FDE3F1" />
          <stop offset="80%" stopColor="#DCA8F4" />
          <stop offset="100%" stopColor="#B37CE3" />
        </linearGradient>

        {/* Bow Satin Gradient */}
        <linearGradient id="bow-satin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFBCE0" />
          <stop offset="40%" stopColor="#FF88BD" />
          <stop offset="85%" stopColor="#EE5699" />
          <stop offset="100%" stopColor="#C93577" />
        </linearGradient>

        {/* Bow Gem Gradient (Rich Purple) */}
        <radialGradient id="gem-purple" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#E9D5FF" />
          <stop offset="25%" stopColor="#C084FC" />
          <stop offset="65%" stopColor="#9333EA" />
          <stop offset="100%" stopColor="#581C87" />
        </radialGradient>

        {/* Gold Border for Heart Gem */}
        <linearGradient id="gold-border" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#FACC15" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>

        {/* Hairclip Pink */}
        <linearGradient id="clip-pink-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFBCD5" />
          <stop offset="100%" stopColor="#F472B6" />
        </linearGradient>

        {/* Hairclip Purple */}
        <linearGradient id="clip-purple-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#DDD6FE" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>

        {/* Paws Fur Gradient */}
        <radialGradient id="paw-fur" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#FFF4F9" />
          <stop offset="100%" stopColor="#F9D4E7" />
        </radialGradient>
      </defs>

      {/* ========================================================= */}
      {/* 1. FLOATING AMBIENT SPARKLES & HEARTS (wobbling around)   */}
      {/* ========================================================= */}
      <g id="ambient-particles" filter="url(#sparkle-glow)">
        {/* Floating Heart 1 (top-left) */}
        <g
          transform={`translate(${135 + heartWobble1.x}, ${240 + heartWobble1.y}) scale(${heartWobble1.scale}) rotate(${heartWobble1.rot})`}
        >
          <path
            d="M 0 0 C -8 -10 -20 -4 -16 6 C -12 14 0 22 0 22 C 0 22 12 14 16 6 C 20 -4 8 -10 0 0 Z"
            fill="#FFA7D1"
            stroke="#F472B6"
            strokeWidth="1.5"
            opacity="0.85"
          />
        </g>

        {/* Floating Heart 2 (mid-right) */}
        <g
          transform={`translate(${485 + heartWobble2.x}, ${270 + heartWobble2.y}) scale(${heartWobble2.scale}) rotate(${heartWobble2.rot})`}
        >
          <path
            d="M 0 0 C -7 -8 -16 -3 -13 5 C -10 11 0 17 0 17 C 0 17 10 11 13 5 C 16 -3 7 -8 0 0 Z"
            fill="#F472B6"
            stroke="#DB2777"
            strokeWidth="1.2"
            opacity="0.9"
          />
        </g>

        {/* Floating Heart 3 (bottom-left) */}
        <g
          transform={`translate(${110 + heartWobble3.x}, ${385 + heartWobble3.y}) scale(${heartWobble3.scale}) rotate(${heartWobble3.rot})`}
        >
          <path
            d="M 0 0 C -5 -7 -13 -3 -10 4 C -7 9 0 14 0 14 C 0 14 7 9 10 4 C 13 -3 5 -7 0 0 Z"
            fill="#FFB5D7"
            opacity="0.75"
          />
        </g>

        {/* 4-Point Sparkle Star 1 (upper-left near speech bubble) */}
        <path
          d="M 235 155 Q 235 142 230 142 Q 235 142 235 129 Q 235 142 240 142 Q 235 142 235 155 Z"
          fill="#E84AA5"
          transform={`translate(235, 142) scale(${1 + Math.sin(state.sparklePhase * Math.PI * 2) * 0.2}) translate(-235, -142)`}
        />

        {/* 4-Point Sparkle Star 2 (top-right of speech bubble) */}
        <path
          d="M 505 170 Q 505 158 500 158 Q 505 158 505 146 Q 505 158 510 158 Q 505 158 505 170 Z"
          fill="#DF4DB8"
          transform={`translate(505, 158) scale(${1 + Math.cos(state.sparklePhase * Math.PI * 2) * 0.25}) translate(-505, -158)`}
        />

        {/* 4-Point Sparkle Star 3 (lower-right near right ear) */}
        <path
          d="M 525 390 Q 525 380 520 380 Q 525 380 525 370 Q 525 380 530 380 Q 525 380 525 390 Z"
          fill="#E84AA5"
          opacity="0.8"
        />
      </g>

      {/* ========================================================= */}
      {/* 2. VIBRATION / MOTION LINES (Purple arcs that pulse)       */}
      {/* ========================================================= */}
      <g
        id="shake-vibration-lines"
        stroke="#B866D8"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity={shakeLineOpacity}
        transform={`translate(0, ${shakeLineOffset})`}
      >
        {/* Upper Left Vibration Arcs (next to bow) */}
        <path d="M 125 245 C 110 262 108 285 118 305" />
        <path d="M 108 252 C 95 270 93 290 102 310" strokeWidth="3.2" opacity="0.85" />

        {/* Lower Left Vibration Arcs (below ear) */}
        <path d="M 115 425 C 105 442 110 465 125 480" />
        <path d="M 100 435 C 90 452 95 472 110 488" strokeWidth="3.2" opacity="0.8" />

        {/* Right Ear Vibration Arcs */}
        <path d="M 485 248 C 500 265 502 288 492 308" />
        <path d="M 502 255 C 515 272 517 292 508 312" strokeWidth="3.2" opacity="0.85" />

        {/* Lower Right Vibration Arcs */}
        <path d="M 480 430 C 495 448 492 468 478 485" strokeWidth="3.5" opacity="0.8" />
      </g>

      {/* ========================================================= */}
      {/* 3. MAIN CHARACTER (Squash & Stretch, Head Shake root)     */}
      {/* ========================================================= */}
      <g
        id="character-root"
        transform={`translate(300, 390) translate(${headShakeX}, ${bodyY}) scale(${squashX}, ${squashY}) rotate(${headShakeAngle}) translate(-300, -390)`}
        filter="url(#soft-shadow)"
      >
        {/* ------------------------------------------------------- */}
        {/* LEFT FLOPPY EAR & BOW                                   */}
        {/* ------------------------------------------------------- */}
        <g
          id="left-ear-group"
          transform={`translate(200, 320) rotate(${leftEarAngle}) scale(1, ${leftEarScaleY}) translate(-200, -320)`}
        >
          {/* Floppy Ear Path */}
          <path
            d="M 215 305
               C 170 300, 115 325, 90 380
               C 70 425, 80 475, 110 495
               C 140 515, 175 490, 185 450
               C 195 410, 205 355, 230 335
               Z"
            fill="url(#ear-left-grad)"
            stroke="#B77CE3"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Fluffy Ear Highlight Tuft */}
          <path
            d="M 125 365 C 105 400 110 440 130 460"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            opacity="0.65"
          />

          {/* LARGE PINK BOW WITH PURPLE GEM */}
          <g
            id="pink-bow"
            transform={`translate(195, 275) rotate(${bowJiggle}) translate(-195, -275)`}
          >
            {/* Bow Ribbons / Tails dangling down */}
            <path
              d="M 180 290
                 C 165 330, 150 365, 140 385
                 C 155 380, 168 375, 180 382
                 C 185 360, 190 325, 192 295
                 Z"
              fill="#F472B6"
              stroke="#BE185D"
              strokeWidth="2.5"
            />
            <path
              d="M 195 290
                 C 200 325, 208 360, 215 385
                 C 205 378, 192 378, 185 385
                 C 188 355, 190 320, 190 295
                 Z"
              fill="#EC4899"
              stroke="#BE185D"
              strokeWidth="2.5"
            />

            {/* Left Bow Loop */}
            <path
              d="M 195 275
                 C 160 230, 120 235, 115 270
                 C 110 305, 145 325, 195 285
                 Z"
              fill="url(#bow-satin)"
              stroke="#BE185D"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            {/* Left Bow Fold Shadows & Highlights */}
            <path
              d="M 140 260 C 160 265, 180 275, 190 278"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />
            <path
              d="M 145 285 C 165 280, 185 282, 192 282"
              stroke="#9D174D"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />

            {/* Right Bow Loop */}
            <path
              d="M 195 275
                 C 225 230, 265 240, 265 275
                 C 265 310, 225 320, 195 285
                 Z"
              fill="url(#bow-satin)"
              stroke="#BE185D"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            {/* Right Bow Fold Highlights */}
            <path
              d="M 245 265 C 230 268, 210 275, 198 278"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />
            <path
              d="M 240 288 C 225 282, 210 282, 198 282"
              stroke="#9D174D"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />

            {/* Bow Center Heart Gemstone */}
            <g transform="translate(195, 276)">
              {/* Gold Bezel Setting */}
              <path
                d="M 0 -8
                   C -14 -22, -28 -8, -18 8
                   C -12 18, 0 28, 0 28
                   C 0 28, 12 18, 18 8
                   C 28 -8, 14 -22, 0 -8
                   Z"
                fill="url(#gold-border)"
                stroke="#854D0E"
                strokeWidth="2"
              />
              {/* Purple Heart Crystal */}
              <path
                d="M 0 -6
                   C -11 -18, -22 -6, -14 6
                   C -9 14, 0 23, 0 23
                   C 0 23, 9 14, 14 6
                   C 22 -6, 11 -18, 0 -6
                   Z"
                fill="url(#gem-purple)"
              />
              {/* Gem Specular Highlight Glint */}
              <circle cx="-6" cy="-4" r="3.5" fill="#FFFFFF" opacity="0.9" />
              <circle cx="-2" cy="2" r="1.5" fill="#FFFFFF" opacity="0.8" />
            </g>
          </g>
        </g>

        {/* ------------------------------------------------------- */}
        {/* RIGHT FLOPPY EAR & HAIR CLIPS                           */}
        {/* ------------------------------------------------------- */}
        <g
          id="right-ear-group"
          transform={`translate(400, 320) rotate(${rightEarAngle}) scale(1, ${rightEarScaleY}) translate(-400, -320)`}
        >
          {/* Floppy Ear Path */}
          <path
            d="M 385 305
               C 430 300, 485 325, 510 380
               C 530 425, 520 475, 490 495
               C 460 515, 425 490, 415 450
               C 405 410, 395 355, 370 335
               Z"
            fill="url(#ear-right-grad)"
            stroke="#B77CE3"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Fluffy Ear Highlight Tuft */}
          <path
            d="M 475 365 C 495 400 490 440 470 460"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            opacity="0.65"
          />

          {/* TWO HAIR CLIPS / BARRETTES */}
          {/* Top Clip: Sweet Pink Barrette with Pink Heart */}
          <g transform="translate(425, 328) rotate(15)">
            {/* Barrette Base */}
            <rect
              x="-6"
              y="-12"
              width="36"
              height="14"
              rx="7"
              fill="url(#clip-pink-grad)"
              stroke="#BE185D"
              strokeWidth="2"
            />
            {/* Pink Heart Charm */}
            <g transform="translate(24, -5)">
              <path
                d="M 0 -4 C -7 -12, -14 -3, -9 5 C -6 10, 0 16, 0 16 C 0 16, 6 10, 9 5 C 14 -3, 7 -12, 0 -4 Z"
                fill="#FF85B2"
                stroke="#BE185D"
                strokeWidth="1.5"
              />
              <circle cx="-3" cy="-1" r="2" fill="#FFFFFF" opacity="0.85" />
            </g>
          </g>

          {/* Bottom Clip: Lavender Purple Barrette with Purple Heart */}
          <g transform="translate(440, 355) rotate(18)">
            {/* Barrette Base */}
            <rect
              x="-6"
              y="-12"
              width="36"
              height="14"
              rx="7"
              fill="url(#clip-purple-grad)"
              stroke="#6B21A8"
              strokeWidth="2"
            />
            {/* Purple Heart Charm */}
            <g transform="translate(24, -5)">
              <path
                d="M 0 -4 C -7 -12, -14 -3, -9 5 C -6 10, 0 16, 0 16 C 0 16, 6 10, 9 5 C 14 -3, 7 -12, 0 -4 Z"
                fill="#C084FC"
                stroke="#6B21A8"
                strokeWidth="1.5"
              />
              <circle cx="-3" cy="-1" r="2" fill="#FFFFFF" opacity="0.85" />
            </g>
          </g>
        </g>

        {/* ------------------------------------------------------- */}
        {/* CHUBBY FLUFFY BODY & HEAD                               */}
        {/* ------------------------------------------------------- */}
        <g id="body-and-face">
          {/* Fluffy Silhouette Path with Cheek Tufts */}
          <path
            d="M 300 240
               C 345 240, 375 255, 400 280
               C 425 295, 445 320, 460 350
               C 475 380, 470 410, 455 435
               C 440 455, 415 470, 385 475
               C 355 480, 335 482, 300 482
               C 265 482, 245 480, 215 475
               C 185 470, 160 455, 145 435
               C 130 410, 125 380, 140 350
               C 155 320, 175 295, 200 280
               C 225 255, 255 240, 300 240
               Z"
            fill="url(#fur-ambient)"
            stroke="#B77CE3"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Forehead Swirling Curl / Tuft of Hair */}
          <path
            d="M 285 275
               C 285 245, 310 230, 320 245
               C 328 258, 315 275, 305 285
               Z"
            fill="#FFFFFF"
            stroke="#B77CE3"
            strokeWidth="2.5"
          />

          {/* Left Cheek Fur Tuft Outlines for Plush Detail */}
          <path
            d="M 148 375 C 135 390, 138 412, 155 425"
            stroke="#D8B4E2"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 160 432 C 172 448, 190 460, 215 468"
            stroke="#D8B4E2"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Right Cheek Fur Tuft Outlines */}
          <path
            d="M 452 375 C 465 390, 462 412, 445 425"
            stroke="#D8B4E2"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 440 432 C 428 448, 410 460, 385 468"
            stroke="#D8B4E2"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* ROSY BLUSH CHEEKS WITH 3 WHITE DASHES */}
          {/* Left Cheek Blush */}
          <g transform={`translate(225, 415) scale(${cheeksPulse}) translate(-225, -415)`}>
            <circle cx="225" cy="415" r="38" fill="url(#blush-grad)" />
            {/* 3 Cute White Highlight Dashes */}
            <g stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" opacity="0.95">
              <line x1="210" y1="422" x2="216" y2="414" />
              <line x1="220" y1="423" x2="226" y2="415" />
              <line x1="230" y1="424" x2="236" y2="416" />
            </g>
          </g>

          {/* Right Cheek Blush */}
          <g transform={`translate(375, 415) scale(${cheeksPulse}) translate(-375, -415)`}>
            <circle cx="375" cy="415" r="38" fill="url(#blush-grad)" />
            {/* 3 Cute White Highlight Dashes */}
            <g stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" opacity="0.95">
              <line x1="364" y1="416" x2="370" y2="424" />
              <line x1="374" y1="415" x2="380" y2="423" />
              <line x1="384" y1="414" x2="390" y2="422" />
            </g>
          </g>

          {/* ANGRY / CUTE EYEBROWS ( \   / ) */}
          <g
            id="eyebrows"
            stroke="#3B0B1D"
            strokeWidth="5"
            strokeLinecap="round"
            transform={`translate(0, ${eyebrowOffset})`}
          >
            {/* Left Angry Eyebrow (slanted down towards center) */}
            <line x1="240" y1="358" x2="268" y2="370" />
            {/* Right Angry Eyebrow (slanted down towards center) */}
            <line x1="360" y1="358" x2="332" y2="370" />
          </g>

          {/* ANGRY SQUINT EYES ( >   < ) */}
          <g id="angry-squint-eyes">
            {/* Left Eye ( > shape) */}
            <g transform="translate(255, 385)">
              {/* Shadow/Glow around eye */}
              <path
                d="M -22 -14 L 14 0 L -22 14"
                stroke="#9D174D"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.3"
              />
              {/* Main Dark Maroon Eye Stroke */}
              <path
                d="M -20 -12 L 12 0 L -20 12"
                stroke="#3B0B1D"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              {/* Sparkle Highlights inside crease */}
              <circle cx="6" cy="-2" r="2.5" fill="#FFFFFF" />
              <circle cx="1" cy="4" r="1.8" fill="#FFFFFF" />
              <path
                d="M -12 -7 L 4 -1"
                stroke="#F472B6"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* Right Eye ( < shape) */}
            <g transform="translate(345, 385)">
              {/* Shadow/Glow around eye */}
              <path
                d="M 22 -14 L -14 0 L 22 14"
                stroke="#9D174D"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.3"
              />
              {/* Main Dark Maroon Eye Stroke */}
              <path
                d="M 20 -12 L -12 0 L 20 12"
                stroke="#3B0B1D"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              {/* Sparkle Highlights inside crease */}
              <circle cx="-6" cy="-2" r="2.5" fill="#FFFFFF" />
              <circle cx="-1" cy="4" r="1.8" fill="#FFFFFF" />
              <path
                d="M 12 -7 L -4 -1"
                stroke="#F472B6"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          </g>

          {/* NOSE & POUTY MOUTH */}
          <g id="nose-and-mouth">
            {/* Tiny Dark Plum Nose Dot */}
            <path
              d="M 298 398 C 298 396, 302 396, 302 398 C 302 400, 298 400, 298 398 Z"
              fill="#3B0B1D"
              stroke="#3B0B1D"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Inverted "v" / Grumpy Pout Line ( ^ ) */}
            <path
              d="M 292 413 L 300 407 L 308 413"
              stroke="#3B0B1D"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>
        </g>

        {/* ------------------------------------------------------- */}
        {/* CHUBBY MARSHMALLOW PAWS (Resting in front, bobbing)     */}
        {/* ------------------------------------------------------- */}
        <g
          id="paws"
          transform={`translate(300, 480) translate(0, ${pawsY}) rotate(${pawsTilt}) translate(-300, -480)`}
        >
          {/* Left Paw */}
          <g transform="translate(262, 475)">
            <ellipse
              cx="0"
              cy="0"
              rx="38"
              ry="26"
              fill="url(#paw-fur)"
              stroke="#B77CE3"
              strokeWidth="3.2"
            />
            {/* Toe Crease Lines */}
            <g stroke="#E89DC2" strokeWidth="2.8" strokeLinecap="round">
              <line x1="-12" y1="-8" x2="-14" y2="12" />
              <line x1="8" y1="-8" x2="6" y2="12" />
            </g>
          </g>

          {/* Right Paw */}
          <g transform="translate(338, 475)">
            <ellipse
              cx="0"
              cy="0"
              rx="38"
              ry="26"
              fill="url(#paw-fur)"
              stroke="#B77CE3"
              strokeWidth="3.2"
            />
            {/* Toe Crease Lines */}
            <g stroke="#E89DC2" strokeWidth="2.8" strokeLinecap="round">
              <line x1="-8" y1="-8" x2="-6" y2="12" />
              <line x1="12" y1="-8" x2="14" y2="12" />
            </g>
          </g>
        </g>
      </g>

      {/* ========================================================= */}
      {/* 4. "NO!" SPEECH BUBBLE (Pops upward with a soft bounce)   */}
      {/* ========================================================= */}
      <g
        id="speech-bubble-root"
        transform={`translate(365, 150) translate(0, ${bubbleY}) scale(${bubbleScale}) rotate(${bubbleAngle}) translate(-365, -150)`}
        filter="url(#bubble-shadow)"
      >
        {/* Scalloped Comic Cloud Outline with Tail pointing to head */}
        <path
          d="M 280 150
             C 255 130, 260 90, 295 80
             C 325 50, 395 45, 430 75
             C 465 50, 520 65, 535 110
             C 565 140, 545 195, 500 205
             C 475 220, 440 220, 415 208
             C 410 225, 390 238, 375 245
             C 382 230, 385 218, 385 205
             C 340 215, 290 200, 280 150
             Z"
          fill="url(#cloud-fill)"
          stroke="#BA48C6"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Outer Pink Bubble Aura Accent */}
        <path
          d="M 305 78 C 345 52, 420 52, 450 72"
          stroke="#F472B6"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />

        {/* ------------------------------------------------------- */}
        {/* 3D CANDY BUBBLE LETTERS: "NO!"                          */}
        {/* ------------------------------------------------------- */}
        <g id="letters-no" transform="translate(30, 0)">
          {/* LETTER "N" */}
          <g id="letter-N">
            {/* 3D Bottom Depth Shadow */}
            <path
              d="M 270 178 L 270 115 C 270 102 286 102 288 115 L 305 148 L 305 115 C 305 102 322 102 324 115 L 324 178 C 324 191 307 191 305 178 L 288 145 L 288 178 C 288 191 270 191 270 178 Z"
              fill="#6B1358"
              transform="translate(0, 4)"
            />
            {/* Front Gradient Body */}
            <path
              d="M 270 175 L 270 112 C 270 99 286 99 288 112 L 305 145 L 305 112 C 305 99 322 99 324 112 L 324 175 C 324 188 307 188 305 175 L 288 142 L 288 175 C 288 188 270 188 270 175 Z"
              fill="url(#bubble-text-fill)"
              stroke="#6B1358"
              strokeWidth="2.5"
            />
            {/* Gel Gloss Specular Highlights */}
            <path
              d="M 274 125 C 274 110 282 108 284 115 L 284 135"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="318" cy="112" r="3" fill="#FFFFFF" />
          </g>

          {/* LETTER "O" (with Heart Cutout in center) */}
          <g id="letter-O">
            {/* 3D Bottom Depth Shadow */}
            <ellipse cx="372" cy="148" rx="34" ry="42" fill="#6B1358" />
            {/* Front Gradient Body */}
            <ellipse
              cx="372"
              cy="144"
              rx="34"
              ry="42"
              fill="url(#bubble-text-fill)"
              stroke="#6B1358"
              strokeWidth="2.5"
            />
            {/* Center Heart-Shaped Cutout */}
            <path
              d="M 372 135
                 C 366 126, 356 128, 358 138
                 C 360 145, 372 156, 372 156
                 C 372 156, 384 145, 386 138
                 C 388 128, 378 126, 372 135
                 Z"
              fill="#FFF6FC"
              stroke="#831872"
              strokeWidth="1.8"
            />
            {/* Gel Gloss Specular Highlights on "O" */}
            <path
              d="M 352 120 C 362 110, 385 110, 395 122"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 396 155 C 398 165, 392 175, 385 178"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />
          </g>

          {/* EXCLAMATION MARK "!" */}
          <g id="letter-exclamation">
            {/* 3D Bottom Depth Shadow */}
            <path
              d="M 420 108 C 420 98, 436 98, 436 108 L 433 150 C 433 158, 423 158, 423 150 Z"
              fill="#6B1358"
              transform="translate(0, 3)"
            />
            {/* Front Gradient Bar */}
            <path
              d="M 420 106 C 420 96, 436 96, 436 106 L 433 148 C 433 156, 423 156, 423 148 Z"
              fill="url(#bubble-text-fill)"
              stroke="#6B1358"
              strokeWidth="2.5"
            />
            {/* Gloss Highlight on top of ! */}
            <circle cx="428" cy="104" r="3.2" fill="#FFFFFF" />

            {/* Bottom Dot is an Inverted Heart Bubble Dot */}
            <g transform="translate(428, 172)">
              <circle cx="0" cy="0" r="8" fill="url(#bubble-text-fill)" stroke="#6B1358" strokeWidth="2" />
              <circle cx="-2" cy="-2" r="2.2" fill="#FFFFFF" />
            </g>
          </g>

          {/* Cute Pink Heart Bubble Beside "!" */}
          <g transform="translate(448, 160)">
            <path
              d="M 0 -3 C -6 -10, -12 -3, -8 4 C -5 8, 0 13, 0 13 C 0 13, 5 8, 8 4 C 12 -3, 6 -10, 0 -3 Z"
              fill="url(#bubble-text-fill)"
              stroke="#6B1358"
              strokeWidth="1.8"
            />
            <circle cx="-2" cy="-1" r="1.5" fill="#FFFFFF" />
          </g>
        </g>
      </g>
    </svg>
  );
};
