// Audio and haptic feedback utilities - iOS-optimized
let audioContext = null;

// Get or create audio context
function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

// Ensure audio context is ready - call before every sound
async function ensureAudioReady() {
  const ctx = getAudioContext();

  if (ctx.state === 'suspended') {
    try {
      await ctx.resume();
    } catch (e) {
      console.warn('Failed to resume audio context:', e);
      return false;
    }
  }

  return ctx.state === 'running';
}

// Haptic feedback helper - vibrates if supported (not available on iOS)
function vibrate(pattern) {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

// Initialize and unlock audio context - call on user interaction
export async function initAudio() {
  const ctx = getAudioContext();

  try {
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    // Play an audible beep to fully unlock iOS audio
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = 440;
    oscillator.type = 'sine';

    const now = ctx.currentTime;
    gainNode.gain.setValueAtTime(0.05, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    oscillator.start(now);
    oscillator.stop(now + 0.1);

    return true;
  } catch (e) {
    console.warn('Failed to init audio:', e);
    return false;
  }
}

// Play a simple beep - single oscillator, immediate playback
export async function playBeep(frequency = 440, duration = 0.1, volume = 0.3) {
  if (!await ensureAudioReady()) return;

  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    const now = ctx.currentTime;
    gainNode.gain.setValueAtTime(volume, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration + 0.05);
  } catch (e) {
    console.warn('Audio playback failed:', e);
  }
}

// Play countdown tick - simplified for iOS reliability
export async function playCountdownTick(secondsRemaining, totalDuration = 60) {
  if (secondsRemaining <= 0) return;
  if (!await ensureAudioReady()) return;

  try {
    const ctx = getAudioContext();

    // Calculate urgency (0 = start, 1 = end)
    const urgency = 1 - (secondsRemaining / totalDuration);

    // Frequency increases with urgency (400Hz to 800Hz)
    const frequency = 400 + (urgency * 400);

    // Volume increases with urgency (0.2 to 0.5)
    const volume = 0.2 + (urgency * 0.3);

    // Duration gets shorter (100ms to 60ms)
    const duration = 0.1 - (urgency * 0.04);

    // Haptic feedback (Android only)
    const vibeDuration = Math.floor(20 + (urgency * 30));
    vibrate(vibeDuration);

    // Single reliable beep
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    const now = ctx.currentTime;
    gainNode.gain.setValueAtTime(volume, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration + 0.05);

    // Add extra beeps for high urgency (last 15 seconds)
    if (secondsRemaining <= 15) {
      const extraBeeps = secondsRemaining <= 5 ? 2 : 1;
      for (let i = 1; i <= extraBeeps; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.frequency.value = frequency + (i * 100);
        osc.type = 'sine';

        const startTime = now + (i * 0.08);
        gain.gain.setValueAtTime(0, now);
        gain.gain.setValueAtTime(volume * 0.8, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration * 0.8);

        osc.start(now);
        osc.stop(startTime + duration + 0.05);
      }
    }
  } catch (e) {
    console.warn('Tick audio failed:', e);
  }
}

// Play success sound (correct guess)
export async function playSuccessSound() {
  if (!await ensureAudioReady()) return;

  vibrate([50, 50, 50]);

  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Three ascending notes
    const notes = [523, 659, 784]; // C5, E5, G5

    notes.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      const startTime = now + (i * 0.12);
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.setValueAtTime(0.35, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);

      oscillator.start(now);
      oscillator.stop(startTime + 0.2);
    });
  } catch (e) {
    console.warn('Success sound failed:', e);
  }
}

// Play skip sound
export async function playSkipSound() {
  if (!await ensureAudioReady()) return;

  vibrate(100);

  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = 200;
    oscillator.type = 'sine';

    const now = ctx.currentTime;
    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

    oscillator.start(now);
    oscillator.stop(now + 0.25);
  } catch (e) {
    console.warn('Skip sound failed:', e);
  }
}

// Play round end buzzer
export async function playRoundEndSound() {
  if (!await ensureAudioReady()) return;

  vibrate(500);

  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = 220;
    oscillator.type = 'square';

    const now = ctx.currentTime;
    gainNode.gain.setValueAtTime(0.4, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.6);

    oscillator.start(now);
    oscillator.stop(now + 0.65);
  } catch (e) {
    console.warn('Round end sound failed:', e);
  }
}

// Play game win fanfare
export async function playWinSound() {
  if (!await ensureAudioReady()) return;

  vibrate([100, 50, 100, 50, 200]);

  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Victory fanfare
    const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6

    notes.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      const startTime = now + (i * 0.15);
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.setValueAtTime(0.4, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.35);

      oscillator.start(now);
      oscillator.stop(startTime + 0.4);
    });
  } catch (e) {
    console.warn('Win sound failed:', e);
  }
}
