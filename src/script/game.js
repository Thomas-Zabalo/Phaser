import animation from "./animation/animation.js";
import deplacement from "./animation/joueur.js";
import sprite from "./animation/sprite.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super('game');
    }

    preload() {
        // Load Map
        this.load.image("Mur", "/src/assets/textures/wall/textures-factory.png");

        this.load.tilemapTiledJSON("carte", "/src/assets/maps/map2con.json");

        sprite.call(this);
    }
    

    create() {
        const carteDuNiveau = this.add.tilemap("carte");
    
      const murTileset = carteDuNiveau.addTilesetImage("textures-factorylebon", "Mur");
        const murLayer = carteDuNiveau.createLayer("Calque de Tuiles 1", murTileset, 0, 0);
    
        murLayer.setCollisionByProperty({ solid: true });
    
        // Création du joueur
        this.player = this.physics.add.sprite(0, 300, 'rightidle');
        this.player.setSize(10, 42);
        this.player.setOffset(10, 10)
        this.player.setCollideWorldBounds(true);
        // Création des animations
        this.createAnimations();

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

