export function startAutoMovement(scene) {
    scene.tweens.add({
        targets: scene.player,
        x: 340,
        duration: 2000,
        onUpdate: () => {
            if (!scene.isJumping) {
                scene.player.anims.play('run', true);
            }
        },
        onComplete: () => {
            scene.player.anims.play('idle', true);

            scene.time.delayedCall(500, () => {
                scene.player.anims.play('glitch', true);
                scene.cameras.main.shake(50);

                scene.time.delayedCall(100, () => {
                    scene.player.anims.play('idle', true);

                    scene.time.delayedCall(500, () => {
                        scene.player.anims.play('glitch', true);
                        scene.cameras.main.shake(50);

                        scene.time.delayedCall(100, () => {
                            scene.player.anims.play('idle', true);
                            scene.time.delayedCall(1000, () => startJump(scene), [], scene);
                        }, [], scene);
                    }, [], scene);
                }, [], scene);
            }, [], scene);
        },
        callbackScope: scene
    });
}

export function startJump(scene) {
    scene.isJumping = true;
    scene.player.anims.play('jump', true);
    scene.time.addEvent({
        delay: 0,
        callback: () => {
            scene.player.setVelocityY(-200);
            scene.tweens.add({
                targets: scene.player,
                x: scene.player.x + 200,
                duration: 1500,
                onComplete: () => {
                    scene.player.setVelocityY(0);
                    scene.isJumping = false;
                    scene.player.anims.play('idle', true);
                }
            });
        },
        callbackScope: scene
    });
}
