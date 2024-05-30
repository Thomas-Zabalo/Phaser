export default class Main extends Phaser.Scene {
    constructor() {
        super('Main');
    }

    preload() {
        this.load.image('biker_card', '/src/assets/textures/ui/selection/biker_card.png')
        this.load.image('cyber_card', '/src/assets/textures/ui/selection/cyborg_card.png')
        this.load.image('punk_card', '/src/assets/textures/ui/selection/punk_card.png')

        this.load.spritesheet('biker', `/src/assets/characters/biker/Idle1.png`, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('cyborg', `/src/assets/characters/cyborg/Idle1.png`, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('punk', `/src/assets/characters/punk/Idle1.png`, { frameWidth: 48, frameHeight: 48 });
    }

    create() {
        // Créer les animations
        this.createAnimations();

        const sceneWidth = this.cameras.main.width;
        const sceneHeight = this.cameras.main.height;

        const cardKeys = ['biker_card', 'cyber_card', 'punk_card'];

        // Largeur et espacement entre les cartes
        const cardWidth = 200;
        const spacing = 60;

        const totalCardWidth = cardKeys.length * cardWidth;
        const availableWidthCard = sceneWidth - totalCardWidth - spacing * (cardKeys.length - 1);
        const leftMarginCard = availableWidthCard / 2;

        // Position initiale des cartes
        let currentXCard = leftMarginCard;

        // Création et positionnement des cartes
        cardKeys.forEach(key => {
            const card = this.add.image(currentXCard, sceneHeight / 2, key).setOrigin(0, 0.5);
            card.setDisplaySize(cardWidth, 300);
            currentXCard += cardWidth + spacing;
        });


        const spriteKeys = ['biker', 'cyborg', 'punk'];

        const spriteWidth = 64; 

        const totalSpriteWidth = spriteKeys.length * spriteWidth;
        const availableWidthSpirte = sceneWidth - totalSpriteWidth - spacing * (spriteKeys.length - 1);
        const leftMarginSprite = availableWidthSpirte / 2;

        // Position initiale des cartes
        let currentXSprite = leftMarginSprite;

        // Création et positionnement des sprites
        spriteKeys.forEach(key => {
            const sprite = this.add.sprite(currentXSprite, 100, key).setScale(5);
            sprite.anims.play(key + 'Anim');
            currentXSprite += spriteWidth + spacing;
        });

        // Créer les boutons
        const button1 = this.add.text(40, 200, 'Button 1', { backgroundColor: '#CCCCCC' })
            .setInteractive()
            .on('pointerdown', () => {
                localStorage.setItem('selectedButton', 'biker');
                this.scene.start('game');
            });

        const button2 = this.add.text(200, 200, 'Button 2', { backgroundColor: '#CCCCCC' })
            .setInteractive()
            .on('pointerdown', () => {
                localStorage.setItem('selectedButton', 'cyborg');
                this.scene.start('game');
            });

        const button3 = this.add.text(360, 200, 'Button 3', { backgroundColor: '#CCCCCC' })
            .setInteractive()
            .on('pointerdown', () => {
                localStorage.setItem('selectedButton', 'punk');
                this.scene.start('game');
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