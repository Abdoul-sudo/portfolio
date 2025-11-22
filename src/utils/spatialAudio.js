/**
 * Spatial Audio System for Metaball Interactions
 *
 * Creates satisfying, musical tones when cursor approaches metaballs.
 * Each metaball has a unique note creating an instrument-like experience.
 */

// Musical notes for each metaball (pentatonic scale - always sounds good)
const METABALL_NOTES = [
  { note: 'C4', frequency: 261.63 },  // [0] Light Blue
  { note: 'E4', frequency: 329.63 },  // [1] Coral/Pink
  { note: 'G4', frequency: 392.00 },  // [2] Purple/Lavender
  { note: 'A4', frequency: 440.00 },  // [3] Mint Green
];

class SpatialAudioSystem {
  constructor() {
    this.audioContext = null;
    this.masterGain = null;
    this.isEnabled = false;
    this.isInitialized = false;
    this.activeOscillators = new Map();
    this.lastProximities = [0, 0, 0, 0];

    // Audio settings
    this.settings = {
      maxVolume: 0.25,        // Maximum volume per note
      attackTime: 0.08,       // Fade in time
      releaseTime: 0.3,       // Fade out time
      proximityThreshold: 1.8, // Distance to start hearing
      waveType: 'sine',       // Clean, soft tone
    };
  }

  /**
   * Initialize the audio context (must be called after user interaction)
   */
  async init() {
    if (this.isInitialized) return true;

    try {
      // Create audio context
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

      // Create master gain for volume control
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = 0.5;
      this.masterGain.connect(this.audioContext.destination);

      // Create a gentle reverb/delay effect for spaciousness
      this.convolver = await this.createReverb();
      if (this.convolver) {
        this.convolver.connect(this.masterGain);
      }

      this.isInitialized = true;
      console.log('[SpatialAudio] Initialized successfully');
      return true;
    } catch (error) {
      console.warn('[SpatialAudio] Failed to initialize:', error);
      return false;
    }
  }

  /**
   * Create a simple reverb effect using convolution
   */
  async createReverb() {
    try {
      const convolver = this.audioContext.createConvolver();

      // Generate impulse response for reverb
      const sampleRate = this.audioContext.sampleRate;
      const length = sampleRate * 1.5; // 1.5 second reverb
      const impulse = this.audioContext.createBuffer(2, length, sampleRate);

      for (let channel = 0; channel < 2; channel++) {
        const channelData = impulse.getChannelData(channel);
        for (let i = 0; i < length; i++) {
          // Exponential decay
          channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 3);
        }
      }

      convolver.buffer = impulse;
      return convolver;
    } catch (error) {
      console.warn('[SpatialAudio] Reverb creation failed:', error);
      return null;
    }
  }

  /**
   * Enable/disable audio
   */
  setEnabled(enabled) {
    this.isEnabled = enabled;

    if (!enabled) {
      // Stop all active sounds
      this.stopAllSounds();
    }

    // Resume audio context if it was suspended
    if (enabled && this.audioContext?.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  /**
   * Toggle audio on/off
   */
  toggle() {
    this.setEnabled(!this.isEnabled);
    return this.isEnabled;
  }

  /**
   * Update sounds based on cursor proximity to each metaball
   * @param {Array<number>} proximities - Array of proximity values (0-1) for each metaball
   */
  updateProximities(proximities) {
    if (!this.isEnabled || !this.isInitialized || !this.audioContext) return;

    proximities.forEach((proximity, index) => {
      if (index >= METABALL_NOTES.length) return;

      const wasClose = this.lastProximities[index] > 0.1;
      const isClose = proximity > 0.1;

      // Trigger sound on entering proximity
      if (isClose && !wasClose) {
        this.playNote(index, proximity);
      }
      // Update volume based on proximity
      else if (isClose) {
        this.updateNoteVolume(index, proximity);
      }
      // Fade out when leaving
      else if (wasClose && !isClose) {
        this.fadeOutNote(index);
      }

      this.lastProximities[index] = proximity;
    });
  }

  /**
   * Play a note for a specific metaball
   */
  playNote(index, proximity) {
    if (!this.audioContext) return;

    // Stop any existing oscillator for this index first
    if (this.activeOscillators.has(index)) {
      this.stopNoteImmediately(index);
    }

    const noteConfig = METABALL_NOTES[index];
    const now = this.audioContext.currentTime;

    // Create oscillator
    const oscillator = this.audioContext.createOscillator();
    oscillator.type = this.settings.waveType;
    oscillator.frequency.value = noteConfig.frequency;

    // Create gain for this note
    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = 0;

    // Add slight detune for richness
    oscillator.detune.value = Math.random() * 10 - 5;

    // Connect: oscillator -> gain -> reverb (if available) -> master
    oscillator.connect(gainNode);
    if (this.convolver) {
      // Mix dry and wet signals
      const dryGain = this.audioContext.createGain();
      const wetGain = this.audioContext.createGain();
      dryGain.gain.value = 0.7;
      wetGain.gain.value = 0.3;

      gainNode.connect(dryGain);
      gainNode.connect(wetGain);
      dryGain.connect(this.masterGain);
      wetGain.connect(this.convolver);
    } else {
      gainNode.connect(this.masterGain);
    }

    // Fade in
    const targetVolume = this.calculateVolume(proximity);
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(targetVolume, now + this.settings.attackTime);

    // Start oscillator
    oscillator.start(now);

    // Store reference
    this.activeOscillators.set(index, { oscillator, gainNode });
  }

  /**
   * Update volume of an active note based on proximity
   */
  updateNoteVolume(index, proximity) {
    const active = this.activeOscillators.get(index);
    if (!active || !this.audioContext) return;

    // Don't update if fading out
    if (active.isFading) return;

    const targetVolume = this.calculateVolume(proximity);
    const now = this.audioContext.currentTime;

    active.gainNode.gain.cancelScheduledValues(now);
    active.gainNode.gain.setValueAtTime(active.gainNode.gain.value, now);
    active.gainNode.gain.linearRampToValueAtTime(targetVolume, now + 0.05);
  }

  /**
   * Fade out and stop a note
   */
  fadeOutNote(index) {
    const active = this.activeOscillators.get(index);
    if (!active || !this.audioContext) return;

    const now = this.audioContext.currentTime;

    // Mark as fading to prevent updates
    active.isFading = true;

    active.gainNode.gain.cancelScheduledValues(now);
    active.gainNode.gain.setValueAtTime(active.gainNode.gain.value, now);
    active.gainNode.gain.linearRampToValueAtTime(0, now + this.settings.releaseTime);

    // Store timeout reference for cleanup
    const timeoutId = setTimeout(() => {
      this.cleanupOscillator(index, active);
    }, this.settings.releaseTime * 1000 + 50);

    active.timeoutId = timeoutId;
  }

  /**
   * Stop a note immediately without fade (for fast transitions)
   */
  stopNoteImmediately(index) {
    const active = this.activeOscillators.get(index);
    if (!active) return;

    // Clear any pending timeout
    if (active.timeoutId) {
      clearTimeout(active.timeoutId);
    }

    this.cleanupOscillator(index, active);
  }

  /**
   * Cleanup oscillator resources
   */
  cleanupOscillator(index, active) {
    if (!active) return;

    try {
      active.oscillator.stop();
    } catch (e) {
      // Ignore if already stopped
    }

    try {
      active.oscillator.disconnect();
      active.gainNode.disconnect();
    } catch (e) {
      // Ignore disconnect errors
    }

    this.activeOscillators.delete(index);
  }

  /**
   * Calculate volume based on proximity (0-1)
   */
  calculateVolume(proximity) {
    // Exponential curve for more natural feel
    return Math.pow(proximity, 1.5) * this.settings.maxVolume;
  }

  /**
   * Stop all active sounds immediately
   */
  stopAllSounds() {
    this.activeOscillators.forEach((active, index) => {
      this.stopNoteImmediately(index);
    });
    // Reset proximities
    this.lastProximities = [0, 0, 0, 0];
  }

  /**
   * Fade out all active sounds gracefully (for section changes, focus loss)
   */
  fadeAllSounds() {
    this.activeOscillators.forEach((active, index) => {
      this.fadeOutNote(index);
    });
    // Reset proximities
    this.lastProximities = [0, 0, 0, 0];
  }

  /**
   * Set master volume (0-1)
   */
  setMasterVolume(volume) {
    if (this.masterGain) {
      this.masterGain.gain.value = Math.max(0, Math.min(1, volume));
    }
  }

  /**
   * Cleanup resources
   */
  destroy() {
    this.stopAllSounds();
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    this.isInitialized = false;
    this.isEnabled = false;
  }
}

// Singleton instance
export const spatialAudio = new SpatialAudioSystem();

// Export class for testing
export { SpatialAudioSystem };
