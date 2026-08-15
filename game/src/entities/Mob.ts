import * as Phaser from 'phaser';
import { Entity } from './Entity';

export class Mob extends Entity {
    private moveTimer: number = 0;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y);

        const sprite = scene.add.sprite(0, 0, texture);
        this.add(sprite);

        this.speed = 50; // Mobs are slower
    }

    update(_time: number, delta: number) {
        this.moveTimer += delta;

        // Change direction every 2 seconds
        if (this.moveTimer > 2000) {
            this.moveTimer = 0;
            const dir = Math.floor(Math.random() * 5); // 0-4

            this.body.setVelocity(0);

            switch (dir) {
                case 0: this.body.setVelocityY(-this.speed); break; // up
                case 1: this.body.setVelocityY(this.speed); break; // down
                case 2: this.body.setVelocityX(-this.speed); break; // left
                case 3: this.body.setVelocityX(this.speed); break; // right
                case 4: this.body.setVelocity(0); break; // idle
            }
        }
    }
}
