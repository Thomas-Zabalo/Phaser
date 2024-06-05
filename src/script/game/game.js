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
        this.load.image("Mur-90", "/src/assets/textures/wall/textures-factory-90.png");
        this.load.image("Mur-180", "/src/assets/textures/wall/textures-factory-180.png");
        this.load.image("Mur-270", "/src/assets/textures/wall/textures-factory-270.png");
        this.load.image("Mur-Mirror", "/src/assets/textures/wall/textures-factory-mirror.png");

        this.load.tilemapTiledJSON("carte", "/src/assets/maps/level1.json");

        sprite.call(this);
    }


    create() {

        const carteDuNiveau = this.add.tilemap("carte");
         
        const murTileset = carteDuNiveau.addTilesetImage("Theone", "Mur");
        const murMirrorTileset = carteDuNiveau.addTilesetImage("textures-factory-mirror", "Mur-Mirror");
        const mur90Tileset = carteDuNiveau.addTilesetImage("textures-factory-90", "Mur-90");
        const mur180Tileset = carteDuNiveau.addTilesetImage("textures-factory-180", "Mur-180");
        const mur270Tileset = carteDuNiveau.addTilesetImage("textures-factory-270", "Mur-270");
        
        
        const murs = [murTileset, murMirrorTileset, mur90Tileset, mur180Tileset, mur270Tileset];

        const murLayer = carteDuNiveau.createLayer("plateformes", murs, 0, 0);
        const objectsLayer = carteDuNiveau.createLayer("objets-1plan", murs, 0, 0);

        
    
    
        murLayer.setCollisionByProperty({ collides: true });

        // Création du joueur
        this.player = this.physics.add.sprite(0, -200, 'idle').setScale(1.5);
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
        this.cameras.main.fadeIn(2000);
        
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

