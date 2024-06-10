var isCrouched = false;

export default function deplacement() {
    const normalSpeed = 160;
    const crouchSpeed = 80;
    const isJumping = !this.player.body.blocked.down;
    const isFalling = this.player.body.velocity.y > 0;
    const isOnGround = this.player.body.blocked.down;
    const blockOnTop = this.player.body.blocked.down;
    


    // Animation movements

    // Crouch Left
    if (this.cursors.left.isDown && isCrouched) {
        this.player.setVelocityX(-80);
        if (!isJumping) {
            this.player.anims.play('run', true);
        } // Crouch Right
    } else if (this.cursors.right.isDown && isCrouched) {
        this.player.setVelocityX(80);
        if (!isJumping) {
            this.player.anims.play('run', true);
        } // Right
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(normalSpeed);
        if (!isJumping) {
            this.player.anims.play('run', true);
        } // Left   
    } else if (this.cursors.left.isDown) {
        this.player.setVelocityX(-normalSpeed);
        if (!isJumping) {
            this.player.anims.play('run', true);
        } // If no input is on set the player's speed at 0 and play the idle animation
    } else {
        this.player.setVelocityX(0);
        if (!isJumping) {
            this.player.anims.play('idle', true);
        }
    }
    // If the button to jump or the up cursors is down && the player is on the ground he can jump ( taking -250 velocity in Y ) and play the jump animation 
    if (this.jumpButton.isDown && isOnGround || this.cursors.up.isDown && isOnGround) {
        this.player.setVelocityY(-250);
        this.player.anims.play('jump', true);
    }

    // FLY (to get fast where we wanna go while dev)
    if (this.jumpButton.isDown && isOnGround || this.cursors.up.isDown) {
        this.player.setVelocityY(-250);
        this.player.anims.play('crouch', true);
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



    if (this.cursors.down.isDown && isOnGround && !isCrouched) {
        // CROUCH
        this.player.setSize(15, 20, false).setOffset(10, 18);
        this.player.anims.play('crouch', true);
        isCrouched = true;
    } 

    if (this.cursors.down.isUp && isCrouched && !blockOnTop) {
        isCrouched = false;
        this.player.setSize(10, 35);
        this.player.setOffset(10, 13);
        this.player.anims.play('idle', true);
    }
}
