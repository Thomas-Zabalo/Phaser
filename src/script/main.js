export default class Main extends Phaser.Scene {
    constructor() {
        super('Main');
    }

    preload() {
        // Vous pouvez charger des ressources ici si nécessaire
    }

    // Fonction de création des éléments du jeu
    create() {
        const button1 = this.add.text(400, 200, 'Button 1', { backgroundColor: '#CCCCCC' })
            .setInteractive()
            .on('pointerdown', function () {         
                localStorage.setItem('selectedButton', 'biker');
                this.scene.start('game');
            }, this);

        const button2 = this.add.text(400, 300, 'Button 2', { backgroundColor: '#CCCCCC' })
            .setInteractive()
            .on('pointerdown', function () {
                localStorage.setItem('selectedButton', 'cyborg');
                this.scene.start('game');
            }, this);

        const button3 = this.add.text(400, 400, 'Button 3', { backgroundColor: '#CCCCCC' })
            .setInteractive()
            .on('pointerdown', function () {
                localStorage.setItem('selectedButton', 'punk');
                this.scene.start('game');
            }, this);
    }
}
