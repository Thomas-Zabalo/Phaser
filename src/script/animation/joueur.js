export default function deplacement() {

    const normalSpeed = 160;
    const isJumping = !this.player.body.blocked.down;

    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-normalSpeed);
        if (!isJumping) {
            this.player.anims.play('rightrun', true);
        }
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(normalSpeed);
        if (!isJumping) {
            this.player.anims.play('rightrun', true);
        }
    } else {
        this.player.setVelocityX(0);
        if (!isJumping) {
            this.player.anims.play('rightidle', true);
        }
    }

    if (this.jumpButton.isDown && this.player.body.blocked.down) {
        this.player.setVelocityY(-250);
    }

    if (isJumping) {
        if (this.player.anims.currentAnim && this.player.anims.currentAnim.key.includes('left')) {
            this.player.anims.play('leftjump', true).stopAfterRepeat(0);;
        } else if (this.player.anims.currentAnim && this.player.anims.currentAnim.key.includes('right')) {
            this.player.anims.play('rightjump', true).stopAfterRepeat(0);;
        }
    }

}
