class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene')
    }

    preload() {
    // load assets
        // sprites
        this.load.atlas('knight', 'assets/knightSpriteSheet.png', 'assets/knightSprites.json');
        this.load.atlas('goblin', 'assets/goblinSpriteSheet.png', 'assets/goblinSprites.json');
        this.load.atlas('slash', 'assets/slashSpriteSheet.png', 'assets/slashSprites.json');


        // images
        this.load.image('oldDungeon', 'assets/oldDungeon.png');
        this.load.image('slashHitbox', 'assets/slashAttackHitbox.png');
    }

    create() {

    // background
        const backgroundImage = this.add.image(0, 0, 'oldDungeon'); // adds dungeon background image
        backgroundImage.setOrigin(0.5, 0.5); // where the background is spawned
        backgroundImage.setPosition(this.sys.game.config.width / 2, this.sys.game.config.height / 2); // cneters the image
        const scaleX = this.sys.game.config.width / backgroundImage.width;
        const scaleY = this.sys.game.config.height / backgroundImage.height;
        const scale = Math.max(scaleX, scaleY);
        backgroundImage.setScale(scale); // scales the gmae depending on how big the screen is

    // animations for sprites
        this.anims.create({ key:'kmoving', frames: this.anims.generateFrameNames('knight', {prefix:'knight', end: 6, zeroPad:1}), repeat: -1});
        this.anims.create({ key:'kstand', frames: this.anims.generateFrameNames('knight', {prefix:'knightStand', end: 0, zeroPad:1}), repeat: -1});

        this.anims.create({ key:'attack', frames: this.anims.generateFrameNames('slash', {prefix:'slash', end: 9, zeroPad:1}), repeat: 0});

        this.anims.create({ key:'gmoving', frames: this.anims.generateFrameNames('goblin', {prefix:'goblin', end: 4, zeroPad:1}), repeat: -1});

    // game instructions
        alert("Arrow keys to move, click to attack")

    // knight spawner
        this.knight = this.physics.add.sprite(backgroundImage.width/2, backgroundImage.height/2, 'knight'); // spawns knight in the center
        this.knight.setCollideWorldBounds(true); // stops the knight from leaving the map




    // Goblin spawner


        this.goblin = this.physics.add.sprite(10000, 10000, 'goblin'); // makes goblin variable

        var delaySpeed = 4000
        var goblinSpawned = 0
        this.goblinArray = []
        this.hitboxArray = []
        this.time.addEvent({
            delay: delaySpeed,
            callback: () => {
                goblinSpawned++;
                if(goblinSpawned%5 == 0){ // every 5 seconds, speed up goblin spawn rate by 10%
                    delaySpeed = delaySpeed * (0.9);
                }

                this.goblin = this.physics.add.sprite(Math.random()*(backgroundImage.width), Math.random()*(backgroundImage.height), 'goblin'); // creates the goblin at a random place
                function destroyknight() {
                    this.knight.destroy(); // if the knight hits a goblin the knight gets destroyed
                }

                this.physics.add.collider(this.goblin, this.knight, destroyknight, null, this); // adds collison between goblin and knight
                this.goblinArray.push(this.goblin);

                for (let a = 0; a < this.goblinArray.length; a++){
                    this.physics.add.collider(this.goblinArray[a], this.goblin); // adds collison for every goblin
                }
                this.goblin.setCollideWorldBounds(true); // stops the goblin from leaving the map
            },
            loop: true
        });


    // create controls
        this.cursors = this.input.keyboard.createCursorKeys();

    // game follows the knight
        this.cameras.main.startFollow(this.knight);
        this.cameras.main.setZoom(2); // set zoom

    // knight attack
        this.slashExist = false
        this.slashHitboxArray = []
        this.input.on('pointerdown', function () {
            console.log(this.goblinArray.length)
            if(this.slashExist == false) {
                for(let i=0; i<7; i++){
                    this.slashHitboxArray.push(this.physics.add.sprite(this.knight.x, this.knight.y, 'slashHitbox')); // makes hotbox of the slash attack
                    this.slashHitboxArray[i].visible = false; // makes it invisible
                    this.slashHitboxArray[i].scale = (1+((i+0.1)/10)); // sets how big it should be
                }

                this.slash = this.physics.add.sprite(this.knight.x, this.knight.y, 'slash'); // creates the slash sprite on the knight sprite
                this.slash.scale=1.5;  // makes the slash 1.5 times bigger than original
                this.slash.anims.play('attack', true); // plays animations when there is a click
                this.slashExist = true


                for (let b = 0; b < this.goblinArray.length; b++){
                    const destroygoblin = (slashHitbox, goblin) => {
                        goblin.destroy(); // if a goblin gets hit by a slash it gets destroyed
                        var index = this.goblinArray.indexOf(goblin) // finds the index of the goblin that is hit by a slash
                        this.goblinArray.splice(index, 1) // removes the goblin sprite from the goblin array
                    }
                    for(let i = 0; i<this.slashHitboxArray.length; i++){
                        this.physics.add.collider(this.slashHitboxArray[i], this.goblinArray[b], destroygoblin, null, this); // adds collision between the slash and all goblins
                    }
                }


                // 0.35 seconds after I click the attack animation will end and the slash will be deleted.
                this.time.addEvent({
                    delay: 350,
                    callback: () => {
                        this.slashExist = false
                        this.slash.destroy() // destorys the slash
                        for(let i=this.slashHitboxArray.length-1; i>-1; i--){
                            this.slashHitboxArray[i].destroy() // destroys the hitbox
                            this.slashHitboxArray.pop()
                        }
                    },
                });
            }
        }, this);

        this.timer = this.add.text(this.knight.x, this.knight.y, "Time:" + 0 + "s", { fontFamily: 'Arial', fontSize: 30, color: '#00ff00' } ); // sets timer text
        this.timeNum = 0
        this.elapsedSecs = this.time.elapsedSeconds
    }



    update () {
    // timer
        // position of the timer
        this.timer.x = (this.knight.x-55)
        this.timer.y = (this.knight.y - 250)


        this.timeNum += (1/100)
        var times = Math.floor(this.timeNum); // rounds to seconds
        this.timer.setText("Time:" + times + "s"); // text

    // Game Over
        if (this.knight.active == false) {
            this.scene.start('GameEndScene'); //stops the game when the knight dies
            return; // ends the update
        }


    // makes goblins follow knight
        for (let i = 0; i < this.goblinArray.length; i++) {
            this.physics.moveToObject(this.goblinArray[i], this.knight, 100);
        }

    // goblin animation
        for (let i = 0; i < this.goblinArray.length; i++) {
            this.goblinArray[i].anims.play('gmoving', true); // plays moving animation for each goblin
        }


    // controls
        this.knight.setVelocity(0,0);

        if (this.cursors.left.isDown) // move left
        {
            this.knight.setVelocityX(-150);
            this.knight.anims.play('kmoving', true);
        }
        else if (this.cursors.right.isDown) // move right
        {
            this.knight.setVelocityX(150);
            this.knight.anims.play('kmoving', true);
        }


        if (this.cursors.up.isDown) // move down
        {
            this.knight.setVelocityY(-150);
            this.knight.anims.play('kmoving', true);
        }
        else if (this.cursors.down.isDown) // move up
        {
            this.knight.setVelocityY(150);
            this.knight.anims.play('kmoving', true);
        }

        // makes it so that holding two buttons doesn't make you faster

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

class GameEndScene extends Phaser.Scene {
    constructor() {
        super('GameEndScene')
    }

    preload() {

    }

    create() {

        this.add.text(this.sys.game.config.width/2, this.sys.game.config.height/3, 'Game Over', {
            fontFamily: 'Arial',
            fontSize: '50px',
            color: '#000000'
        }).setOrigin(0.5);

        this.add.text(this.sys.game.config.width/2, this.sys.game.config.height/2, 'Click to play Again', {
            fontFamily: 'Arial',
            fontSize: '50px',
            color: '#000000'
        }).setOrigin(0.5);

        this.input.on('pointerdown', function () {
            this.scene.start('GameScene');
        },this)
    }

    update() {

    }
}
// game configuration
const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        height: 1040,
        width: 1920,
    },
    backgroundColor: `#FFFFFF`,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y:0, x:0},
            // debug: true // Hitboxes for debug
        }
    },
    scene: [ GameScene, GameEndScene ]
}

const game = new Phaser.Game(config)
