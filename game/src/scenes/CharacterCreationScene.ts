import * as Phaser from 'phaser';
import { db } from '../firebase/mock';

export class CharacterCreationScene extends Phaser.Scene {
    private currentSkin = 0;
    private currentHair = 0;
    private currentScar = 0;

    private skins = ['skin_light', 'skin_dark', 'skin_green'];
    private hairs = ['hair_spiky_black', 'hair_spiky_blonde', 'hair_bald'];
    private scars = ['scar_none', 'scar_eye'];

    private skinSprite!: Phaser.GameObjects.Sprite;
    private hairSprite!: Phaser.GameObjects.Sprite;
    private scarSprite!: Phaser.GameObjects.Sprite;

    constructor() {
        super('CharacterCreationScene');
    }

    async create() {
        this.add.text(400, 100, 'Character Customization', { fontSize: '32px' }).setOrigin(0.5);

        // Preview container
        const previewX = 400;
        const previewY = 250;

        // Scale up the character for preview
        this.skinSprite = this.add.sprite(previewX, previewY, this.skins[0]).setScale(4);
        this.hairSprite = this.add.sprite(previewX, previewY, this.hairs[0]).setScale(4);
        this.scarSprite = this.add.sprite(previewX, previewY, this.scars[0]).setScale(4);

        // Try to load existing data
        const savedData: any = await db.loadCharacter();
        if (savedData) {
            this.currentSkin = this.skins.indexOf(savedData.skin) >= 0 ? this.skins.indexOf(savedData.skin) : 0;
            this.currentHair = this.hairs.indexOf(savedData.hair) >= 0 ? this.hairs.indexOf(savedData.hair) : 0;
            this.currentScar = this.scars.indexOf(savedData.scar) >= 0 ? this.scars.indexOf(savedData.scar) : 0;
            this.updatePreview();
        }

        // UI Controls
        this.createCycleButton(250, 400, 'Skin', () => {
            this.currentSkin = (this.currentSkin + 1) % this.skins.length;
            this.updatePreview();
        });

        this.createCycleButton(400, 400, 'Hair', () => {
            this.currentHair = (this.currentHair + 1) % this.hairs.length;
            this.updatePreview();
        });

        this.createCycleButton(550, 400, 'Scar', () => {
            this.currentScar = (this.currentScar + 1) % this.scars.length;
            this.updatePreview();
        });

        // Save & Play Button
        const playBtn = this.add.text(400, 500, 'Save & Play', {
            fontSize: '24px',
            color: '#fff',
            backgroundColor: '#0a0',
            padding: { x: 15, y: 10 }
        }).setOrigin(0.5).setInteractive();

        playBtn.on('pointerdown', async () => {
            const charData = {
                skin: this.skins[this.currentSkin],
                hair: this.hairs[this.currentHair],
                scar: this.scars[this.currentScar]
            };
            await db.saveCharacter(charData);
            this.scene.start('GameScene', { charData });
        });
    }

    updatePreview() {
        this.skinSprite.setTexture(this.skins[this.currentSkin]);
        this.hairSprite.setTexture(this.hairs[this.currentHair]);
        this.scarSprite.setTexture(this.scars[this.currentScar]);
    }

    createCycleButton(x: number, y: number, label: string, callback: () => void) {
        this.add.text(x, y - 30, label, { fontSize: '20px' }).setOrigin(0.5);
        const btn = this.add.text(x, y, 'Change', {
            fontSize: '18px',
            backgroundColor: '#444',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5).setInteractive();

        btn.on('pointerdown', callback);
    }
}
