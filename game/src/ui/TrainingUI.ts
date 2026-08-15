import * as Phaser from 'phaser';

export class TrainingUI extends Phaser.GameObjects.Container {
    private isOpen: boolean = false;
    private onTrainCallback: (method: string) => void;

    constructor(scene: Phaser.Scene, onTrain: (method: string) => void) {
        super(scene, 400, 300); // center of camera
        this.setScrollFactor(0); // fix to camera
        this.onTrainCallback = onTrain;

        scene.add.existing(this);

        // Background panel
        const bg = scene.add.rectangle(0, 0, 400, 300, 0x222222, 0.9);
        bg.setStrokeStyle(4, 0x00ff00);
        this.add(bg);

        // Title
        const title = scene.add.text(0, -120, 'Select Training Method', {
            fontSize: '24px', color: '#fff'
        }).setOrigin(0.5);
        this.add(title);

        // Options
        const options = [
            { text: 'Reflex (Button Mash) -> Strength (+10%)', method: 'reflex' },
            { text: 'Math (Educational) -> Ki/Mental (+5000%)', method: 'math' },
            { text: 'Typing -> Agility (+300%)', method: 'typing' }
        ];

        options.forEach((opt, idx) => {
            const btn = scene.add.text(0, -50 + (idx * 50), opt.text, {
                fontSize: '18px',
                color: '#fff',
                backgroundColor: '#555',
                padding: { x: 10, y: 5 }
            }).setOrigin(0.5).setInteractive();

            btn.on('pointerdown', () => {
                this.close();
                this.onTrainCallback(opt.method);
            });

            this.add(btn);
        });

        // Close button
        const closeBtn = scene.add.text(0, 120, 'Cancel', {
            fontSize: '18px',
            color: '#f00',
            backgroundColor: '#444',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5).setInteractive();

        closeBtn.on('pointerdown', () => this.close());
        this.add(closeBtn);

        this.setVisible(false);
    }

    open() {
        if (!this.isOpen) {
            this.isOpen = true;
            this.setVisible(true);
            // Disable movement keys or pause game if needed
        }
    }

    close() {
        if (this.isOpen) {
            this.isOpen = false;
            this.setVisible(false);
            // Enable keys again
        }
    }
}
