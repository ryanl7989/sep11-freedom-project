class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene')
    }

    preload() {
        // load assets
        this.load.atlas('knight', 'assets/knightSpriteSheet.png', 'assets/knightSprites.json');
        this.load.atlas('goblin', 'assets/goblinSpriteSheet.png', 'assets/goblinSprites.json');
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

        //animations for sprites
        this.anims.create({ key:'kmoving', frames: this.anims.generateFrameNames('knight', {prefix:'knight', end: 6, zeroPad:1}), repeat: -1});
        this.anims.create({ key:'kstand', frames: this.anims.generateFrameNames('knight', {prefix:'knightStand', end: 0, zeroPad:1}), repeat: -1});

        this.anims.create({ key:'gmoving', frames: this.anims.generateFrameNames('goblin', {prefix:'goblin', end: 4, zeroPad:1}), repeat: -1});

        // knight spawner
        this.knight = this.physics.add.sprite(backgroundImage.width/2, backgroundImage.height/2, 'knight');
        this.knight.setCollideWorldBounds(true);

        // Goblin spawner
        this.goblin = this.physics.add.sprite(10000, 10000, 'goblin');
        this.goblinArray = []
        this.time.addEvent({
            delay: 4000,
            callback: () => { this.goblin = this.physics.add.sprite(Math.random()*(backgroundImage.width), Math.random()*(backgroundImage.height), 'goblin');
            this.physics.add.collider(this.goblin, this.knight);
            this.goblinArray.push(this.goblin)
            this.goblin.setCollideWorldBounds(true);
            console.log(this.goblinArray)
            },
            loop: true
        });



        // MAKE ARRAY FOR GOBLIN COLLISION


        // create controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // game follows the knight
        this.cameras.main.startFollow(this.knight)
        // this.cameras.main.setZoom(2);

    }

    update () {

    // makes goblins follow knight
        for (let i = 0; i < this.goblinArray.length; i++) {
            this.physics.moveToObject(this.goblinArray[i], this.knight, 100);
            for (let a = 0; a < this.goblinArray.length; a++){
                this.physics.add.collider(this.goblinArray[i], this.goblinArray[a]);
            }
        }
        this.goblin.anims.play('gmoving', true);


    // controls
        this.knight.setVelocity(0,0)

        if (this.cursors.left.isDown)
        {
            this.knight.setVelocityX(-150);
            this.knight.anims.play('kmoving', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.knight.setVelocityX(150);
            this.knight.anims.play('kmoving', true);
        }


        if (this.cursors.up.isDown)
        {
            this.knight.setVelocityY(-150);
            this.knight.anims.play('kmoving', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.knight.setVelocityY(150);
            this.knight.anims.play('kmoving', true);
        }

        if ((this.cursors.up.isDown == true &&  this.cursors.left.isDown == true)) {
            this.knight.setVelocity(-Math.sqrt(11250),-Math.sqrt(11250));
            this.knight.anims.play('kmoving', true);
        }
        if ((this.cursors.up.isDown == true &&  this.cursors.right.isDown == true)) {
            this.knight.setVelocity(Math.sqrt(11250),-Math.sqrt(11250));
            this.knight.anims.play('kmoving', true);
        }
        if ((this.cursors.down.isDown == true &&  this.cursors.left.isDown == true)) {
            this.knight.setVelocity(-Math.sqrt(11250),Math.sqrt(11250));
            this.knight.anims.play('kmoving', true);
        }
        if ((this.cursors.down.isDown == true &&  this.cursors.right.isDown == true)) {
            this.knight.setVelocity(Math.sqrt(11250),Math.sqrt(11250));
            this.knight.anims.play('kmoving', true);
        }



        if (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown) {
        } else {
            this.knight.play('kstand')
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
