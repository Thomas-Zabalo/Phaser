import animation from "../animation/animation.js";
import deplacement from "../animation/joueur.js";
import sprite from "../animation/sprite.js";

export default class Cinematique extends Phaser.Scene {
    constructor() {
        super('cinematique');
        this.isJumping = false;
        this.fadeTriggered = false;
    }

    preload() {
        this.load.spritesheet("cat_death", "/src/assets/animals/cat/Death.png", { frameWidth: 48, frameHeight: 48 });

        this.load.image("Mur", "/src/assets/textures/wall/textures-factory.png");
        this.load.image("Background", "/src/assets/textures/wall/Background.png");
        this.load.image("Bat1", "/src/assets/textures/wall/Bat1.png");
        this.load.image("Bat2", "/src/assets/textures/wall/Bat2.png");
        this.load.tilemapTiledJSON("carte", "/src/assets/maps/cinematique.json");
        sprite.call(this);
    }

    create() {
        const carteDuNiveau = this.add.tilemap("carte");

        const backgroundImageTileset = carteDuNiveau.addTilesetImage("Background", "Background");
        const Bat1Tileset = carteDuNiveau.addTilesetImage("Bat1", "Bat1");
        const Bat2Tileset = carteDuNiveau.addTilesetImage("Bat2", "Bat2");

        const murTileset = carteDuNiveau.addTilesetImage("textures-factory", "Mur");
        const BackgroundTileset = carteDuNiveau.addTilesetImage("textures-factory", "Mur");
        const SecondTileset = carteDuNiveau.addTilesetImage("textures-factory", "Mur");

        const backgroundImageLayer = carteDuNiveau.createLayer("Img_back", backgroundImageTileset);
        const bat1Layer = carteDuNiveau.createLayer("Bat1", Bat1Tileset);
        const bat2Layer = carteDuNiveau.createLayer("Bat2", Bat2Tileset);
        const backgroundLayer = carteDuNiveau.createLayer("Background", BackgroundTileset);
        const SecondLayer = carteDuNiveau.createLayer("Second_Plan", SecondTileset);
        const murLayer = carteDuNiveau.createLayer("First_Plan", murTileset, 0, 0);

        murLayer.setCollisionByProperty({ collide: true });

        this.player = this.physics.add.sprite(0, 275, 'idle').setScale(1.5);
        this.player.setSize(10, 35);
        this.player.setOffset(10, 13);
        this.player.setCollideWorldBounds(true);

        this.cat = this.add.sprite(175, 175, 'cat_death');

        this.createAnimations();

        this.physics.add.collider(this.player, murLayer);
        this.cameras.main.setBounds(0, 0, carteDuNiveau.widthInPixels, carteDuNiveau.heightInPixels);

        this.physics.world.setBounds(0, 0, carteDuNiveau.widthInPixels, carteDuNiveau.heightInPixels);
        this.cameras.main.setZoom(2);

        this.cameras.main.pan(300, 200, 2000)
        this.time.delayedCall(2000, this.startAutoMovement, [], this);

    }




    createAnimations() {
        animation.call(this);
        this.anims.create({
            key: 'cat_death',
            frames: this.anims.generateFrameNumbers('cat_death', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        });

        this.cat.setFrame(3);
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

    update() {
        // if (this.player.x >= 500 && this.player.y >= 400) {
        //     if (!this.fadeTriggered) {
        //         this.fadeTriggered = true;
        //         this.cameras.main.fadeOut(2000, () => {
        //             this.cameras.main.on('camerafadeoutcomplete', () => {
        //                 this.scene.start('game');
        //             }, this);
        //         });
        //     }
        // }
    }


}
