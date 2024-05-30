// import Menu from "./menu.js";
import Main from "./main.js";
import Game from "./game.js";

const gameConfig = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: true,
        },
    },
    pixelArt: true,
    antialias: true,
    antialiasGL: true,
    scene: [ Main, Game]
};

export default new Phaser.Game(gameConfig);
