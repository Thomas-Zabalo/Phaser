import animation from "./animation/animation.js";
import sprite from "./animation/sprite.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super('game');
    }

    preload() {
        sprite.call(this);
    }

    create() {
        // Création du joueur
        this.player = this.physics.add.sprite(0, 300, 'leftrun').setOrigin(0);
        this.player.setSize(20, 42);
        this.player.setCollideWorldBounds(true);
        // Création des animations
        this.createAnimations();

        // Définition des offsets initiaux
        this.offsetXLeft = 0;
        this.offsetXRight = 24;
        this.offsetY = 10;

        this.cursors = this.input.keyboard.createCursorKeys();
        this.jumpButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    createAnimations() {
        animation.call(this);
    }

    update() {
        const normalSpeed = 160;
        const isJumping = !this.player.body.blocked.down;

        if (this.cursors.right.isDown) {
            this.player.setVelocityX(normalSpeed);
            if (!isJumping) {
                this.player.anims.play('rightrun', true);
                this.player.setOffset(this.offsetXRight, this.offsetY);
            }
        } else {
            this.player.setVelocityX(0);
            if (!isJumping) {
                this.player.anims.play('rightidle', true);
                this.player.setOffset(this.offsetXRight, this.offsetY);
            }
        }

        if (this.jumpButton.isDown && this.player.body.blocked.down) {
            this.player.setVelocityY(-250);
        }

        if (isJumping) {
            if (this.player.anims.currentAnim && this.player.anims.currentAnim.key.includes('right')) {
                this.player.anims.play('rightjump', true);
                this.player.setOffset(this.offsetXRight, this.offsetY); 
            }
        }
    }

}
