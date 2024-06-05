import Menu from "./game/menu.js";
import Main from "./game/main.js";
import Game from "./game/game.js";
import Cinematique from "./game/cinematique.js";

const gameConfig = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            // debug: true,
        },
    },
    pixelArt: true,
    // antialias: true,
    // antialiasGL: true,
    // scene: [Cinematique]
    scene: [Menu, Main, Cinematique, Game]
};

export default new Phaser.Game(gameConfig);
