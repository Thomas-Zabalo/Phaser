var isCrouched = false;

export default function deplacement() {
    const normalSpeed = 16023;
    const crouchSpeed = 80;
    const isJumping = !this.player.body.blocked.down;
    const isFalling = this.player.body.velocity.y > 0;
    const isOnGround = this.player.body.blocked.down;
    

    if (this.cursors.left.isDown && isCrouched) {
        this.player.setVelocityX(-80);
        console.log("jsuis crouch et je vais a gauche")
        if (!isJumping) {
            this.player.anims.play('run', true);
        } 
    } else if (this.cursors.right.isDown && isCrouched) {
        this.player.setVelocityX(80);
        console.log("jsuis crouch et je vais a droite")
        if (!isJumping) {
            this.player.anims.play('run', true);
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
        if (!isJumping) {
            this.player.anims.play('idle', true);
        }
    }

    if (this.jumpButton.isDown && isOnGround || this.cursors.up.isDown && isOnGround) {
        this.player.setVelocityY(-250);
        this.player.anims.play('jump', true);
    }

    // FLY
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
        this.player.setSize(15, 20, false).setOffset(0, 18);
        this.player.anims.play('crouch', true);
        isCrouched = true;
    } 

    if (this.cursors.down.isUp && isCrouched) {
        isCrouched = false;
        this.player.setSize(10, 35);
        this.player.setOffset(10, 13);
        this.player.anims.play('idle', true);
    }
}
