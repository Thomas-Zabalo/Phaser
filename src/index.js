import Phaser from './lib/phaser.js';
import Game from './Game.js';

const game = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 700,
    height: 320,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
        }
    },
    pixelArt: true,
    scene: [Game]
};


export default new Phaser.Game(game);
