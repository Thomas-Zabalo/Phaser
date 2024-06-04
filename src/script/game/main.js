export default class Main extends Phaser.Scene {
    constructor() {
        super('Main');
    }

    preload() {
        this.load.image('biker_card', '/src/assets/textures/ui/selection/biker_card.png')
        this.load.image('cyber_card', '/src/assets/textures/ui/selection/cyborg_card.png')
        this.load.image('punk_card', '/src/assets/textures/ui/selection/punk_card.png')
        this.load.image('button', '/src/assets/textures/ui/selection/button.png')

        this.load.spritesheet('biker', `/src/assets/characters/Biker/Biker_Idle.png`, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('cyborg', `/src/assets/characters/Cyborg/Cyborg_Idle.png`, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('punk', `/src/assets/characters/Punk/Punk_Idle.png`, { frameWidth: 48, frameHeight: 48 });
    }

    create() {
        const sceneWidth = this.cameras.main.width;
        const sceneHeight = this.cameras.main.height;

        // Créer les animations
        this.createAnimations();

        const text1 = this.add.text(sceneWidth / 2, 72, 'select your character', { font: '48px Cyber' });
        text1.setTint(0xFFFFFF);
        text1.setOrigin(0.5, 0);

        const cardKeys = ['biker_card', 'cyber_card', 'punk_card'];

        // Largeur et espacement entre les cartes
        const cardWidth = 200;
        const spacing = 60;

        // Calcul de la largeur totale des cartes et de l'espace disponible pour le spacing
        const totalCardWidth = cardKeys.length * cardWidth;
        const availableWidth = sceneWidth - totalCardWidth - spacing * (cardKeys.length - 1);
        const leftMargin = availableWidth / 2;

        // Position initiale des cartes
        let currentX = leftMargin;

        // Création et positionnement des cartes
        cardKeys.forEach(key => {
            const card = this.add.image(currentX, sceneHeight / 1.9, key).setOrigin(0, 0.5);
            card.setDisplaySize(cardWidth, 260);
            currentX += cardWidth + spacing;
        });

        // Créer les sprites animés au-dessus des boutons
        const bikerSprite = this.add.sprite(185, 300, 'biker').play('bikerAnim').setScale(5);
        const cyborgSprite = this.add.sprite(450, 300, 'cyborg').play('cyborgAnim').setScale(5);
        const punkSprite = this.add.sprite(710, 300, 'punk').play('punkAnim').setScale(5);

        const buttons = [
            { key: 'button', x: sceneWidth / 6, y: 500, name: "Biker" },
            { key: 'button', x: sceneWidth / 2, y: 500, name: "Cyborg" },
            { key: 'button', x: sceneWidth * 0.83, y: 500, name: "Punk" },
        ];

        buttons.forEach(btn => {
            const button = this.add.image(btn.x, btn.y, btn.key).setOrigin(0.5, 0);
            button.setDisplaySize(220, 40);

            button.setInteractive()
                .on('pointerdown', () => {
                    localStorage.setItem('selectedButton', btn.name);
                    this.scene.start('cinematique');
                });

            button.on('pointerover', () => {
                if (!button.shineFX) {
                    button.shineFX = button.postFX.addShine(1, 0.2, 5);
                }

                button.setTint(0xFF8822);
                this.input.setDefaultCursor('pointer');
            });

            button.on('pointerout', () => {
                if (button.shineFX) {
                    button.postFX.remove(button.shineFX);
                    button.shineFX = null;
                }
                
                button.clearTint();
                this.input.setDefaultCursor('default');
            });
        });
    }


    createAnimations() {
        this.anims.create({
            key: 'bikerAnim',
            frames: this.anims.generateFrameNumbers('biker', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'cyborgAnim',
            frames: this.anims.generateFrameNumbers('cyborg', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'punkAnim',
            frames: this.anims.generateFrameNumbers('punk', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        });
    }
}