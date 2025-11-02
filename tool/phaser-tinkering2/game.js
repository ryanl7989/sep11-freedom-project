class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene')
    }

    preload() {
        this.load.atlas('knight', 'assets/knightSpriteSheet.png', 'assets/knightSprites.json');
    }

    create() {
        this.anims.create({ key:'moving', frames: this.anims.generateFrameNames('knight', {prefix:'knight', end: 6, zeroPad:1}), repeat: -1});
        this.anims.create({ key:'stand', frames: this.anims.generateFrameNames('knight', {prefix:'knightStand', end: 0, zeroPad:1}), repeat: -1});
        this.knight = this.physics.add.sprite(800, 300, 'knight');
        this.knight.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update () {

    this.knight.setVelocity(0,0)

        if (this.cursors.left.isDown)
        {
            this.knight.setVelocityX(-200);
            this.knight.anims.play('moving', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.knight.setVelocityX(200);
            this.knight.anims.play('moving', true);
        }


        if (this.cursors.up.isDown)
        {
            this.knight.setVelocityY(-200);
            this.knight.anims.play('moving', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.knight.setVelocityY(200);
            this.knight.anims.play('moving', true);
        }

        if (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown) {
        } else {
            this.knight.play('stand')
        }
    }
}

const config = {
    type: Phaser.AUTO,
    height: window.innerHeight,
    width: window.innerWidth,
    backgroundColor: '#123456',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y:0, x:0},
            debug: false
        }
    },
    scene: [ GameScene ]
}

const game = new Phaser.Game(config)
