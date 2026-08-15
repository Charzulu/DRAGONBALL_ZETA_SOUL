import * as Phaser from 'phaser';
import { Entity } from './Entity';

export class NPC extends Entity {
    constructor(scene: Phaser.Scene, x: number, y: number, charData: any) {
        super(scene, x, y);

        const skin = scene.add.sprite(0, 0, charData?.skin || 'skin_dark');
        const hair = scene.add.sprite(0, 0, charData?.hair || 'hair_bald');
        const scar = scene.add.sprite(0, 0, charData?.scar || 'scar_eye');

        this.add([skin, hair, scar]);

        this.body.setImmovable(true);
    }
}
