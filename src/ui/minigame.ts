export class KiChargeMinigame {
  isActive = false;
  private container: HTMLDivElement | null = null;
  private cursor: HTMLDivElement | null = null;
  private targetZone: HTMLDivElement | null = null;
  private animFrameId: number | null = null;
  private onCompleteCallback: ((success: boolean) => void) | null = null;

  private startTime = 0;
  private duration = 1500; // ms for one full sweep back and forth

  private keyListener = (e: KeyboardEvent) => {
    if (!this.isActive) return;
    if (e.code === 'Space' || e.code === 'KeyF') {
      e.preventDefault();
      this.evaluate();
    }
  };

  constructor() {
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', this.keyListener);
    }
  }

  start(onComplete: (success: boolean) => void) {
    if (this.isActive) return;
    this.isActive = true;
    this.onCompleteCallback = onComplete;
    if (typeof document !== 'undefined') {
      this.createUI();
      this.startTime = performance.now();
      this.tick();
    } else {
      // headless test bypass: immediately call success synchronously
      this.close(true);
    }
  }

  private createUI() {
    this.container = document.createElement('div');
    this.container.id = 'ki-charge-minigame';

    const title = document.createElement('div');
    title.className = 'ki-title';
    title.innerText = 'Ki Charge!';

    const bar = document.createElement('div');
    bar.className = 'ki-bar';

    this.targetZone = document.createElement('div');
    this.targetZone.className = 'ki-target';
    // Target zone is typically in the middle 30% for a "sweet spot"
    this.targetZone.style.left = '35%';
    this.targetZone.style.width = '30%';

    this.cursor = document.createElement('div');
    this.cursor.className = 'ki-cursor';

    const hint = document.createElement('div');
    hint.className = 'ki-hint';
    hint.innerText = 'Press F or Space to strike!';

    bar.appendChild(this.targetZone);
    bar.appendChild(this.cursor);
    this.container.appendChild(title);
    this.container.appendChild(bar);
    this.container.appendChild(hint);

    const ui = document.getElementById('ui') || document.body;
    ui.appendChild(this.container);
  }

  private tick = () => {
    if (!this.isActive || !this.cursor) return;

    if (typeof performance === 'undefined' || typeof requestAnimationFrame === 'undefined') return;
    const now = performance.now();
    const elapsed = now - this.startTime;
    const progress = (elapsed % this.duration) / this.duration; // 0 to 1

    // Triangle wave for ping-pong effect
    // progress 0 to 0.5: cursor goes 0% to 100%
    // progress 0.5 to 1.0: cursor goes 100% to 0%
    let pos = 0;
    if (progress <= 0.5) {
      pos = progress * 2;
    } else {
      pos = 1 - (progress - 0.5) * 2;
    }

    this.cursor.style.left = `${pos * 100}%`;
    this.animFrameId = requestAnimationFrame(this.tick);
  };

  private evaluate() {
    if (!this.isActive || !this.cursor) return;

    // Determine success based on cursor position vs targetZone position
    // Target is 35% to 65%
    const cursorLeft = parseFloat(this.cursor.style.left);
    const success = cursorLeft >= 35 && cursorLeft <= 65;

    // Show visual feedback briefly before closing
    if (this.targetZone) {
       this.targetZone.style.backgroundColor = success ? 'rgba(46, 204, 113, 0.8)' : 'rgba(231, 76, 60, 0.8)';
    }

    if (typeof setTimeout !== 'undefined') {
      setTimeout(() => {
        this.close(success);
      }, 200); // 200ms delay for feedback
    } else {
      this.close(success);
    }
  }

  private close(success: boolean) {
    this.isActive = false;
    if (this.animFrameId !== null && typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.container) {
      this.container.remove();
      this.container = null;
    }
    if (this.onCompleteCallback) {
      this.onCompleteCallback(success);
      this.onCompleteCallback = null;
    }
  }
}

export const minigame = new KiChargeMinigame();
