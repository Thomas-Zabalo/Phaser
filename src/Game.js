import Phaser from './lib/phaser.js';

export default class Game extends Phaser.Scene {
    constructor() {
        super('game');
        this.player = null;
        this.cursors = null;
        this.jumpButton = null;
        this.xKey = null;
        this.gameOver = false;
        this.bateau = null;
    }

    preload() {
        //Load image
        this.load.image("Platforms", "/src/assets/Sprites/map/Platforms.png");
        this.load.image("Ship", "/src/assets/Sprites/map/ShipWall.png");
        this.load.image("Exterior", "/src/assets/Sprites/map/WallExterieur.png");
        this.load.image("BgExterior", "/src/assets/Sprites/map/BG Image.png");
        this.load.image("bateau", "/src/assets/Sprites/Ship/Ship.png");

        this.load.image("xIcon", "/src/assets/Sprites/X.png");

        //Load Map
        this.load.tilemapTiledJSON("carte", "/src/assets/map.json");

        //Load Sprite
        this.load.spritesheet('leftidle', 'src/assets/left/Owlet_Monster_Idle_4.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('leftrun', 'src/assets/left/Owlet_Monster_Run_6.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('jumpleft', 'src/assets/right/Owlet_Monster_Jump_8.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('rightidle', 'src/assets/right/Owlet_Monster_Idle_4.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('rightrun', 'src/assets/right/Owlet_Monster_Run_6.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('jumpright', 'src/assets/right/Owlet_Monster_Jump_8.png', { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        //Chargement de la map
        const carteDuNiveau = this.add.tilemap("carte");
        //Chargement des composants ("Nom du fichier, Nom de l'élement appelé dans tiled")
        const platformsTileset = carteDuNiveau.addTilesetImage("Platforms", "Platforms");
        const extTileset = carteDuNiveau.addTilesetImage("Exterior", "Exterior");
        const bgextTileset = carteDuNiveau.addTilesetImage("Background", "BgExterior");
        const shipTileset = carteDuNiveau.addTilesetImage("Ship", "Ship");

        //Création des différents niveau mur, décors, etc...
        const backgroundLayer = carteDuNiveau.createLayer("Background", [shipTileset, bgextTileset]);
        const murLayer = carteDuNiveau.createLayer("Mur", [shipTileset, extTileset]);
        const platformLayer = carteDuNiveau.createLayer("Platform", platformsTileset, 0, 0);

        //Ajout de collision pour les murs
        murLayer.setCollisionByProperty({ collides: true });

        // Ajout du sprite du personnage
        this.player = this.physics.add.sprite(75, 208, 'rightidle');
        //Peu de collision de rebond
        this.player.setBounce(0.1);
        //Définie les collision au monde 
        this.player.setCollideWorldBounds(true);
        // Taille du personnage et de sa hitbox 
        this.player.body.setSize(15, 20).setOffset(7.5, 12);
        //Ajustement de la gravité du personnage
        this.player.body.setGravityY(300);

        // Ajout d'une collision entre le personnage et l'environnement
        this.physics.add.collider(this.player, platformLayer);
        this.physics.add.collider(this.player, murLayer);

        //Ajout d'une image pour montrer une action au joueur 
        this.xIcon = this.add.image(this.player.x + 20, this.player.y - 70, 'xIcon').setVisible(false);
        this.xIcon.setScale(0.5);
        //Ajout d'un bateau 
        this.bateau = this.add.sprite(2200, 250, 'bateau');

        //Ajout d'une collision pour chaque plateforme, car elles ont chacunes une collision différentes de la taille du tileset
        carteDuNiveau.forEachTile((tile) => {
            if (tile.index != -1) {
                let firstObject = platformsTileset.tileData[tile.index - 1].objectgroup.objects[0]
                let colBoxX = tile.pixelX + firstObject.x;
                let colBoxY = tile.pixelY + firstObject.y;
                let colBoxW = firstObject.width;
                let colBoxH = firstObject.height;
                let t = this.add.rectangle(colBoxX + (colBoxW / 2), colBoxY + (colBoxH / 2), colBoxW, colBoxH)
                t.alpha = 0
                this.physics.add.existing(t, true)
                this.physics.add.collider(this.player, t)
            }
        })

        //Définition des touches, déplacements + actions
        this.cursors = this.input.keyboard.createCursorKeys();
        this.jumpButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.xKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

        //Appelle de l'animation du personnage (SPRITE)
        this.createAnimations();
    }



    createAnimations() {
        this.anims.create({
            key: 'walkLeft',
            frames: this.anims.generateFrameNumbers('leftrun', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idleLeft',
            frames: this.anims.generateFrameNumbers('leftidle', { start: 0, end: 3 }),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'jumpLeft',
            frames: this.anims.generateFrameNumbers('jumpleft', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'walkRight',
            frames: this.anims.generateFrameNumbers('rightrun', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idleRight',
            frames: this.anims.generateFrameNumbers('rightidle', { start: 0, end: 3 }),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'jumpRight',
            frames: this.anims.generateFrameNumbers('jumpright', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

    }



    update() {
        //Vitesse de déplacement
        const normalSpeed = 160;

        //Algorithme pour savoir la direction du personnage
        //Si la touche gauche est appuyé alors on va vers la gauche
        if (this.cursors.left.isDown) {
            //On lui ajoute de la vitesse vers un axe -X 
            this.player.setVelocityX(-normalSpeed);
            //On joue l'animation du sprite qui marche vers la gauche
            this.player.anims.play('walkLeft', true);
            //Sinon si la touche droite est appuyé alors on va vers la droite
        } else if (this.cursors.right.isDown) {
            //On lui ajoute de la vitesse vers un axe X 
            this.player.setVelocityX(normalSpeed);
            //On joue l'animation du sprite qui marche vers la gauche
            this.player.anims.play('walkRight', true);
            //Aussi non il bouge pas 
        } else {
            this.player.setVelocityX(0);
            //Algorithme pour savoir l'orientation du personnage
            //Si la derniere animation est vers la droite alors on lance l'animation idleRight
            if (this.player.anims.currentAnim) {
                this.player.anims.play(this.player.anims.currentAnim.key.includes('Left') ? 'idleLeft' : 'idleRight', true);
                //Sinon lance l'animation idleLeft
            }
            else {
                this.player.anims.play('idleRight', true);
            }
        }

        //Vérification de si le joueur appuie sur la barre d'espace pour sauter
        if (this.jumpButton.isDown && this.player.body.blocked.down) {
            //On lui ajoute de la vitesse vers un axe Y 
            this.player.setVelocityY(-250);
            //Si la derniere animation est vers la droite alors on lance l'animation jumpRight sinon on joue jumpLeft 
            if (this.jumpButton.isDown && this.cursors.right.isDown) {
                this.player.anims.play('jumpRight', true);
            } else if (this.jumpButton.isDown && this.cursors.left.isDown) {
                this.player.anims.play('jumpLeft', true);
            }
        }


        //New camera view Premiere zone
        if (this.player.x >= 0 && this.player.x < 630 && this.player.y >= 0 && this.player.y < 320) {
            this.physics.world.setBounds(0, 0);
            this.cameras.main.centerOn(350, 160);
        }

        else if (this.player.x > 630 && this.player.x < 1250 && this.player.y >= 0 && this.player.y < 320) {
            this.physics.world.setBounds(0, 0);
            this.cameras.main.centerOn(950, 160);

        }
        else if (this.player.x >= 1250 && this.player.x < 1790 && this.player.y >= 0 && this.player.y < 320) {
            this.physics.world.setBounds(0, 0);
            this.cameras.main.centerOn(1550, 160);
        }
        else if (this.player.x >= 1790 && this.player.y >= 0 && this.player.y < 320) {
            this.physics.world.setBounds(0, 0);
            this.cameras.main.centerOn(2100, 160);
        }

        //Animation Bateau
        if (this.player.x >= 2110 && this.player.y > 200 && this.player.y < 220) {
            this.xIcon.setX(this.player.x + this.player.width + 5); // Position juste à droite du joueur
            this.xIcon.setY(this.player.y - this.player.height / 2); // Position en haut à droite du joueur
            this.xIcon.setVisible(true);
            if (this.xKey.isDown) {
                this.xIcon.setVisible(false);
                this.cameras.main.fadeOut(1500);

                setTimeout(() => {
                    this.player.setPosition(2200, 225);
                    this.player.body.setVelocity(0, 0);
                    this.player.body.setAllowGravity(false);

                    this.cameras.main.fadeIn(1500);

                    setTimeout(() => {
                        this.tweens.add({
                            targets: [this.player, this.bateau],
                            x: '+=200',
                            ease: 'Linear',
                            duration: 5000,
                            onComplete: () => {
                                this.cameras.main.fadeOut(1500);

                                setTimeout(() => {
                                    // Teleportation du joueur
                                    this.player.setPosition(125, 465);
                                    this.physics.world.setBounds(0, 0);
                                    this.cameras.main.centerOn(350, 480);
                                    this.cameras.main.fadeIn(1500);

                                    this.player.body.setAllowGravity(true);
                                    this.player.body.setGravityY(300);
                                }, 1500);
                            }
                        });
                    }, 1500);
                }, 2000);
            }
        } else {
            this.xIcon.setVisible(false);
        }

        //New camera view Deuxième zone
        if (this.player.x >= 0 && this.player.x < 630 && this.player.y >= 620 && this.player.y < 625) {
            this.physics.world.setBounds(0, 0);
            this.cameras.main.centerOn(350, 780);
        }
    }

}
