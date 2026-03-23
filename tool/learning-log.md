# Tool Learning Log

## Tool: **Phaser**

## Project: **Bullet Hell Game**

---

### 10/5/2025 Log 1:
Today I watched and followed along with https://www.youtube.com/watch?v=UAdWDHb3zPQ which was a tutorial on the basics and made a small animation of balls bouncing against walls using phaser. I also learned the main functions of Phaser like `preload()` `create()` `update()` froomo this  tutorial.
* `preload()` loads game assets like pictures before the game begins.
* `create()` adds objects like sprites into the game.
* `update()` constantly updates the game for things like player movement.
A challenge that I had was when I was trying to make a circle in the scene and nothing would pop up except the game screen when I reloaded the page. This was my js code:

```js
class GameScene extends Phaser.Scene {
    constructor() {
        super('Gamescene')
    }

    preload() {

    }

    create() {
        g.circle = this.add.circle(config.width/2,config.height/2,20,0xffffff)
    }

    update() {

    }
}

window.addEventListener('resize', () => {
    window.location.reload()
})

const g = {}
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
    scene: [ Gamescene ]
}

const game = new Phaser.Game(config)
```

I  thought that I had done something wrong like putting something in the wrong place but it was acually because when I made the class GameScene. I made it with lowercase s innstead of uppercase which is what I had at the top of my code which did not register it as the same thing.
<!--
* Links you used today (websites, videos, etc)
* Things you tried, progress you made, etc
* Challenges, a-ha moments, etc
* Questions you still have
* What you're going to try next
-->

### 10/30/2025 Log 2:
* Today I followed along with this video on sprites "https://www.youtube.com/watch?v=ElAmJj8Tfo8"
  * `this.load.atlas()` can be used to load sprite sheets for animation
  * Learned how to make moving controls using `setVelocity()`
  * Used `this.anims.create()` to create animations for walking and standing. Used `"spriteName".anims.play()` to play the animations.
  * Followed along using a sprite I found online: [My file](phaser-tinkering2/game.js)
* I used this website "https://www.leshylabs.com/apps/sstool/" to turn an image of a Sprite Sheet into a Sprite Sheet and put the image and the json
* Looked through the [Phaser Documentation](https://docs.phaser.io/phaser/getting-started/what-is-phaser) to find information on sprites and animations.
* Next Steps:
  *  Learn how to make the camera follow the sprite


### 11/16/2025 Log 3:
* Today I learned how to make the screen follow a sprite in this [file](phaser-tinkering2/game.js) that I used last week that already had a sprite.
  * `this.cameras.main.startFollow()` follows the sprite that is put between the parenthesis
  * `this.cameras.main.setZoom()` changes the amount of zoom on the screen
  * I used [Phaser Documentation](https://docs.phaser.io/phaser/getting-started/what-is-phaser) to find out how to do this
  * Used this [example](https://phaser.io/examples/v3.85.0/camera/view/follow-sprite) to help learn about cameras
* I also set a background with borders around it to stop the sprite from moving out of it.
  * `.setCollideWorldBounds(true)` stops a sprite from going outside of the game area
  * `this.load.image(keyName, 'assetImage')` loads images into the file
* Next Steps:
  *  Add another sprite that moves towards the main sprite


### 11/23/2025 Log 4:
* Today I learned how to make one sprite follow another sprite in this [file](phaser-tinkering2/game.js) that I used for the last 2 weeks.
  * Found a [goblin sprite](https://craftpix.net/product/goblin-pixel-art-character-sprite-pack/?srsltid=AfmBOootY-nkddgt8bIpCCCiCR8Y3AUCUl-iv3kKVcvMDsy1TjmWG_Ug) online and created another sprite called "goblin" to follow the knight
  * Used the goblin spritesheet to make a walking animation for the goblin
  * I put this code `this.physics.moveToObject(this.goblin, this.knight, 100);` into the update section which make the goblin sprite follow the knight sprite at 100 volocity
  * Used [Phaser Documentation](https://docs.phaser.io/phaser/concepts/physics/arcade) to learn the code


### 12/5/2025 Log 5:

Today I made sprites spawn in random places in the scene in this [file](phaser-tinkering2/game.js) that I used before which had goblin sprites inside already.
I made the goblins spawn in random places around the map using this code:
```js
this.goblin = this.physics.add.sprite(Math.random()*(backgroundImage.width), Math.random()*(backgroundImage.height), 'goblin')
```
This would spawn a goblin a in random places inside of the map. Then I put it in an array called `goblinArray` which would be where I placed each goblin that spawned in the map. Then I wraped it in a loop that would play every 4 seconds. This is what it looked like after that:
```js
this.time.addEvent({
  delay: 4000,
  callback: () => { this.goblin = this.physics.add.sprite(Math.random()*(backgroundImage.width), Math.random()*(backgroundImage.height), 'goblin');
  this.goblinArray.push(this.goblin)
  this.goblin.setCollideWorldBounds(true);
  console.log(this.goblinArray)
  },
  loop: true
});
```
The `this.time.addEvent` would create that loop, `delay:4000` would be the time between eaeh loop in milliseconds, and I would put the code that I want to loop inside of `callback` which is the code to spawn a goblin, push the goblin into the goblin array, and then stop it from leaving the map. Then I went to the update section and made a loop which would constantly loop through the array and make each goblin in the array follow the knight. This is the code for that:
```js
for (let i = 0; i < this.goblinArray.length; i++) {
  this.physics.moveToObject(this.goblinArray[i], this.knight, 100);
}
this.goblin.anims.play('gmoving', true);
```


### 12/14/2025 Log 6:
Today I learned how to add collision between sprites in this [file](phaser-tinkering2/game.js) using a knight and a goblin sprite. I used this code `this.physics.add.collider(this.goblin, this.knight);` which would stop the knight and the goblin from going through each other. A problem that I had was that when I spawned new goblins, they would walk through each other. I fixed this by makeing a loop inside a loop. This is what it looked like:

```js
for (let i = 0; i < this.goblinArray.length; i++) {
    this.physics.moveToObject(this.goblinArray[i], this.knight, 100);
    for (let a = 0; a < this.goblinArray.length; a++){
        this.physics.add.collider(this.goblinArray[i], this.goblinArray[a]);
    }
}
```
The first loop was a loop that I made before which was used to make each goblin in an array of goblins, follow the knight. I used this loop to make a new loop inside of it which would select any new goblins in an array and add collision between it and any previous goblins. and since this was in the update section of phaser, it would constantly repeat, adding collision with any new goblins that would be created.


### 3/8/2026 Log 8:

Today I learned how to give my sprite an attack animation in this [file](../game.js). First I searched for a sprite sheet online and found this one:
<br>![slash sprite sheet](../assets/slashSpriteSheet.png)<br> Then I turned the sprite sheet image into a json file using using this [webstite](https://www.leshylabs.com/apps/sstool/). After I turned it into a json file, I added it into my assest folder and linked them to my code using this code:

```js
this.load.atlas('slash', 'assets/slashSpriteSheet.png', 'assets/slashSprites.json');
```

and

```js
this.anims.create({ key:'attack', frames: this.anims.generateFrameNames('slash', {prefix:'slash', end: 9, zeroPad:1}), repeat: 0});
```

This code adds the sprite sheet to my code so when I acess it, my code knows where to get it and also adds the animation by cycling though each frame quickly. Then I used the following code to make it so that when I click it does a slash where my knight is.

```js
this.input.on('pointerdown', function (pointer) {
    this.slash = this.physics.add.sprite(this.knight.x, this.knight.y, 'slash'); // creates the slash sprite on the knight sprite
    this.slash.scale = 2.5    // makes the slash 3 times bigger than original
    this.slash.anims.play('attack', true); // plays animations when there is a click

    this.time.addEvent({
        delay: 350,
        callback: () => {
            this.slash.setVisible(false)
            this.slash.destroy()
        },
    });
}, this);
```

This makes it so that when you click, the slash will appear on the knight and it will make the slash 2.5 times bigger than the original.



### 3/22/2026 Log 9:

Today I tried to add a timer to my game to count how long the player has survived for. First I added a text value by using this code:

```js
this.timer = this.add.text(this.knight.x, this.knight.y, "Time:" + 0 + "s", { fontFamily: 'Arial', fontSize: 30, color: '#00ff00' } );
```

This code will spawn text on my knight that says "Time:0s" in green. Next I needed to make it so that I could count the time that the game was running for and there was a peice of code that did that which was `var times = Math.floor(this.time.now * 0.001);` This put the time in seconds into the variable times. then I used `.setText` to change the text in the timer to game time in seconds. Then I needed to put the timer in the right position which was at the top of the players screen which was a problem because the game screen would follow the knight instead of staying in a fixed position so I moved the timer relative to the knights x and y cordinate using this code:

```js
this.timer.x = (this.knight.x-55)
this.timer.y = (this.knight.y - 250)
```
