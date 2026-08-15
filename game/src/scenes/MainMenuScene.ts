import * as Phaser from 'phaser';
import { loginWithGoogle, loginWithApple } from '../firebase/mock';

export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene');
    }

    create() {
        this.add.text(400, 200, 'Island Adventure Demo', {
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5);

        const googleBtn = this.add.text(400, 300, 'Login with Google', {
            fontSize: '24px',
            color: '#00ff00',
            backgroundColor: '#333',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5).setInteractive();

        const appleBtn = this.add.text(400, 360, 'Login with Apple', {
            fontSize: '24px',
            color: '#00ff00',
            backgroundColor: '#333',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5).setInteractive();

        googleBtn.on('pointerdown', async () => {
            await loginWithGoogle();
            this.scene.start('CharacterCreationScene');
        });

        appleBtn.on('pointerdown', async () => {
            await loginWithApple();
            this.scene.start('CharacterCreationScene');
        });
    }
}
