export default class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    preload() {
        this.load.image("background", '/src/assets/textures/ui/menu/wallpaper.png')
        this.load.image('rectangle', '/src/assets/textures/ui/menu/Rectangle.png');
        this.load.image('play', '/src/assets/textures/ui/menu/play.png');
        this.load.image('load', '/src/assets/textures/ui/menu/load.png');
        this.load.image('settings', '/src/assets/textures/ui/menu/settings.png');
        this.load.image('exit', '/src/assets/textures/ui/menu/exit.png');
    }

    create() {
        let bg = this.add.image(0,0, "background")
        
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

            // Gestion des événements sur les boutons
            button.setInteractive();

            button.on('pointerdown', () => {
                if (btn.key === 'play') {
                    this.scene.start('Main');
                }
                if (btn.key === 'load') {

                }
                if (btn.key === 'settings') {
 
                }
                if (btn.key === 'exit') {

                }
            });

            button.on('pointerover', () => {
                if (!button.shineFX) {
                    button.shineFX = button.postFX.addShine(1, 0.2, 5);
                }
                button.setTint(0xFF8822);
                this.input.setDefaultCursor('pointer');
            });

            button.on('pointerout', () => {
                // Supprimer l'effet de brillance
                if (button.shineFX) {
                    button.postFX.remove(button.shineFX);
                    button.shineFX = null;
                }

                // Restaurer le style du bouton et le curseur
                button.clearTint();
                this.input.setDefaultCursor('default');
            });
        });

    }
}
