export default function deplacement() {
    const normalSpeed = 160;
    const isJumping = !this.player.body.blocked.down;
    const isFalling = this.player.body.velocity.y > 0;
    const isOnGround = this.player.body.blocked.down;
    var isCrouched = false;

    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-normalSpeed);
        if (!isJumping) {
            this.player.anims.play('run', true);
        }
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(normalSpeed);
        if (!isJumping) {
            this.player.anims.play('run', true);
        }
    } else {
        this.player.setVelocityX(0);
        if (!isJumping) {
            this.player.anims.play('idle', true);
        }
    }

    if (this.jumpButton.isDown && isOnGround || this.cursors.up.isDown && isOnGround) {
        this.player.setVelocityY(-250);
        this.player.anims.play('jump', true);
    }

    if (isJumping) {
        const currentAnim = this.player.anims.currentAnim;
        if (currentAnim && currentAnim.key.includes("jump")) {
            if (isFalling) {
                this.player.anims.play('fall', true);
            } else if (!this.player.anims.isPlaying) {
                this.player.anims.play(currentAnim.key, true);
                this.player.setFrame(0);
            }
        }
    }

    if (this.cursors.down.isDown && isOnGround) {
        this.player.setSize(15, 20  , false).setOffset(0, 18);
        this.player.anims.play('crouch', true);
        isCrouched = true;
    }   

    if (this.cursors.down.isUp && isCrouched === true) {
        isCrouched = false;
        this.player.setSize(10, 35);
        this.player.setOffset(10, 13);
    }
}
