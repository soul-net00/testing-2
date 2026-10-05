import gifshot from 'gifshot';
import { AnimationFrameState, computeAnimationState } from '../components/characterData';

/**
 * Generates an SVG string for a given animation state
 */
export function getSVGString(
  state: AnimationFrameState,
  width = 600,
  height = 600,
  bgColor: string | null = null
): string {
  const bgRect = bgColor ? `<rect width="100%" height="100%" fill="${bgColor}" />` : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="${width}" height="${height}">
    <defs>
      <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#8B3278" floodOpacity="0.16" />
      </filter>
      <filter id="bubble-shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#7A1869" floodOpacity="0.22" />
      </filter>
      <radialGradient id="cloud-fill" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="65%" stop-color="#FFF4FC" />
        <stop offset="100%" stop-color="#FCE2F5" />
      </radialGradient>
      <linearGradient id="bubble-text-fill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FFA6E3" />
        <stop offset="25%" stop-color="#FF77CC" />
        <stop offset="70%" stop-color="#D933A9" />
        <stop offset="100%" stop-color="#9E1985" />
      </linearGradient>
      <radialGradient id="fur-ambient" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="60%" stop-color="#FFF6FA" />
        <stop offset="85%" stop-color="#FDE1F0" />
        <stop offset="100%" stop-color="#F2D2F5" />
      </radialGradient>
      <radialGradient id="blush-grad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#FF7BA3" stop-opacity="0.8" />
        <stop offset="50%" stop-color="#FF8CB0" stop-opacity="0.45" />
        <stop offset="100%" stop-color="#FFA4C0" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="ear-left-grad" x1="0.7" y1="0" x2="0.2" y2="1">
        <stop offset="0%" stop-color="#FFF9FC" />
        <stop offset="45%" stop-color="#FDE3F1" />
        <stop offset="80%" stop-color="#DCA8F4" />
        <stop offset="100%" stop-color="#B37CE3" />
      </linearGradient>
      <linearGradient id="ear-right-grad" x1="0.3" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stop-color="#FFF9FC" />
        <stop offset="45%" stop-color="#FDE3F1" />
        <stop offset="80%" stop-color="#DCA8F4" />
        <stop offset="100%" stop-color="#B37CE3" />
      </linearGradient>
      <linearGradient id="bow-satin" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FFBCE0" />
        <stop offset="40%" stop-color="#FF88BD" />
        <stop offset="85%" stop-color="#EE5699" />
        <stop offset="100%" stop-color="#C93577" />
      </linearGradient>
      <radialGradient id="gem-purple" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stop-color="#E9D5FF" />
        <stop offset="25%" stop-color="#C084FC" />
        <stop offset="65%" stop-color="#9333EA" />
        <stop offset="100%" stop-color="#581C87" />
      </radialGradient>
      <linearGradient id="gold-border" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#FEF08A" />
        <stop offset="50%" stop-color="#FACC15" />
        <stop offset="100%" stop-color="#B45309" />
      </linearGradient>
      <linearGradient id="clip-pink-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#FFBCD5" />
        <stop offset="100%" stop-color="#F472B6" />
      </linearGradient>
      <linearGradient id="clip-purple-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#DDD6FE" />
        <stop offset="100%" stop-color="#A855F7" />
      </linearGradient>
      <radialGradient id="paw-fur" cx="50%" cy="40%" r="55%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="70%" stop-color="#FFF4F9" />
        <stop offset="100%" stop-color="#F9D4E7" />
      </radialGradient>
    </defs>
    ${bgRect}
    <!-- Floating Sparkles & Hearts -->
    <g id="ambient-particles">
      <g transform="translate(${135 + state.heartWobble1.x}, ${240 + state.heartWobble1.y}) scale(${state.heartWobble1.scale}) rotate(${state.heartWobble1.rot})">
        <path d="M 0 0 C -8 -10 -20 -4 -16 6 C -12 14 0 22 0 22 C 0 22 12 14 16 6 C 20 -4 8 -10 0 0 Z" fill="#FFA7D1" stroke="#F472B6" stroke-width="1.5" opacity="0.85" />
      </g>
      <g transform="translate(${485 + state.heartWobble2.x}, ${270 + state.heartWobble2.y}) scale(${state.heartWobble2.scale}) rotate(${state.heartWobble2.rot})">
        <path d="M 0 0 C -7 -8 -16 -3 -13 5 C -10 11 0 17 0 17 C 0 17 10 11 13 5 C 16 -3 7 -8 0 0 Z" fill="#F472B6" stroke="#DB2777" stroke-width="1.2" opacity="0.9" />
      </g>
      <g transform="translate(${110 + state.heartWobble3.x}, ${385 + state.heartWobble3.y}) scale(${state.heartWobble3.scale}) rotate(${state.heartWobble3.rot})">
        <path d="M 0 0 C -5 -7 -13 -3 -10 4 C -7 9 0 14 0 14 C 0 14 7 9 10 4 C 13 -3 5 -7 0 0 Z" fill="#FFB5D7" opacity="0.75" />
      </g>
      <path d="M 235 155 Q 235 142 230 142 Q 235 142 235 129 Q 235 142 240 142 Q 235 142 235 155 Z" fill="#E84AA5" />
      <path d="M 505 170 Q 505 158 500 158 Q 505 158 505 146 Q 505 158 510 158 Q 505 158 505 170 Z" fill="#DF4DB8" />
      <path d="M 525 390 Q 525 380 520 380 Q 525 380 525 370 Q 525 380 530 380 Q 525 380 525 390 Z" fill="#E84AA5" opacity="0.8" />
    </g>

    <!-- Vibration lines -->
    <g id="shake-vibration-lines" stroke="#B866D8" stroke-width="4" stroke-linecap="round" fill="none" opacity="${state.shakeLineOpacity}" transform="translate(0, ${state.shakeLineOffset})">
      <path d="M 125 245 C 110 262 108 285 118 305" />
      <path d="M 108 252 C 95 270 93 290 102 310" stroke-width="3.2" opacity="0.85" />
      <path d="M 115 425 C 105 442 110 465 125 480" />
      <path d="M 100 435 C 90 452 95 472 110 488" stroke-width="3.2" opacity="0.8" />
      <path d="M 485 248 C 500 265 502 288 492 308" />
      <path d="M 502 255 C 515 272 517 292 508 312" stroke-width="3.2" opacity="0.85" />
      <path d="M 480 430 C 495 448 492 468 478 485" stroke-width="3.5" opacity="0.8" />
    </g>

    <!-- Character root -->
    <g transform="translate(300, 390) translate(${state.headShakeX}, ${state.bodyY}) scale(${state.squashX}, ${state.squashY}) rotate(${state.headShakeAngle}) translate(-300, -390)">
      <!-- Left Ear & Bow -->
      <g transform="translate(200, 320) rotate(${state.leftEarAngle}) scale(1, ${state.leftEarScaleY}) translate(-200, -320)">
        <path d="M 215 305 C 170 300, 115 325, 90 380 C 70 425, 80 475, 110 495 C 140 515, 175 490, 185 450 C 195 410, 205 355, 230 335 Z" fill="url(#ear-left-grad)" stroke="#B77CE3" stroke-width="3.5" stroke-linejoin="round" />
        <path d="M 125 365 C 105 400 110 440 130 460" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.65" />
        <!-- Bow -->
        <g transform="translate(195, 275) rotate(${state.bowJiggle}) translate(-195, -275)">
          <path d="M 180 290 C 165 330, 150 365, 140 385 C 155 380, 168 375, 180 382 C 185 360, 190 325, 192 295 Z" fill="#F472B6" stroke="#BE185D" stroke-width="2.5" />
          <path d="M 195 290 C 200 325, 208 360, 215 385 C 205 378, 192 378, 185 385 C 188 355, 190 320, 190 295 Z" fill="#EC4899" stroke="#BE185D" stroke-width="2.5" />
          <path d="M 195 275 C 160 230, 120 235, 115 270 C 110 305, 145 325, 195 285 Z" fill="url(#bow-satin)" stroke="#BE185D" stroke-width="3.2" stroke-linejoin="round" />
          <path d="M 140 260 C 160 265, 180 275, 190 278" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.75" />
          <path d="M 145 285 C 165 280, 185 282, 192 282" stroke="#9D174D" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.6" />
          <path d="M 195 275 C 225 230, 265 240, 265 275 C 265 310, 225 320, 195 285 Z" fill="url(#bow-satin)" stroke="#BE185D" stroke-width="3.2" stroke-linejoin="round" />
          <path d="M 245 265 C 230 268, 210 275, 198 278" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.75" />
          <path d="M 240 288 C 225 282, 210 282, 198 282" stroke="#9D174D" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.6" />
          <g transform="translate(195, 276)">
            <path d="M 0 -8 C -14 -22, -28 -8, -18 8 C -12 18, 0 28, 0 28 C 0 28, 12 18, 18 8 C 28 -8, 14 -22, 0 -8 Z" fill="url(#gold-border)" stroke="#854D0E" stroke-width="2" />
            <path d="M 0 -6 C -11 -18, -22 -6, -14 6 C -9 14, 0 23, 0 23 C 0 23, 9 14, 14 6 C 22 -6, 11 -18, 0 -6 Z" fill="url(#gem-purple)" />
            <circle cx="-6" cy="-4" r="3.5" fill="#FFFFFF" opacity="0.9" />
          </g>
        </g>
      </g>

      <!-- Right Ear & Clips -->
      <g transform="translate(400, 320) rotate(${state.rightEarAngle}) scale(1, ${state.rightEarScaleY}) translate(-400, -320)">
        <path d="M 385 305 C 430 300, 485 325, 510 380 C 530 425, 520 475, 490 495 C 460 515, 425 490, 415 450 C 405 410, 395 355, 370 335 Z" fill="url(#ear-right-grad)" stroke="#B77CE3" stroke-width="3.5" stroke-linejoin="round" />
        <path d="M 475 365 C 495 400 490 440 470 460" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.65" />
        <!-- Clips -->
        <g transform="translate(425, 328) rotate(15)">
          <rect x="-6" y="-12" width="36" height="14" rx="7" fill="url(#clip-pink-grad)" stroke="#BE185D" stroke-width="2" />
          <g transform="translate(24, -5)">
            <path d="M 0 -4 C -7 -12, -14 -3, -9 5 C -6 10, 0 16, 0 16 C 0 16, 6 10, 9 5 C 14 -3, 7 -12, 0 -4 Z" fill="#FF85B2" stroke="#BE185D" stroke-width="1.5" />
            <circle cx="-3" cy="-1" r="2" fill="#FFFFFF" opacity="0.85" />
          </g>
        </g>
        <g transform="translate(440, 355) rotate(18)">
          <rect x="-6" y="-12" width="36" height="14" rx="7" fill="url(#clip-purple-grad)" stroke="#6B21A8" stroke-width="2" />
          <g transform="translate(24, -5)">
            <path d="M 0 -4 C -7 -12, -14 -3, -9 5 C -6 10, 0 16, 0 16 C 0 16, 6 10, 9 5 C 14 -3, 7 -12, 0 -4 Z" fill="#C084FC" stroke="#6B21A8" stroke-width="1.5" />
            <circle cx="-3" cy="-1" r="2" fill="#FFFFFF" opacity="0.85" />
          </g>
        </g>
      </g>

      <!-- Head & Face -->
      <g>
        <path d="M 300 240 C 345 240, 375 255, 400 280 C 425 295, 445 320, 460 350 C 475 380, 470 410, 455 435 C 440 455, 415 470, 385 475 C 355 480, 335 482, 300 482 C 265 482, 245 480, 215 475 C 185 470, 160 455, 145 435 C 130 410, 125 380, 140 350 C 155 320, 175 295, 200 280 C 225 255, 255 240, 300 240 Z" fill="url(#fur-ambient)" stroke="#B77CE3" stroke-width="3.5" stroke-linejoin="round" />
        <path d="M 285 275 C 285 245, 310 230, 320 245 C 328 258, 315 275, 305 285 Z" fill="#FFFFFF" stroke="#B77CE3" stroke-width="2.5" />
        <!-- Cheek Tuft Lines -->
        <path d="M 148 375 C 135 390, 138 412, 155 425" stroke="#D8B4E2" stroke-width="3" stroke-linecap="round" fill="none" />
        <path d="M 160 432 C 172 448, 190 460, 215 468" stroke="#D8B4E2" stroke-width="3" stroke-linecap="round" fill="none" />
        <path d="M 452 375 C 465 390, 462 412, 445 425" stroke="#D8B4E2" stroke-width="3" stroke-linecap="round" fill="none" />
        <path d="M 440 432 C 428 448, 410 460, 385 468" stroke="#D8B4E2" stroke-width="3" stroke-linecap="round" fill="none" />

        <!-- Cheeks Blush -->
        <g transform="translate(225, 415) scale(${state.cheeksPulse}) translate(-225, -415)">
          <circle cx="225" cy="415" r="38" fill="url(#blush-grad)" />
          <g stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" opacity="0.95">
            <line x1="210" y1="422" x2="216" y2="414" />
            <line x1="220" y1="423" x2="226" y2="415" />
            <line x1="230" y1="424" x2="236" y2="416" />
          </g>
        </g>
        <g transform="translate(375, 415) scale(${state.cheeksPulse}) translate(-375, -415)">
          <circle cx="375" cy="415" r="38" fill="url(#blush-grad)" />
          <g stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" opacity="0.95">
            <line x1="364" y1="416" x2="370" y2="424" />
            <line x1="374" y1="415" x2="380" y2="423" />
            <line x1="384" y1="414" x2="390" y2="422" />
          </g>
        </g>

        <!-- Eyebrows -->
        <g stroke="#3B0B1D" stroke-width="5" stroke-linecap="round" transform="translate(0, ${state.eyebrowOffset})">
          <line x1="240" y1="358" x2="268" y2="370" />
          <line x1="360" y1="358" x2="332" y2="370" />
        </g>

        <!-- Angry Squint Eyes > < -->
        <g transform="translate(255, 385)">
          <path d="M -22 -14 L 14 0 L -22 14" stroke="#9D174D" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.3" />
          <path d="M -20 -12 L 12 0 L -20 12" stroke="#3B0B1D" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none" />
          <circle cx="6" cy="-2" r="2.5" fill="#FFFFFF" />
          <circle cx="1" cy="4" r="1.8" fill="#FFFFFF" />
          <path d="M -12 -7 L 4 -1" stroke="#F472B6" stroke-width="2.5" stroke-linecap="round" fill="none" />
        </g>
        <g transform="translate(345, 385)">
          <path d="M 22 -14 L -14 0 L 22 14" stroke="#9D174D" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.3" />
          <path d="M 20 -12 L -12 0 L 20 12" stroke="#3B0B1D" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none" />
          <circle cx="-6" cy="-2" r="2.5" fill="#FFFFFF" />
          <circle cx="-1" cy="4" r="1.8" fill="#FFFFFF" />
          <path d="M 12 -7 L -4 -1" stroke="#F472B6" stroke-width="2.5" stroke-linecap="round" fill="none" />
        </g>

        <!-- Nose & Mouth -->
        <path d="M 298 398 C 298 396, 302 396, 302 398 C 302 400, 298 400, 298 398 Z" fill="#3B0B1D" stroke="#3B0B1D" stroke-width="2.5" stroke-linejoin="round" />
        <path d="M 292 413 L 300 407 L 308 413" stroke="#3B0B1D" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      </g>

      <!-- Paws -->
      <g transform="translate(300, 480) translate(0, ${state.pawsY}) rotate(${state.pawsTilt}) translate(-300, -480)">
        <g transform="translate(262, 475)">
          <ellipse cx="0" cy="0" rx="38" ry="26" fill="url(#paw-fur)" stroke="#B77CE3" stroke-width="3.2" />
          <g stroke="#E89DC2" stroke-width="2.8" stroke-linecap="round">
            <line x1="-12" y1="-8" x2="-14" y2="12" />
            <line x1="8" y1="-8" x2="6" y2="12" />
          </g>
        </g>
        <g transform="translate(338, 475)">
          <ellipse cx="0" cy="0" rx="38" ry="26" fill="url(#paw-fur)" stroke="#B77CE3" stroke-width="3.2" />
          <g stroke="#E89DC2" stroke-width="2.8" stroke-linecap="round">
            <line x1="-8" y1="-8" x2="-6" y2="12" />
            <line x1="12" y1="-8" x2="14" y2="12" />
          </g>
        </g>
      </g>
    </g>

    <!-- Speech Bubble -->
    <g transform="translate(365, 150) translate(0, ${state.bubbleY}) scale(${state.bubbleScale}) rotate(${state.bubbleAngle}) translate(-365, -150)">
      <path d="M 280 150 C 255 130, 260 90, 295 80 C 325 50, 395 45, 430 75 C 465 50, 520 65, 535 110 C 565 140, 545 195, 500 205 C 475 220, 440 220, 415 208 C 410 225, 390 238, 375 245 C 382 230, 385 218, 385 205 C 340 215, 290 200, 280 150 Z" fill="url(#cloud-fill)" stroke="#BA48C6" stroke-width="4" stroke-linejoin="round" />
      <g transform="translate(30, 0)">
        <!-- "N" -->
        <g>
          <path d="M 270 178 L 270 115 C 270 102 286 102 288 115 L 305 148 L 305 115 C 305 102 322 102 324 115 L 324 178 C 324 191 307 191 305 178 L 288 145 L 288 178 C 288 191 270 191 270 178 Z" fill="#6B1358" transform="translate(0, 4)" />
          <path d="M 270 175 L 270 112 C 270 99 286 99 288 112 L 305 145 L 305 112 C 305 99 322 99 324 112 L 324 175 C 324 188 307 188 305 175 L 288 142 L 288 175 C 288 188 270 188 270 175 Z" fill="url(#bubble-text-fill)" stroke="#6B1358" stroke-width="2.5" />
          <path d="M 274 125 C 274 110 282 108 284 115 L 284 135" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" fill="none" />
          <circle cx="318" cy="112" r="3" fill="#FFFFFF" />
        </g>
        <!-- "O" -->
        <g>
          <ellipse cx="372" cy="148" rx="34" ry="42" fill="#6B1358" />
          <ellipse cx="372" cy="144" rx="34" ry="42" fill="url(#bubble-text-fill)" stroke="#6B1358" stroke-width="2.5" />
          <path d="M 372 135 C 366 126, 356 128, 358 138 C 360 145, 372 156, 372 156 C 372 156, 384 145, 386 138 C 388 128, 378 126, 372 135 Z" fill="#FFF6FC" stroke="#831872" stroke-width="1.8" />
          <path d="M 352 120 C 362 110, 385 110, 395 122" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" fill="none" />
          <path d="M 396 155 C 398 165, 392 175, 385 178" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.75" />
        </g>
        <!-- "!" -->
        <g>
          <path d="M 420 108 C 420 98, 436 98, 436 108 L 433 150 C 433 158, 423 158, 423 150 Z" fill="#6B1358" transform="translate(0, 3)" />
          <path d="M 420 106 C 420 96, 436 96, 436 106 L 433 148 C 433 156, 423 156, 423 148 Z" fill="url(#bubble-text-fill)" stroke="#6B1358" stroke-width="2.5" />
          <circle cx="428" cy="104" r="3.2" fill="#FFFFFF" />
          <g transform="translate(428, 172)">
            <circle cx="0" cy="0" r="8" fill="url(#bubble-text-fill)" stroke="#6B1358" stroke-width="2" />
            <circle cx="-2" cy="-2" r="2.2" fill="#FFFFFF" />
          </g>
        </g>
        <!-- Heart bubble beside ! -->
        <g transform="translate(448, 160)">
          <path d="M 0 -3 C -6 -10, -12 -3, -8 4 C -5 8, 0 13, 0 13 C 0 13, 5 8, 8 4 C 12 -3, 6 -10, 0 -3 Z" fill="url(#bubble-text-fill)" stroke="#6B1358" stroke-width="1.8" />
          <circle cx="-2" cy="-1" r="1.5" fill="#FFFFFF" />
        </g>
      </g>
    </g>
  </svg>`;
}

/**
 * Render an SVG string to a canvas
 */
export function renderSvgToCanvas(
  svgString: string,
  canvas: HTMLCanvasElement,
  width = 600,
  height = 600
): Promise<void> {
  return new Promise((resolve, reject) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Canvas 2D context not available'));
      return;
    }

    const img = new Image();
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve();
    };

    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };

    img.src = url;
  });
}

/**
 * Download a file in the browser
 */
export function triggerDownload(url: string, filename: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * Export high-resolution PNG frame
 */
export async function exportPNGSticker(
  state: AnimationFrameState,
  bgColor: string | null = null,
  filename = 'fluffy_pink_no.png',
  size = 800
) {
  const canvas = document.createElement('canvas');
  const svg = getSVGString(state, size, size, bgColor);
  await renderSvgToCanvas(svg, canvas, size, size);
  const dataUrl = canvas.toDataURL('image/png');
  triggerDownload(dataUrl, filename);
}

/**
 * Export transparent animated GIF (2.4s seamless loop)
 */
export async function exportAnimatedGIF(
  intensity: number,
  fps = 18,
  size = 360,
  bgColor: string | null = null,
  onProgress?: (pct: number) => void
): Promise<void> {
  const duration = 2.4;
  const totalFrames = Math.round(duration * fps);
  const frameImages: HTMLCanvasElement[] = [];

  for (let i = 0; i < totalFrames; i++) {
    const u = i / totalFrames;
    const state = computeAnimationState(u, intensity);
    const svg = getSVGString(state, size, size, bgColor);
    const canvas = document.createElement('canvas');
    await renderSvgToCanvas(svg, canvas, size, size);
    frameImages.push(canvas);
    if (onProgress) {
      onProgress(Math.round(((i + 1) / totalFrames) * 50));
    }
  }

  return new Promise((resolve, reject) => {
    gifshot.createGIF(
      {
        images: frameImages,
        gifWidth: size,
        gifHeight: size,
        interval: 1 / fps,
        numFrames: totalFrames,
        progressCallback: (captureProgress: number) => {
          if (onProgress) {
            onProgress(50 + Math.round(captureProgress * 50));
          }
        },
      },
      (obj) => {
        if (!obj.error && obj.image) {
          triggerDownload(obj.image, 'fluffy_pink_no_loop.gif');
          resolve();
        } else {
          reject(new Error(obj.errorMsg || 'Failed to create GIF'));
        }
      }
    );
  });
}

/**
 * Export WebM video (smooth 60fps loop!)
 */
export async function exportWebMVideo(
  intensity: number,
  fps = 30,
  size = 600,
  bgColor: string | null = null,
  onProgress?: (pct: number) => void
): Promise<void> {
  const duration = 2.4;
  const totalFrames = Math.round(duration * fps);
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('No canvas context');

  const stream = canvas.captureStream(fps);
  const mimeTypes = [
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp9',
    'video/webm;codecs=vp8',
    'video/webm',
  ];
  const supportedMime = mimeTypes.find((m) => MediaRecorder.isTypeSupported(m)) || 'video/webm';

  const recorder = new MediaRecorder(stream, { mimeType: supportedMime, videoBitsPerSecond: 4000000 });
  const chunks: Blob[] = [];

  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  recorder.start();

  const frameIntervalMs = 1000 / fps;
  for (let i = 0; i < totalFrames; i++) {
    const u = i / totalFrames;
    const state = computeAnimationState(u, intensity);
    const svg = getSVGString(state, size, size, bgColor);
    await renderSvgToCanvas(svg, canvas, size, size);
    if (onProgress) {
      onProgress(Math.round(((i + 1) / totalFrames) * 90));
    }
    await new Promise((r) => setTimeout(r, frameIntervalMs / 2));
  }

  recorder.stop();

  await new Promise<void>((resolve) => {
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: supportedMime });
      const url = URL.createObjectURL(blob);
      triggerDownload(url, 'fluffy_pink_no_animation.webm');
      URL.revokeObjectURL(url);
      if (onProgress) onProgress(100);
      resolve();
    };
  });
}
