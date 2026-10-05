/**
 * Mathematical animation curves and SVG asset paths for the cute fluffy pink character.
 * Perfectly calibrated to match the uploaded reference image.
 */

export interface AnimationFrameState {
  // Head & Body
  headShakeX: number;
  headShakeAngle: number;
  squashX: number;
  squashY: number;
  bodyY: number;

  // Ears
  leftEarAngle: number;
  leftEarScaleY: number;
  rightEarAngle: number;
  rightEarScaleY: number;
  bowJiggle: number;

  // Paws
  pawsY: number;
  pawsTilt: number;

  // Face
  eyebrowOffset: number;
  cheeksPulse: number;

  // Speech Bubble
  bubbleY: number;
  bubbleScale: number;
  bubbleAngle: number;

  // Vibration lines & Sparkles
  shakeLineOpacity: number;
  shakeLineOffset: number;
  sparklePhase: number;
  heartWobble1: { x: number; y: number; scale: number; rot: number };
  heartWobble2: { x: number; y: number; scale: number; rot: number };
  heartWobble3: { x: number; y: number; scale: number; rot: number };
}

/**
 * Calculates seamless 2.4-second looping animation states.
 * u is normalized time in [0, 1).
 */
export function computeAnimationState(u: number, intensity = 1.0): AnimationFrameState {
  // Clamp u into [0, 1)
  const normU = ((u % 1) + 1) % 1;

  // 1. Head shake: active in u in [0, 0.55], rest in [0.55, 1.0]
  let headShakeX = 0;
  let headShakeAngle = 0;
  let shakeEnergy = 0;
  let squashX = 1;
  let squashY = 1;
  let bodyY = 0;

  if (normU < 0.55) {
    // Shake phase: ~3 fast emphatic oscillations
    const tShake = normU / 0.55; // 0 to 1
    // Smooth envelope: ramps in quickly, stays strong, tapers with soft spring
    const env = Math.sin(tShake * Math.PI) * Math.pow(1 - tShake, 0.35);
    shakeEnergy = env;

    // Multi-frequency wave for punchy cartoon feel
    // 3 rapid shakes: frequency = 3.5 cycles
    const wave = Math.sin(tShake * Math.PI * 7);
    headShakeAngle = wave * 8.5 * env * intensity;
    headShakeX = wave * 16 * env * intensity;

    // Body squashes at peaks of velocity reversal
    const squashWave = Math.abs(Math.sin(tShake * Math.PI * 7));
    squashX = 1 + 0.05 * squashWave * env * intensity;
    squashY = 1 - 0.06 * squashWave * env * intensity;
    bodyY = squashWave * 4 * env;
  } else {
    // Rest phase: soft breathing bounce, determined pout holds firm
    const tRest = (normU - 0.55) / 0.45; // 0 to 1
    const breath = Math.sin(tRest * Math.PI * 2);
    squashY = 1 + 0.02 * breath;
    squashX = 1 - 0.015 * breath;
    bodyY = -breath * 2;
    // Tiny settling micro-drift
    headShakeAngle = Math.sin(tRest * Math.PI * 2) * 0.4 * intensity;
    headShakeX = Math.sin(tRest * Math.PI * 2) * 0.8 * intensity;
  }

  // 2. Ears: Secondary motion with lag and spring overshoot
  // Ear lag is simulated by sampling the shake curve with a time offset
  const lagU = (((normU - 0.04) % 1) + 1) % 1;
  let lagWave = 0;
  if (lagU < 0.55) {
    const tLag = lagU / 0.55;
    const lagEnv = Math.sin(tLag * Math.PI) * Math.pow(1 - tLag, 0.3);
    lagWave = Math.sin(tLag * Math.PI * 7) * lagEnv;
  }
  
  // Left ear hangs down-left; when head turns right, ear is dragged and bounces
  const leftEarAngle = -headShakeAngle * 1.35 + lagWave * 9 * intensity;
  const leftEarScaleY = 1 + Math.abs(lagWave) * 0.06 * intensity;

  // Right ear hangs down-right
  const rightEarAngle = -headShakeAngle * 1.35 - lagWave * 9 * intensity;
  const rightEarScaleY = 1 + Math.abs(lagWave) * 0.06 * intensity;

  // Bow jiggle
  const bowJiggle = -headShakeAngle * 0.8 + lagWave * 5;

  // 3. Paws: slight vertical bobbing with small lag
  const pawsLagU = (((normU - 0.03) % 1) + 1) % 1;
  let pawsY = 0;
  if (pawsLagU < 0.55) {
    const tP = pawsLagU / 0.55;
    pawsY = Math.abs(Math.sin(tP * Math.PI * 7)) * 5 * intensity * (1 - tP * 0.5);
  } else {
    const tRest = (normU - 0.55) / 0.45;
    pawsY = Math.sin(tRest * Math.PI * 2) * 1.5;
  }
  const pawsTilt = headShakeAngle * 0.25;

  // 4. Eyebrows: stays cute/angry, slight twitch on emphatic shake
  const eyebrowOffset = shakeEnergy > 0.2 ? Math.abs(headShakeAngle) * 0.25 : 0;
  const cheeksPulse = 1 + shakeEnergy * 0.08;

  // 5. Speech Bubble: "pops upward once with a soft bounce"
  // Pops up early during the first strong refusal (around normU: 0.08 to 0.45), then floats softly
  let bubbleY = 0;
  let bubbleScale = 1;
  let bubbleAngle = 0;

  if (normU < 0.45) {
    // Upward pop and spring settle
    const tPop = normU / 0.45;
    // Damped harmonic oscillator curve
    const popHeight = -22 * intensity;
    const decay = Math.exp(-tPop * 4.5);
    const popOsc = Math.sin(tPop * Math.PI * 3.5);
    bubbleY = popHeight * (1 - tPop) + popOsc * 8 * decay * intensity;
    bubbleScale = 1 + 0.12 * Math.sin(tPop * Math.PI) * decay * intensity;
    bubbleAngle = Math.sin(tPop * Math.PI * 2) * 2.5 * intensity;
  } else {
    // Gentle floating drift during the rest of the loop, returning smoothly to 0
    const tFloat = (normU - 0.45) / 0.55;
    const floatWave = Math.sin(tFloat * Math.PI * 2);
    bubbleY = floatWave * 3.5;
    bubbleScale = 1 + Math.sin(tFloat * Math.PI * 2) * 0.015;
    bubbleAngle = floatWave * 0.8;
  }

  // 6. Shake / Vibration lines
  const shakeLineOpacity = shakeEnergy > 0.15 ? Math.min(1, shakeEnergy * 1.6) : 0;
  const shakeLineOffset = Math.sin(normU * Math.PI * 30) * 2;

  // 7. Wobbling Sparkles & Hearts (seamless harmonic motion)
  const tau = Math.PI * 2;
  const sparklePhase = (normU * 4) % 1;

  const heartWobble1 = {
    x: Math.sin(normU * tau) * 4,
    y: Math.cos(normU * tau) * 5,
    scale: 1 + Math.sin(normU * tau * 2) * 0.12,
    rot: Math.sin(normU * tau) * 10,
  };

  const heartWobble2 = {
    x: Math.cos((normU + 0.33) * tau) * 4.5,
    y: Math.sin((normU + 0.33) * tau) * 4,
    scale: 1 + Math.sin((normU + 0.33) * tau * 2) * 0.14,
    rot: -Math.cos((normU + 0.33) * tau) * 12,
  };

  const heartWobble3 = {
    x: Math.sin((normU + 0.66) * tau) * 3.5,
    y: Math.cos((normU + 0.66) * tau) * 4.5,
    scale: 1 + Math.sin((normU + 0.66) * tau * 2) * 0.1,
    rot: Math.sin((normU + 0.66) * tau) * 8,
  };

  return {
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
    sparklePhase,
    heartWobble1,
    heartWobble2,
    heartWobble3,
  };
}
