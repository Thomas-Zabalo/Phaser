export default function animation() {
    this.anims.create({
        key: 'rightidle',
        frames: this.anims.generateFrameNumbers('rightidle', { start: 0, end: 3 }),
        frameRate: 6,
        repeat: -1
    });
    this.anims.create({
        key: 'rightrun',
        frames: this.anims.generateFrameNumbers('rightrun', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'rightjump',
        frames: this.anims.generateFrameNumbers('rightjump', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: 0
    });
    this.anims.create({
        key: 'rightsitdown',
        frames: this.anims.generateFrameNumbers('rightsitdown', { start: 0, end: 3 }),
        frameRate: 6,
        repeat: -1
    });
    this.anims.create({
        key: 'rightwalk',
        frames: this.anims.generateFrameNumbers('rightwalk', { start: 0, end: 5 }),
        frameRate: 6,
        repeat: -1
    });

}
