export default class Main extends Phaser.Scene {
    constructor() {
        super('Main');
    }

    preload() {
        this.load.spritesheet('biker', `/src/assets/characters/biker/Idle1.png`, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('cyborg', `/src/assets/characters/cyborg/Idle1.png`, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('punk', `/src/assets/characters/punk/Idle1.png`, { frameWidth: 48, frameHeight: 48 });
    }

    create() {
        // Créer les animations
        this.createAnimations();

        // Créer les sprites animés au-dessus des boutons
        const bikerSprite = this.add.sprite(95, 150, 'biker').play('bikerAnim').setScale(2);
        const cyborgSprite = this.add.sprite(255, 150, 'cyborg').play('cyborgAnim').setScale(2);
        const punkSprite = this.add.sprite(415, 150, 'punk').play('punkAnim').setScale(2);

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