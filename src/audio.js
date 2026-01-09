// Audio utilities for countdown sounds using Web Audio API
let audioContext = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

// Play a beep sound with specified frequency and duration
export function playBeep(frequency = 440, duration = 0.1, volume = 0.3) {
  try {
    const ctx = getAudioContext();

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch (e) {
    console.warn('Audio playback failed:', e);
  }
}

// Play countdown tick based on remaining time - accelerates towards the end
export function playCountdownTick(secondsRemaining, totalDuration = 60) {
  if (secondsRemaining <= 0) return;

  try {
    const ctx = getAudioContext();

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

    for (let i = 0; i < numBeeps; i++) {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Slightly vary frequency for each beep in sequence
      oscillator.frequency.value = baseFreq + (i * 50);
      oscillator.type = 'sine';

      const startTime = ctx.currentTime + (i * beepSpacing);
      gainNode.gain.setValueAtTime(volume, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + beepDuration);

      oscillator.start(startTime);
      oscillator.stop(startTime + beepDuration);
    }
  } catch (e) {
    console.warn('Audio playback failed:', e);
  }
}

// Play success sound (correct guess)
export function playSuccessSound() {
  try {
    const ctx = getAudioContext();

    // Play ascending notes
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      const startTime = ctx.currentTime + i * 0.1;
      gainNode.gain.setValueAtTime(0.3, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.2);
    });
  } catch (e) {
    console.warn('Audio playback failed:', e);
  }
}

// Play skip sound
export function playSkipSound() {
  playBeep(200, 0.2, 0.3);
}

// Play round end buzzer
export function playRoundEndSound() {
  try {
    const ctx = getAudioContext();

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = 220;
    oscillator.type = 'square';

    gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.8);
  } catch (e) {
    console.warn('Audio playback failed:', e);
  }
}

// Play game win fanfare
export function playWinSound() {
  try {
    const ctx = getAudioContext();

    // Play victory fanfare
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      const startTime = ctx.currentTime + i * 0.15;
      gainNode.gain.setValueAtTime(0.4, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.4);
    });
  } catch (e) {
    console.warn('Audio playback failed:', e);
  }
}
