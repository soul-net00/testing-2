/**
 * Central Experience Configuration
 * Pure configuration object for the Bestie 💕 interactive friendship experience.
 */

export interface ExperienceConfig {
  nickname: string;
  brand: string;
  subtitle: string;
  introQuestion: string;
  startButtonText: string;
  photoCardLabel: string;
  photoCardSubtext: string;
  words: string[];
  questionPrompt: {
    prefix: string;
    text: string;
    yesText: string;
    noText: string;
  };
  noFeedback: {
    heading: string;
    subheading: string;
    reassurance: string;
    tryAgainText: string;
  };
  processing: {
    heading: string;
    durationMs: number;
    steps: string[];
  };
  success: {
    title: string;
    message: string;
    tagline: string;
    promptText: string;
  };
  memoryMessages: string[];
  final: {
    title: string;
    subtitle: string;
    message: string;
    submessage: string;
    replayText: string;
  };
  photos: string[];
}

export const experience: ExperienceConfig = {
  nickname: "my Labubu",
  brand: "BESTIE 💕",
  subtitle: "A special question just for you 💕",
  introQuestion: "Would you be my best friend?",
  startButtonText: "Start 💕 →",
  photoCardLabel: "BESTIE MEMORY 💕",
  photoCardSubtext: "Our favorite memories ✨💕",

  words: [
    "Will",
    "you",
    "be",
    "my",
    "best",
    "friend?"
  ],

  photos: [
    "/assets/photo_1_2026-10-05_20-20-49.jpg",
    "/assets/photo_2026-10-05_20-24-44.jpg",
    "/assets/photo_2026-10-05_20-24-49.jpg",
    "/assets/photo_2026-10-05_20-24-53.jpg"
  ],

  questionPrompt: {
    prefix: "So…",
    text: "will you be my best friend?",
    yesText: "YES 💕✨",
    noText: "NO 😭"
  },

  noFeedback: {
    heading: "HUH?! 😭",
    subheading: "Wrong answer 😂💕",
    reassurance: "Are you sureeee? 🥺",
    tryAgainText: "Try again 💕"
  },

  processing: {
    heading: "Processing friendship… 💕",
    durationMs: 4500,
    steps: [
      "Checking compatibility…",
      "Matching vibes…",
      "Saving our memories…",
      "Installing unlimited gossip…",
      "Activating bestie mode…",
      "Friendship verified 💕"
    ]
  },

  success: {
    title: "FRIENDSHIP ACCEPTED! 💕",
    message: "You are officially my best friend!",
    tagline: "Besties forever 🫶💕",
    promptText: "Look at us 🥹💕"
  },

  memoryMessages: [
    "From random moments…",
    "to unforgettable memories…",
    "through every laugh…",
    "every crazy moment…",
    "every little memory…",
    "I’m glad it was with you 💕"
  ],

  final: {
    title: "BESTIES FOREVER 💕",
    subtitle: "Friendship officially activated ✨",
    message: "Besties forever 💕",
    submessage: "More memories together. More laughs. More everything. 🫶",
    replayText: "Replay our story ↻"
  }
};
