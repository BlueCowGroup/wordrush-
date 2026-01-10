// Audio and haptic feedback utilities
let audioContext = null;
let audioUnlocked = false;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

// Haptic feedback helper - vibrates if supported (not available on iOS)
function vibrate(pattern) {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

// Initialize and unlock audio context - MUST be called on user interaction
export function initAudio() {
  const ctx = getAudioContext();

  // iOS requires resume to be called within user gesture
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  // Play an actual audible sound to fully unlock iOS audio
  // Using a very short, quiet beep instead of silent sound
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.frequency.value = 440;
  oscillator.type = 'sine';

  // Very quiet but audible - this helps iOS unlock audio
  gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.1);

  audioUnlocked = true;
}

// Check if audio is ready
export function isAudioReady() {
  return audioUnlocked && audioContext && audioContext.state === 'running';
}

// Play a beep sound with specified frequency and duration
export function playBeep(frequency = 440, duration = 0.1, volume = 0.3) {
  if (!audioUnlocked) return;

  try {
    const ctx = getAudioContext();

    // Ensure context is running
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    // Use currentTime for immediate playback (iOS-friendly)
    const now = ctx.currentTime;
    gainNode.gain.setValueAtTime(volume, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration);
  } catch (e) {
    console.warn('Audio playback failed:', e);
  }
}

// Play countdown tick based on remaining time - accelerates towards the end
export function playCountdownTick(secondsRemaining, totalDuration = 60) {
  if (secondsRemaining <= 0 || !audioUnlocked) return;

  try {
    const ctx = getAudioContext();

    // Ensure context is running
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Calculate urgency (0 = start of round, 1 = end of round)
    const urgency = 1 - (secondsRemaining / totalDuration);

    // Base frequency increases with urgency (400Hz to 900Hz)
    const baseFreq = 400 + (urgency * 500);

    // Volume increases with urgency (0.15 to 0.5)
    const volume = 0.15 + (urgency * 0.35);

    // Number of beeps per tick increases with urgency
    // 1 beep at start, up to 4 rapid beeps at the end
    const numBeeps = Math.floor(1 + (urgency * urgency * 3));

    // Time between beeps decreases (faster rhythm)
    const beepSpacing = 0.12 - (urgency * 0.08); // 120ms down to 40ms

    // Duration of each beep
    const beepDuration = 0.08 - (urgency * 0.03); // 80ms down to 50ms

    // Haptic feedback - intensity increases with urgency (Android only)
    const vibeDuration = Math.floor(20 + (urgency * 30)); // 20ms to 50ms
    if (numBeeps === 1) {
      vibrate(vibeDuration);
    } else {
      // Create vibration pattern matching beeps
      const vibePattern = [];
      for (let i = 0; i < numBeeps; i++) {
        vibePattern.push(vibeDuration);
        if (i < numBeeps - 1) {
          vibePattern.push(Math.floor(beepSpacing * 1000) - vibeDuration);
        }
      }
      vibrate(vibePattern);
    }

    const now = ctx.currentTime;

    for (let i = 0; i < numBeeps; i++) {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Slightly vary frequency for each beep in sequence
      oscillator.frequency.value = baseFreq + (i * 50);
      oscillator.type = 'sine';

      const startTime = now + (i * beepSpacing);
      gainNode.gain.setValueAtTime(0, now); // Start silent
      gainNode.gain.setValueAtTime(volume, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + beepDuration);

      oscillator.start(now);
      oscillator.stop(startTime + beepDuration + 0.01);
    }
  } catch (e) {
    console.warn('Audio playback failed:', e);
  }
}

// Play success sound (correct guess)
export function playSuccessSound() {
  if (!audioUnlocked) return;

  // Haptic: quick double pulse for success (Android only)
  vibrate([50, 50, 50]);

  try {
    const ctx = getAudioContext();

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // Play ascending notes
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      const startTime = now + i * 0.1;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.setValueAtTime(0.3, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

      oscillator.start(now);
      oscillator.stop(startTime + 0.25);
    });
  } catch (e) {
    console.warn('Audio playback failed:', e);
  }
}

// Play skip sound
export function playSkipSound() {
  if (!audioUnlocked) return;

  // Haptic: single short buzz for skip (Android only)
  vibrate(100);
  playBeep(200, 0.2, 0.3);
}

// Play round end buzzer
export function playRoundEndSound() {
  if (!audioUnlocked) return;

  // Haptic: long vibration for round end (Android only)
  vibrate(500);

  try {
    const ctx = getAudioContext();

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = 220;
    oscillator.type = 'square';

    gainNode.gain.setValueAtTime(0.4, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.8);

    oscillator.start(now);
    oscillator.stop(now + 0.85);
  } catch (e) {
    console.warn('Audio playback failed:', e);
  }
}

// Play game win fanfare
export function playWinSound() {
  if (!audioUnlocked) return;

  // Haptic: celebratory pattern for victory (Android only)
  vibrate([100, 50, 100, 50, 200]);

  try {
    const ctx = getAudioContext();

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // Play victory fanfare
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      const startTime = now + i * 0.15;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.setValueAtTime(0.4, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);

      oscillator.start(now);
      oscillator.stop(startTime + 0.45);
    });
  } catch (e) {
    console.warn('Audio playback failed:', e);
  }
}
