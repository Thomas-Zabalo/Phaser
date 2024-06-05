export default function animation() {
    this.anims.create({
        key: 'death',
        frames: this.anims.generateFrameNumbers('death', { start: 0, end: 5 }),
        frameRate: 6,
        repeat: -1
    });
    this.anims.create({
        key: 'hurt',
        frames: this.anims.generateFrameNumbers('hurt', { start: 0, end: 1 }),
        frameRate: 6,
        repeat: 0
    });
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('idle', { start: 0, end: 3 }),
        frameRate: 6,
        repeat: -1
    });
    this.anims.create({
        key: 'glitch',
        frames: this.anims.generateFrameNumbers('glitch', { start: 0, end: 3 }),
        frameRate: 6,
        repeat: -1
    });
    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('jump', { start: 0, end: 0 }),
        frameRate: 8,
        repeat: 0
    });
    this.anims.create({
        key: 'fall',
        frames: this.anims.generateFrameNumbers('jump', { start: 1, end: 3 }),
        frameRate: 6,
        repeat: 0
    });
    this.anims.create({
        key: 'punch',
        frames: this.anims.generateFrameNumbers('punch', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: 0
    });
    this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('run', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: -1
    });

    this.anims.create({
        key: 'super',
        frames: this.anims.generateFrameNumbers('super', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: -1
    });




}
