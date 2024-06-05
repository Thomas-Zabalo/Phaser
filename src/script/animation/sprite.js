export default function sprite() {
    // Prochainement créer des boutons pour choisir son personnage du jeux stocké en local 
    let skin = localStorage.getItem("selectedButton");

    this.load.spritesheet('death', `/src/assets/characters/${skin}/${skin}_death.png`, { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet('hurt', `/src/assets/characters/${skin}/${skin}_hurt.png`, { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet('idle', `/src/assets/characters/${skin}/${skin}_idle.png`, { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet('glitch', `/src/assets/characters/${skin}/${skin}_idle-glitch.png`, { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet('jump', `/src/assets/characters/${skin}/${skin}_jump.png`, { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet('punch', `/src/assets/characters/${skin}/${skin}_punch.png`, { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet('run', `/src/assets/characters/${skin}/${skin}_run.png`, { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet('crouch', `/src/assets/characters/${skin}/${skin}_sitdown.png`, { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet('crouch-idle', `/src/assets/characters/${skin}/${skin}_sitdown_idle.png`, { frameWidth: 48, frameHeight: 48 });

}