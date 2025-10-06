class GameScene extends Phaser.Scene {
    constructor() {
        super('Gamecene')
    }

    preload() {

    }

    create() {
        g.number = 20
        g.arr = []
        setTimeout(() => {
            for (let i = 0; i < g.number; i++) {
                g.circle = this.add.circle(Math.random() * config.width,Math.random() * config.height,5,randomColor())
                this.physics.add.existing(g.circle)
                g.circle.body.setVelocity(randomVelocity(), randomVelocity())
                g.circle.body.setCollideWorldBounds(true,1,1)
                g.arr.push(g.circle)
            }
        },2000)

        setTimeout(() => {
            for (let i = 0; i < g.number; i++) {
                g.circle = this.add.circle(Math.random() * config.width,Math.random() * config.height,10,randomColor())
                this.physics.add.existing(g.circle)
                g.circle.body.setVelocity(randomVelocity(), randomVelocity())
                g.circle.body.setCollideWorldBounds(true,1,1)
                g.arr.push(g.circle)
            }
        },4000)

        setTimeout(() => {
            for (let i = 0; i < g.number; i++) {
                g.circle = this.add.circle(Math.random() * config.width,Math.random() * config.height,15,randomColor())
                this.physics.add.existing(g.circle)
                g.circle.body.setVelocity(randomVelocity(), randomVelocity())
                g.circle.body.setCollideWorldBounds(true,1,1)
                g.arr.push(g.circle)
            }
        },6000)

        setTimeout(() => {
            for (let i = 0; i < g.number; i++) {
                g.circle = this.add.circle(Math.random() * config.width,Math.random() * config.height,20,randomColor())
                this.physics.add.existing(g.circle)
                g.circle.body.setVelocity(randomVelocity(), randomVelocity())
                g.circle.body.setCollideWorldBounds(true,1,1)
                g.arr.push(g.circle)
            }
        },8000)

        setInterval(() => {
            for (let i = 0; i < g.arr.length; i++) {
                g.arr[i].fillColor = randomColor()
            }
        }, 500)
    }

    update() {

    }
}

function randomVelocity() {
    let choice = Math.floor(Math.random() * 2)
    if (choice === 1) {
        return Math.floor(Math.random() * 700) + 100
    } else {
        return -Math.floor(Math.random() * 700) -100
    }
}

function randomColor() {
    let d = '0123456789abcdef'
    let c = ''
    for (let i = 0; i < 6; i++) {
        c += d[Math.floor(Math.random() *16)]
    }
    return '0x' + c
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
    scene: [ GameScene ]
}

const game = new Phaser.Game(config)
