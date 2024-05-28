export default class Main extends Phaser.Scene {
    constructor() {
        super('Main');
    }

    preload() {
    }
 
    create() {
        const button1 = this.add.text(40, 200, 'Button 1', { backgroundColor: '#CCCCCC' })
            .setInteractive()
            .on('pointerdown', function () {
                localStorage.setItem('selectedButton', 'biker');
                this.scene.start('game');
            }, this);

        const button2 = this.add.text(200, 200, 'Button 2', { backgroundColor: '#CCCCCC' })
            .setInteractive()
            .on('pointerdown', function () {
                localStorage.setItem('selectedButton', 'cyborg');
                this.scene.start('game');
            }, this);

        const button3 = this.add.text(360, 200, 'Button 3', { backgroundColor: '#CCCCCC' })
            .setInteractive()
            .on('pointerdown', function () {
                localStorage.setItem('selectedButton', 'punk');
                this.scene.start('game');
            }, this);

    }
}
