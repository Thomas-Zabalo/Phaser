import animation from "../animation/animation.js";
import sprite from "../animation/sprite.js";

export default class Cinematique extends Phaser.Scene {
    constructor() {
        super('cinematique');
        this.isJumping = false;
        this.fadeTriggered = false;
    }

    preload() {
        this.load.spritesheet("cat_death", "/src/assets/animals/cat/Death.png", { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet("bird_idle", "/src/assets/animals/bird/Idle.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("bird_fly", "/src/assets/animals/bird/Walk.png", { frameWidth: 32, frameHeight: 32 });

        this.load.image("Mur", "/src/assets/textures/wall/textures-factorylebon.png");
        this.load.image("Background", "/src/assets/textures/wall/Background.png");
        this.load.image("Bat1", "/src/assets/textures/wall/Bat1.png");
        this.load.image("Bat2", "/src/assets/textures/wall/Bat2.png");
        this.load.tilemapTiledJSON("carte", "/src/assets/maps/cinematique.json");
        sprite.call(this);
    }

    create() {
        // Create the tilemap and layers
        const carteDuNiveau = this.add.tilemap("carte");

        this.backgroundImageTileset = carteDuNiveau.addTilesetImage("Background", "Background");
        this.Bat1Tileset = carteDuNiveau.addTilesetImage("Bat1", "Bat1");
        this.Bat2Tileset = carteDuNiveau.addTilesetImage("Bat2", "Bat2");

        this.murTileset = carteDuNiveau.addTilesetImage("textures-factory", "Mur");
        this.BackgroundTileset = carteDuNiveau.addTilesetImage("textures-factory", "Mur");
        this.SecondTileset = carteDuNiveau.addTilesetImage("textures-factory", "Mur");

        this.backgroundImageLayer = carteDuNiveau.createLayer("Img_back", this.backgroundImageTileset);
        this.bat1Layer = carteDuNiveau.createLayer("Bat1", this.Bat1Tileset);
        this.bat2Layer = carteDuNiveau.createLayer("Bat2", this.Bat2Tileset);
        this.backgroundLayer = carteDuNiveau.createLayer("Background", this.BackgroundTileset);
        this.SecondLayer = carteDuNiveau.createLayer("Second_Plan", this.SecondTileset);
        this.murLayer = carteDuNiveau.createLayer("First_Plan", this.murTileset, 0, 0);

        this.murLayer.setCollisionByProperty({ collide: true });

        this.player = this.physics.add.sprite(0, 275, 'idle').setScale(1.5);
        this.player.setSize(10, 35);
        this.player.setOffset(10, 13);
        this.player.setCollideWorldBounds(true);

        this.cat = this.add.sprite(175, 175, 'cat_death');
        this.birds = [
            this.add.sprite(280, 305, 'bird_idle'),
            this.add.sprite(300, 305, 'bird_idle')
        ];

        this.createAnimations();

        this.physics.add.collider(this.player, this.murLayer);
        this.cameras.main.setBounds(0, 0, carteDuNiveau.widthInPixels, carteDuNiveau.heightInPixels);

        this.physics.world.setBounds(0, 0, carteDuNiveau.widthInPixels, carteDuNiveau.heightInPixels);
        this.cameras.main.setZoom(2);

        this.cameras.main.pan(300, 200, 2000);
        this.time.delayedCall(2000, this.startAutoMovement, [], this);

        // Store the tilemap reference for destruction later
        this.carteDuNiveau = carteDuNiveau;
    }



    createAnimations() {
        animation.call(this);
        this.anims.create({
            key: 'cat_death',
            frames: this.anims.generateFrameNumbers('cat_death', { start: 0, end: 7 }),
            frameRate: 6,
            repeat: -1
        });
        this.cat.play("cat_death");

        this.anims.create({
            key: 'bird_idle',
            frames: this.anims.generateFrameNumbers('bird_idle', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        });

        const birdAnimationDelay = 200;

        for (let i = 0; i < this.birds.length; i++) {
            this.birds[i].play("bird_idle");

            // Ajouter un délai à l'animation de l'oiseau actuel
            this.time.delayedCall(i * birdAnimationDelay, () => {
                this.birds[i].anims.play("bird_idle");
            });
        }

        this.anims.create({
            key: 'bird_fly',
            frames: this.anims.generateFrameNumbers('bird_fly', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        });
    }


    startAutoMovement() {
        this.tweens.add({
            targets: this.player,
            x: 340,
            duration: 2000,
            onUpdate: () => {
                if (!this.isJumping) {
                    this.player.anims.play('run', true);
                }
            },
            onComplete: () => {
                this.player.anims.play('idle', true);

                this.time.delayedCall(500, () => {
                    this.player.anims.play('glitch', true);
                    this.cameras.main.shake(50);

                    this.time.delayedCall(100, () => {
                        this.player.anims.play('idle', true);

                        this.time.delayedCall(500, () => {
                            this.player.anims.play('glitch', true);
                            this.cameras.main.shake(50);

                            this.time.delayedCall(100, () => {
                                this.player.anims.play('idle', true);
                                this.time.delayedCall(1000, this.startJump, [], this);
                            }, [], this);
                        }, [], this);
                    }, [], this);
                }, [], this);
            },
            callbackScope: this
        });
    }

    startJump() {
        this.isJumping = true;
        this.player.anims.play('jump', true);
        this.time.addEvent({
            delay: 0,
            callback: () => {
                this.player.setVelocityY(-200);
                this.tweens.add({
                    targets: this.player,
                    x: this.player.x + 200,
                    duration: 1500,
                    onComplete: () => {
                        this.player.setVelocityY(0);
                        this.isJumping = false;
                        this.player.anims.play('idle', true);
                    }
                });
            },
            callbackScope: this
        });
    }

    makeBirdFly(bird) {
        this.tweens.add({
            targets: bird,
            x: bird.x + 250,
            y: bird.y - 150,
            duration: 1500,
            onComplete: () => {
                bird.anims.stop();
                bird.setVisible(false);
            }
        });
    }


    update() {
        for (let i = 0; i < this.birds.length; i++) {
            const playerBirdDistance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.birds[i].x, this.birds[i].y);

            if (playerBirdDistance < 70 && !this.birds[i].flightTriggered) {
                this.birds[i].flightTriggered = true;
                this.birds[i].anims.play('bird_fly', true);
                this.makeBirdFly(this.birds[i]);
            }
        }

        if (this.player.x >= 500 && this.player.y >= 400) {
            if (!this.fadeTriggered) {
                this.fadeTriggered = true;
                this.cameras.main.fadeOut(2000, 0, 0, 0, () => {
                    this.cameras.main.once('camerafadeoutcomplete', () => {
                        this.scene.start('game');
                    }, this);
                });
            }
        }
    }

}
