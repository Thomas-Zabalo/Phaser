export default class Game extends Phaser.Scene {
    constructor() {
        super('game');
    }

    preload() {
        //Prochainement créer des boutons pour choisir son personnage du jeux stocké en local 
        let skin = localStorage.getItem("selectedButton");

        this.load.spritesheet('leftidle', `/src/assets/characters/${skin}/Idle1.png`, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('leftrun', `/src/assets/characters/${skin}/Run1.png`, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('leftjump', `/src/assets/characters/${skin}/Jump1.png`, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('leftsitdown', `/src/assets/characters/${skin}/Sitdown1.png`, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('leftwalk', `/src/assets/characters/${skin}/Walk1.png`, { frameWidth: 48, frameHeight: 48 });
        // Right side
        this.load.spritesheet('rightidle', `/src/assets/characters/${skin}/Idle2.png`, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('rightrun', `/src/assets/characters/${skin}/Run2.png`, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('rightjump', `/src/assets/characters/${skin}/Jump2.png`, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('rightsitdown', `/src/assets/characters/${skin}/Sitdown2.png`, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('rightwalk', `/src/assets/characters/${skin}/Walk2.png`, { frameWidth: 48, frameHeight: 48 });
    }

    create() {
        // Création du joueur
        this.player = this.add.sprite(75, 208, 'leftrun');

        // Création des animations
        this.createAnimations();
    }

    createAnimations() {
        this.anims.create({
            key: 'leftidle',
            frames: this.anims.generateFrameNumbers('leftidle', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'leftrun',
            frames: this.anims.generateFrameNumbers('leftrun', { start: 0, end: 2 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'leftjump',
            frames: this.anims.generateFrameNumbers('leftjump', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'leftsitdown',
            frames: this.anims.generateFrameNumbers('leftsitdown', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'leftwalk',
            frames: this.anims.generateFrameNumbers('leftwalk', { start: 0, end: 5 }),
            frameRate: 6,
            repeat: -1
        });


        this.anims.create({
            key: 'rightidle',
            frames: this.anims.generateFrameNumbers('rightidle', { start: 3, end: 0 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'rightrun',
            frames: this.anims.generateFrameNumbers('rightrun', { start: 5, end: 0 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'rightjump',
            frames: this.anims.generateFrameNumbers('rightjump', { start: 3, end: 0 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'rightsitdown',
            frames: this.anims.generateFrameNumbers('rightsitdown', { start: 3, end: 0 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'rightwalk',
            frames: this.anims.generateFrameNumbers('rightwalk', { start: 5, end: 0 }),
            frameRate: 6,
            repeat: -1
        });

    }




    update() {
        this.player.anims.play('leftidle', true);
    }

}
