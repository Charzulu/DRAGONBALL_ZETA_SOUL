import * as Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Character parts
        this.load.image('skin_light', 'assets/character/skin_light.png');
        this.load.image('skin_dark', 'assets/character/skin_dark.png');
        this.load.image('skin_green', 'assets/character/skin_green.png');

        this.load.image('hair_spiky_blonde', 'assets/character/hair_spiky_blonde.png');
        this.load.image('hair_spiky_black', 'assets/character/hair_spiky_black.png');
        this.load.image('hair_bald', 'assets/character/hair_bald.png');

        this.load.image('scar_none', 'assets/character/scar_none.png');
        this.load.image('scar_eye', 'assets/character/scar_eye.png');

        // Environment
        this.load.image('grass', 'assets/env/grass.png');
        this.load.image('water', 'assets/env/water.png');
        this.load.image('floor', 'assets/env/floor.png');
        this.load.image('wall', 'assets/env/wall.png');
        this.load.image('dummy', 'assets/env/dummy.png');
        this.load.image('boar', 'assets/env/boar.png');
    }

    create() {
        this.scene.start('MainMenuScene');
    }
}
