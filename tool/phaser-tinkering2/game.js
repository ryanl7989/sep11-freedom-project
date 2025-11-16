class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene')
    }

    preload() {
        // load assets
        this.load.atlas('knight', 'assets/knightSpriteSheet.png', 'assets/knightSprites.json');
        this.load.image('oldDungeon', 'assets/oldDungeon.png');
    }

    create() {

        // background
        const backgroundImage = this.add.image(0, 0, 'oldDungeon');
        backgroundImage.setOrigin(0.5, 0.5);
        backgroundImage.setPosition(this.sys.game.config.width / 2, this.sys.game.config.height / 2);
        const scaleX = this.sys.game.config.width / backgroundImage.width;
        const scaleY = this.sys.game.config.height / backgroundImage.height;
        const scale = Math.max(scaleX, scaleY);
        backgroundImage.setScale(scale);

        //animations for knight
        this.anims.create({ key:'moving', frames: this.anims.generateFrameNames('knight', {prefix:'knight', end: 6, zeroPad:1}), repeat: -1});
        this.anims.create({ key:'stand', frames: this.anims.generateFrameNames('knight', {prefix:'knightStand', end: 0, zeroPad:1}), repeat: -1});

        // knight sprite creation
        this.knight = this.physics.add.sprite(backgroundImage.width/2, backgroundImage.height/2, 'knight');
        this.knight.setCollideWorldBounds(true);

        // controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // game follows the knight
        this.cameras.main.startFollow(this.knight)
        this.cameras.main.setZoom(1.5);

    }

    update () {
        // controls
        this.knight.setVelocity(0,0)

        if (this.cursors.left.isDown)
        {
            this.knight.setVelocityX(-150);
            this.knight.anims.play('moving', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.knight.setVelocityX(150);
            this.knight.anims.play('moving', true);
        }


        if (this.cursors.up.isDown)
        {
            this.knight.setVelocityY(-150);
            this.knight.anims.play('moving', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.knight.setVelocityY(150);
            this.knight.anims.play('moving', true);
        }

        // if (this.cursors.space.isDown)
        // {
        //     setInterval(this.knight = this.physics.add.sprite(800, 300, 'knight'),200);

        // }

        if (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown) {
        } else {
            this.knight.play('stand')
        }


    }
}
// game configuration
const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        height: 1040,
        width: 1920,
    },
    backgroundColor: `#FFFFFF`,
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
