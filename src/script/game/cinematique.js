import animation from "../animation/animation.js";
import deplacement from "../animation/joueur.js";
import sprite from "../animation/sprite.js";

export default class Cinematique extends Phaser.Scene {
    constructor() {
        super('cinematique');
    }

    preload() {
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

        // Set collision properties for the wall layer
        murLayer.setCollisionByProperty({ collide: true });

        this.player = this.physics.add.sprite(0, 0, 'idle').setScale(2);
        this.player.setSize(10, 40);
        this.player.setOffset(10, 10);
        this.player.setCollideWorldBounds(true);

        // Create animations
        this.createAnimations();

        // Add collider between the player and the wall layer
        this.physics.add.collider(this.player, murLayer);

        // Camera follow player and set bounds to the size of the tilemap
        this.cameras.main.startFollow(this.player);

        // Set the bounds of the camera to the size of the tilemap
        this.cameras.main.setBounds(0, 0, carteDuNiveau.widthInPixels, carteDuNiveau.heightInPixels);

        // Set the bounds of the world to the size of the tilemap
        this.physics.world.setBounds(0, 0, carteDuNiveau.widthInPixels, carteDuNiveau.heightInPixels);

        // Set the initial zoom level of the camera
        this.cameras.main.setZoom(2);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.jumpButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    createAnimations() {
        animation.call(this);
    }

    update() {
        // Add player movement controls
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.jumpButton.isDown && this.player.body.blocked.down) {
            this.player.setVelocityY(-300);
        }
    }
}
