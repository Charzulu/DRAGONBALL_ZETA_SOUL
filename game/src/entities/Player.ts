import * as Phaser from 'phaser';
import { Entity } from './Entity';

export class Player extends Entity {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene, x: number, y: number, charData: any) {
        super(scene, x, y);

        const skin = scene.add.sprite(0, 0, charData?.skin || 'skin_light');
        const hair = scene.add.sprite(0, 0, charData?.hair || 'hair_spiky_black');
        const scar = scene.add.sprite(0, 0, charData?.scar || 'scar_none');

        this.add([skin, hair, scar]);

        this.speed = 150;
        this.cursors = scene.input.keyboard!.createCursorKeys();

        scene.cameras.main.startFollow(this);
    }

    update() {
        this.body.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.body.setVelocityX(-this.speed);
        } else if (this.cursors.right.isDown) {
            this.body.setVelocityX(this.speed);
        }

        if (this.cursors.up.isDown) {
            this.body.setVelocityY(-this.speed);
        } else if (this.cursors.down.isDown) {
            this.body.setVelocityY(this.speed);
        }
    }
}
