export default function sprite() {
    // Prochainement créer des boutons pour choisir son personnage du jeux stocké en local 
    let skin = localStorage.getItem("selectedButton");

    this.load.spritesheet('rightidle', `/src/assets/characters/${skin}/Idle1.png`, { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet('rightrun', `/src/assets/characters/${skin}/Run1.png`, { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet('rightjump', `/src/assets/characters/${skin}/Jump1.png`, { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet('rightsitdown', `/src/assets/characters/${skin}/Sitdown1.png`, { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet('rightwalk', `/src/assets/characters/${skin}/Walk1.png`, { frameWidth: 48, frameHeight: 48 });
}