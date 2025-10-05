class Gamescene extends Phaser.Scene {
    constructor() {
        super('Gamescene')
    }

    preload() {

    }

    create() {
        g.circle = this.add.circle(config.width/2.config.height/2)
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
    // scene: [GameScene]
}

const game = new Phaser.Game(config)
