import * as Phaser from 'phaser';

export class Entity extends Phaser.GameObjects.Container {
    declare public body: Phaser.Physics.Arcade.Body;
    public speed: number = 100;

    constructor(scene: Phaser.Scene, x: number, y: number, children?: Phaser.GameObjects.GameObject[]) {
        super(scene, x, y, children);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setSize(16, 24);
        this.body.setOffset(-8, -12); // Assuming 32x32 center origin sprites
    }
}
