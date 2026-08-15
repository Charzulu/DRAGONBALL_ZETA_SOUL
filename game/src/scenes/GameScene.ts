import * as Phaser from 'phaser';
import { Player } from '../entities/Player';
import { Mob } from '../entities/Mob';
import { NPC } from '../entities/NPC';
import { TrainingUI } from '../ui/TrainingUI';

export class GameScene extends Phaser.Scene {
    private player!: Player;
    private obstacles!: Phaser.Physics.Arcade.StaticGroup;
    private dummy!: Phaser.GameObjects.Image;
    private mobs: Mob[] = [];
    private trainingUI!: TrainingUI;
    private statsText!: Phaser.GameObjects.Text;

    private playerStats = {
        strength: 10,
        ki: 10,
        agility: 10
    };

    constructor() {
        super('GameScene');
    }

    create(data: { charData: any }) {
        this.obstacles = this.physics.add.staticGroup();

        // Create basic map layout
        this.createMap();

        // Create player using modular parts
        this.player = new Player(this, 400, 300, data.charData);

        // Create an NPC
        const npc = new NPC(this, 500, 300, {
            skin: 'skin_dark',
            hair: 'hair_bald',
            scar: 'scar_eye'
        });

        // Create some mobs (boars)
        for (let i = 0; i < 5; i++) {
            const bx = 100 + Math.random() * 200;
            const by = 100 + Math.random() * 400;
            const boar = new Mob(this, bx, by, 'boar');
            this.mobs.push(boar);
            this.physics.add.collider(boar, this.obstacles);
            this.physics.add.collider(boar, this.player);
        }

        // Setup Training UI & Interaction
        this.trainingUI = new TrainingUI(this, (method) => this.startTrainingMiniGame(method));

        // Collisions
        this.physics.add.collider(this.player, this.obstacles);
        this.physics.add.collider(this.player, npc);

        this.cameras.main.setZoom(2);

        // Let's position UI text near the player or closer to screen center so it's visible with zoom
        // or just accept it's a prototype and the floating text handles feedback for now.
        // Actually, let's fix it by adding a simple UI Camera.
        this.cameras.add(0, 0, 800, 600);

        // Add some UI
        const titleText = this.add.text(10, 10, 'Training Facility / Hunting Ground', {
            fontSize: '16px',
            color: '#fff',
            backgroundColor: '#000'
        }).setScrollFactor(0);

        this.statsText = this.add.text(10, 30, this.getStatsString(), {
            fontSize: '14px',
            color: '#0f0',
            backgroundColor: '#000'
        }).setScrollFactor(0);

        this.cameras.main.ignore([titleText, this.statsText]);
        if (this.trainingUI) {
            this.cameras.main.ignore(this.trainingUI);
        }

        // Interaction key
        const interactKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        interactKey.on('down', () => this.tryInteract());
    }

    createMap() {
        // Simple procedural-like map generation for the "Island"
        // 0 = grass, 1 = wall, 2 = floor (training room), 3 = water
        const mapData = [];
        const width = 40;
        const height = 30;

        for (let y = 0; y < height; y++) {
            const row = [];
            for (let x = 0; x < width; x++) {
                // Borders are water
                if (x === 0 || y === 0 || x === width - 1 || y === height - 1) {
                    row.push(3);
                }
                // Training facility structure
                else if (x >= 10 && x <= 20 && y >= 10 && y <= 20) {
                    if (x === 10 || x === 20 || y === 10 || y === 20) {
                        row.push(1); // wall
                    } else {
                        row.push(2); // floor
                    }
                }
                // Grass outside
                else {
                    row.push(0);
                }
            }
            mapData.push(row);
        }

        // Entrance to training facility
        mapData[20][15] = 2;
        mapData[20][16] = 2;

        // We can just use one layer and map indices to tiles manually for simplicity in this demo
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const val = mapData[y][x];
                let texture = 'grass';
                if (val === 1) texture = 'wall';
                if (val === 2) texture = 'floor';
                if (val === 3) texture = 'water';

                const tile = this.add.image(x * 32 + 16, y * 32 + 16, texture);
                if (val === 1 || val === 3) {
                    this.obstacles.add(tile); // static body for walls and water
                }
            }
        }

        // Add a training dummy inside the facility
        this.dummy = this.add.image(15 * 32 + 16, 15 * 32 + 16, 'dummy');
        this.physics.add.existing(this.dummy, true);
        this.obstacles.add(this.dummy);
    }

    getStatsString() {
        return `Str: ${this.playerStats.strength} | Ki: ${this.playerStats.ki} | Agi: ${this.playerStats.agility}\nPress 'E' near dummy to train.`;
    }

    tryInteract() {
        const dist = Phaser.Math.Distance.Between(
            this.player.x, this.player.y,
            this.dummy.x, this.dummy.y
        );

        if (dist < 40) {
            this.trainingUI.open();
        }
    }

    startTrainingMiniGame(method: string) {
        // Placeholder for the actual mini-game execution.
        // For now, it just simulates completing the mini-game instantly and applying multipliers.
        console.log(`Starting ${method} mini-game...`);

        // Let's pretend they won the minigame
        let resultText = '';

        if (method === 'reflex') {
            this.playerStats.strength += Math.floor(10 * 1.1); // 10% bonus for reflex/button mashing
            resultText = 'Trained Reflex! Strength increased (+11)';
        } else if (method === 'math') {
            this.playerStats.ki += Math.floor(10 * 50.0); // 5000% bonus for educational/math
            resultText = 'Trained Math! Ki increased (+500)';
        } else if (method === 'typing') {
            this.playerStats.agility += Math.floor(10 * 3.0); // 300% bonus for typing
            resultText = 'Trained Typing! Agility increased (+30)';
        }

        this.statsText.setText(this.getStatsString());

        const floatText = this.add.text(this.player.x, this.player.y - 40, resultText, {
            fontSize: '12px',
            color: '#ffff00',
            stroke: '#000',
            strokeThickness: 3
        }).setOrigin(0.5);

        this.tweens.add({
            targets: floatText,
            y: floatText.y - 30,
            alpha: 0,
            duration: 2000,
            onComplete: () => floatText.destroy()
        });
    }

    update(time: number, delta: number) {
        this.player.update();

        for (const mob of this.mobs) {
            mob.update(time, delta);
        }
    }
}
