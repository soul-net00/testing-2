import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { experience } from './config/experienceConfig';
import { FloatingHearts } from './components/FloatingHearts';
import { HomeScreen } from './components/HomeScreen';
import { WordSequence } from './components/WordSequence';
import { QuestionScreen } from './components/QuestionScreen';
import { NoScreen } from './components/NoScreen';
import { ProcessingScreen } from './components/ProcessingScreen';
import { SuccessScreen } from './components/SuccessScreen';
import { MemorySlideshow } from './components/MemorySlideshow';
import { FinalScreen } from './components/FinalScreen';
import { soundFX } from './utils/audio';

type Stage =
  | 'home'
  | 'words'
  | 'question'
  | 'no'
  | 'processing'
  | 'success'
  | 'memories'
  | 'final';

export default function App() {
  const [stage, setStage] = useState<Stage>('home');
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [hasAttemptedNo, setHasAttemptedNo] = useState<boolean>(false);
  const [soundOn, setSoundOn] = useState<boolean>(true);

  // Preload all memory photos on mount to eliminate white flashes
  useEffect(() => {
    experience.photos.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Sync audio state
  useEffect(() => {
    soundFX.enabled = soundOn;
  }, [soundOn]);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    soundFX.enabled = next;
    if (next) soundFX.playSqueak();
  };

  // Stage Transitions
  const handleStart = () => {
    soundFX.playBubblePop();
    setStage('words');
    setWordIndex(0);
  };

  const handleNextWord = () => {
    if (wordIndex < experience.words.length - 1) {
      setWordIndex((prev) => prev + 1);
    } else {
      soundFX.playSparkle();
      setStage('question');
    }
  };

  const handleNo = () => {
    setHasAttemptedNo(true);
    setStage('no');
  };

  const handleTryAgain = () => {
    setStage('question');
  };

  const handleYes = () => {
    setStage('processing');
  };

  const handleProcessingComplete = () => {
    setStage('success');
  };

  const handleProceedToMemories = () => {
    setStage('memories');
  };

  const handleFinishMemories = () => {
    setStage('final');
  };

  const handleReplay = () => {
    setStage('home');
    setWordIndex(0);
    setHasAttemptedNo(false);
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-gradient-to-b from-[#180825] via-[#290844] to-[#120320] text-white flex flex-col items-center justify-between overflow-x-hidden font-sans selection:bg-pink-500 selection:text-white">
      {/* Dreamy Floating Hearts & Sparkles Particles */}
      <FloatingHearts />

      {/* Discreet Audio Control at Top Right */}
      <div className="fixed top-3 right-3 z-30">
        <button
          onClick={toggleSound}
          type="button"
          aria-label={soundOn ? 'Mute sound' : 'Unmute sound'}
          className={`p-2 rounded-full backdrop-blur-xl border transition-all active:scale-90 cursor-pointer shadow-md ${
            soundOn
              ? 'bg-pink-500/20 border-pink-400/40 text-pink-300 shadow-[0_0_12px_rgba(244,63,142,0.4)]'
              : 'bg-black/30 border-white/20 text-white/50 hover:bg-black/50'
          }`}
        >
          {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Main Single Page Stage Flow */}
      <main className="w-full flex-1 flex items-center justify-center">
        {stage === 'home' && (
          <HomeScreen
            brand={experience.brand}
            subtitle={experience.subtitle}
            nickname={experience.nickname}
            introQuestion={experience.introQuestion}
            startButtonText={experience.startButtonText}
            photos={experience.photos}
            photoCardLabel={experience.photoCardLabel}
            photoCardSubtext={experience.photoCardSubtext}
            onStart={handleStart}
          />
        )}

        {stage === 'words' && (
          <WordSequence
            words={experience.words}
            currentIndex={wordIndex}
            onNext={handleNextWord}
          />
        )}

        {stage === 'question' && (
          <QuestionScreen
            prefixText={experience.questionPrompt.prefix}
            mainText={experience.questionPrompt.text}
            yesButtonText={experience.questionPrompt.yesText}
            noButtonText={experience.questionPrompt.noText}
            hasAttemptedNo={hasAttemptedNo}
            onYes={handleYes}
            onNo={handleNo}
          />
        )}

        {stage === 'no' && (
          <NoScreen
            heading={experience.noFeedback.heading}
            subheading={experience.noFeedback.subheading}
            reassurance={experience.noFeedback.reassurance}
            tryAgainButtonText={experience.noFeedback.tryAgainText}
            onTryAgain={handleTryAgain}
          />
        )}

        {stage === 'processing' && (
          <ProcessingScreen
            heading={experience.processing.heading}
            durationMs={experience.processing.durationMs}
            steps={experience.processing.steps}
            onComplete={handleProcessingComplete}
          />
        )}

        {stage === 'success' && (
          <SuccessScreen
            title={experience.success.title}
            message={experience.success.message}
            tagline={experience.success.tagline}
            promptText={experience.success.promptText}
            onProceedToMemories={handleProceedToMemories}
          />
        )}

        {stage === 'memories' && (
          <MemorySlideshow
            photos={experience.photos}
            messages={experience.memoryMessages}
            onFinish={handleFinishMemories}
          />
        )}

        {stage === 'final' && (
          <FinalScreen
            finalPhoto={experience.photos[0]}
            title={experience.final.title}
            subtitle={experience.final.subtitle}
            message={experience.final.message}
            submessage={experience.final.submessage}
            replayText={experience.final.replayText}
            nickname={experience.nickname}
            onReplay={handleReplay}
          />
        )}
      </main>
    </div>
  );
}
