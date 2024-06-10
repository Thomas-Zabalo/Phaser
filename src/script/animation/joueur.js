var isCrouched = false;

export default function deplacement() {
    const normalSpeed = 160;
    const crouchSpeed = 40;
    const isJumping = !this.player.body.blocked.down;
    const isFalling = this.player.body.velocity.y > 0;
    const isOnGround = this.player.body.blocked.down;


    if (this.cursors.left.isDown && isCrouched) {
        this.player.setVelocityX(-crouchSpeed);
        if (!isJumping) {
            this.player.anims.play('crouch-idle', true);
        } 
    } else if (this.cursors.right.isDown && isCrouched) {
        this.player.setVelocityX(crouchSpeed);
        if (!isJumping) {
            this.player.anims.play('crouch-idle', true);
        } 
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(normalSpeed);
        if (!isJumping) {
            this.player.anims.play('run', true);
        }
        
    } else if (this.cursors.left.isDown) {
        this.player.setVelocityX(-normalSpeed);
        if (!isJumping) {
            this.player.anims.play('run', true);
        }
    }
    else {
        this.player.setVelocityX(0);
        if (!isJumping && !isCrouched) {
            this.player.anims.play('idle', true);
        }
    }

    if (this.jumpButton.isDown && isOnGround || this.cursors.up.isDown && isOnGround  ) {
        this.player.setVelocityY(-250);
        this.player.anims.play('jump', true);
    }

    // Reprends sa taille originelle lorsque la touche de saut est relachée et que le personnage est arrivé au sol

    if (this.player.body.offset.y === 10 && this.jumpButton.isUp && isOnGround || this.player.body.offset.y === 10 && this.cursors.up.isUp && isOnGround  ) {
        this.player.setSize(10,35)
        this.player.setOffset(10, 13);
    }

    // // FLY
    // if (this.jumpButton.isDown && isOnGround || this.cursors.up.isDown) {
    //     this.player.setVelocityY(-250);
    //     this.player.anims.play('jump', true);
    // }


    if (isJumping) {
        const currentAnim = this.player.anims.currentAnim;
        if (currentAnim && currentAnim.key.includes("jump")) {
            if (isFalling) {
                this.player.setSize(10,35)
                this.player.setOffset(10, 10);
                this.player.anims.play('fall', true);
            } else if (!this.player.anims.isPlaying) {
                this.player.anims.play(currentAnim.key, true);
                this.player.setFrame(0);
            }
        }
    }

    


    if (this.cursors.down.isDown && isOnGround) {
        // CROUCH
        this.player.anims.play('crouch-idle', true);
        this.player.setSize(15, 20).setOffset(10, 28);
        isCrouched = true;
        
    }  

    if (this.cursors.down.isUp && isCrouched) {
        isCrouched = false;
        this.player.setSize(10, 35);
        this.player.setOffset(10, 13);
        this.player.anims.play('idle', true);
    }
}
