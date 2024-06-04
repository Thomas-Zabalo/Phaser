import animation from "../animation/animation.js";
import deplacement from "../animation/joueur.js";
import sprite from "../animation/sprite.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super('game');
    }

    preload() {
        // Load Map
        this.load.image("Mur", "/src/assets/textures/wall/textures-factory.png");

        this.load.tilemapTiledJSON("carte", "/src/assets/maps/level1.json");

        sprite.call(this);
    }


    create() {
            const carteDuNiveau = this.add.tilemap("carte");

          const murTileset = carteDuNiveau.addTilesetImage("Theone", "Mur");
            const murLayer = carteDuNiveau.createLayer("plateformes", [murTileset], 0, 0);

            murLayer.setCollisionByProperty({ collides: true });

        // Création du joueur
        this.player = this.physics.add.sprite(0, -200, 'idle').setScale(2);
        this.player.setSize(10, 35);
        this.player.setOffset(10, 13)
        this.player.setCollideWorldBounds(true);
        // Création des animations
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
         
        // this.physics.add.collider(this.player, murLayer);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.jumpButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }


    createAnimations() {
        animation.call(this);
    }

    update() {
        deplacement.call(this)
        
    }


}

