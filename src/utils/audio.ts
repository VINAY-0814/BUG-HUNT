// Synthesized Web Audio API sound effects and chiptune BGM generator for Bug Hunter
class SoundEffects {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isMusicOn: boolean = false;
  private musicTimer: any = null;
  private musicStep: number = 0;

  constructor() {
    const saved = localStorage.getItem('bughunter_muted');
    if (saved !== null) {
      this.isMuted = saved === 'true';
    }
    const savedMusic = localStorage.getItem('bughunter_music');
    if (savedMusic !== null) {
      this.isMusicOn = savedMusic === 'true';
    }
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    localStorage.setItem('bughunter_muted', String(muted));
    if (muted && this.isMusicOn) {
      this.stopMusic();
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public getMusicOn(): boolean {
    return this.isMusicOn;
  }

  public toggleMusic(): boolean {
    this.isMusicOn = !this.isMusicOn;
    localStorage.setItem('bughunter_music', String(this.isMusicOn));
    if (this.isMusicOn && !this.isMuted) {
      this.startMusic();
    } else {
      this.stopMusic();
    }
    return this.isMusicOn;
  }

  // Chiptune Safari Adventure Background Loop
  public startMusic() {
    if (this.isMuted || !this.isMusicOn) return;
    this.initCtx();
    if (!this.ctx) return;
    if (this.musicTimer) clearInterval(this.musicTimer);

    // Safari adventure chord progression in C pentatonic / Dorian
    // C4 - E4 - G4 - A4 - G4 - E4 - D4 - C4
    const notes = [
      261.63, 329.63, 392.00, 440.00, 
      392.00, 329.63, 293.66, 261.63,
      329.63, 392.00, 523.25, 440.00,
      392.00, 329.63, 293.66, 329.63
    ];
    const bassNotes = [130.81, 164.81, 196.00, 146.83];

    this.musicTimer = setInterval(() => {
      if (this.isMuted || !this.isMusicOn) {
        this.stopMusic();
        return;
      }
      try {
        const leadFreq = notes[this.musicStep % notes.length];
        this.playTone(leadFreq, 'triangle', 0.12, 0.025);

        // Add subtle bass pulse on every 4th step
        if (this.musicStep % 4 === 0) {
          const bassIdx = Math.floor(this.musicStep / 4) % bassNotes.length;
          this.playTone(bassNotes[bassIdx], 'sine', 0.28, 0.035);
        }
        this.musicStep = (this.musicStep + 1) % 64;
      } catch {
        // audio context interrupted
      }
    }, 220); // 136 BPM feel
  }

  public stopMusic() {
    if (this.musicTimer) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
  }

  public playTone(freq: number, type: OscillatorType, duration: number, gainValue = 0.1) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainValue, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // AudioContext may be blocked
    }
  }

  // Key click
  public playKey() {
    this.playTone(340 + Math.random() * 80, 'sine', 0.03, 0.02);
  }

  // Click on code gutter to flag suspect bug line
  public playGutterClick() {
    this.playTone(520, 'sine', 0.05, 0.04);
    setTimeout(() => this.playTone(780, 'triangle', 0.08, 0.05), 40);
  }

  // Laser zap when executing tests
  public playLaser() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {
      // ignore
    }
  }

  // Run initiated
  public playRun() {
    this.playLaser();
  }

  // Coin collected chime
  public playCoin() {
    this.playTone(987.77, 'sine', 0.08, 0.05); // B5
    setTimeout(() => this.playTone(1318.51, 'sine', 0.18, 0.06), 70); // E6
  }

  // Specimen trapped in jar celebration bubble sound
  public playSpecimenTrapped() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [440, 554.37, 659.25, 880, 1108.73];
      notes.forEach((f, i) => {
        setTimeout(() => this.playTone(f, 'sine', 0.15, 0.07), i * 50);
      });
    } catch {
      // ignore
    }
  }

  // Combo streak chime
  public playCombo() {
    this.playTone(600, 'square', 0.08, 0.04);
    setTimeout(() => this.playTone(800, 'square', 0.08, 0.05), 60);
    setTimeout(() => this.playTone(1200, 'square', 0.15, 0.06), 120);
  }

  // Boss Damage / Explosion
  public playBossHit() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch {
      // ignore
    }
  }

  // PowerUp Activated (Shield / Overclock / X-Ray)
  public playPowerUp() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      [400, 600, 900, 1200].forEach((freq, idx) => {
        setTimeout(() => this.playTone(freq, 'triangle', 0.12, 0.06), idx * 60);
      });
    } catch {
      // ignore
    }
  }

  // Test passed fanfare
  public playSuccess() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 'sine', 0.25, 0.08);
        }, idx * 80);
      });
    } catch {
      // AudioContext blocked
    }
  }

  // Test failure buzz
  public playError() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(80, this.ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch {
      // AudioContext blocked
    }
  }

  // Hint unlocked
  public playHint() {
    this.playTone(660, 'sine', 0.1, 0.06);
    setTimeout(() => this.playTone(880, 'sine', 0.15, 0.06), 80);
  }

  // Lost a life
  public playHeartLost() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      this.playTone(300, 'square', 0.12, 0.06);
      setTimeout(() => this.playTone(200, 'square', 0.2, 0.07), 120);
    } catch {
      // AudioContext blocked
    }
  }

  // Boss Alert
  public playBossAlert() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      [220, 260, 220, 260].forEach((freq, idx) => {
        setTimeout(() => this.playTone(freq, 'sawtooth', 0.15, 0.08), idx * 140);
      });
    } catch {
      // ignore
    }
  }
}

export const soundManager = new SoundEffects();
