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

// Play countdown tick based on remaining time
export function playCountdownTick(secondsRemaining) {
  if (secondsRemaining <= 0) return;

  if (secondsRemaining <= 10) {
    // Final 10 seconds: urgent high-pitched beeps
    playBeep(880, 0.15, 0.5);
  } else if (secondsRemaining <= 30) {
    // 30-10 seconds: medium urgency
    playBeep(660, 0.12, 0.4);
  } else if (secondsRemaining <= 60) {
    // 60-30 seconds: low urgency
    if (secondsRemaining % 5 === 0) {
      playBeep(440, 0.1, 0.3);
    }
  } else {
    // 90-60 seconds: minimal feedback
    if (secondsRemaining % 10 === 0) {
      playBeep(330, 0.08, 0.2);
    }
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
