# Tool Learning Log

## Tool: **Phaser**

## Project: **Bullet Hell Game**

---

### 10/5/25:
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

### X/X/XX:
* Text
