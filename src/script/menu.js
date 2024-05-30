export default class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    preload() {
        this.load.image('rectangle', '/src/assets/textures/hud/Rectangle.png');
        this.load.image('play', '/src/assets/textures/hud/play.png');
        this.load.image('load', '/src/assets/textures/hud/load.png');
        this.load.image('settings', '/src/assets/textures/hud/settings.png');
        this.load.image('exit', '/src/assets/textures/hud/exit.png');
    }

    create() {
        const sceneWidth = this.cameras.main.width;

        const text1 = this.add.text(sceneWidth / 2, 72, 'CYBER PSYCHOSE', { font: '64px Cyber' });
        text1.setTint(0x02FFE1);
        text1.setOrigin(0.5, 0);


        const text2 = this.add.text(sceneWidth / 2, 70, 'CYBER PSYCHOSE', { font: '64px Cyber' });
        text2.setTint(0xFFF002);
        text2.setOrigin(0.5, 0);


        const background = this.add.image(sceneWidth / 2, 170, 'rectangle').setOrigin(0.5, 0);
        background.setDisplaySize(350, 400);

        const buttons = [
            { key: 'play', x: sceneWidth / 2, y: 240 },
            { key: 'load', x: sceneWidth / 2, y: 300 },
            { key: 'settings', x: sceneWidth / 2, y: 360 },
            { key: 'exit', x: sceneWidth / 2, y: 460 }
        ];

        buttons.forEach(btn => {
            const button = this.add.image(btn.x, btn.y, btn.key).setOrigin(0.5, 0);
            button.setDisplaySize(220, 40);

            button.setInteractive();
            button.on('pointerover', () => {
                this.fx(button);
            });
            button.on('pointerout', () => {
                button.clearTint();
            });

            if (btn.key === 'play') {
                button.on('pointerdown', () => {
                    this.scene.start('Main'); // Naviguer vers la scène 'Main'
                });
            }
        });

        function fx(button) {
            // Ajout de l'effet de brillance
            const fx = button.postFX.addShine(1, 0.2, 5);

            // Effet de Tween pour briller
            this.tweens.add({
                targets: fx,
                duration: 500,
                alpha: 0, // Éteindre la brillance après un certain temps
                onComplete: () => {
                    button.clearTint();
                }
            });
        }

    }

}
