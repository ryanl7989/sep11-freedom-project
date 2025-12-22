# Entry 2
##### 12/19/25

### Context

For the past few weeks I have been learning more about how to use Phaser. I have been working on how to use sprites and the functions that can be used on them. An example of this is making one sprite follow another. I attempted this in this [file](../tool/phaser-tinkering2/game.js) which already had a goblin and knight sprite in it that I would use to make the goblin follow the knight. I did this using this code `this.physics.moveToObject(this.goblin, this.knight, 100);`. This code make the goblin move towards the knight at a velocity of 100. I also created a loop that spawned goblins if random areas around the map. When I tried to make all the goblins move towards the knight, it only made the last goblin that was spawned to move towards the knight. This was because of the way spawning sprites worked `this.goblin = this.physics.add.sprite(Math.random()*(backgroundImage.width), Math.random()*(backgroundImage.height), 'goblin')`, my code for spawning a goblin would replace the variable goblin each time it would run which would make it so that the newest goblin would be the one that was being moved towards the knight. I started to solve this by making an array that I would put all the goblins that were spawned into. This is what that looked like:

```js
this.goblinArray = []
this.time.addEvent({
    delay: 4000,
    callback: () => { this.goblin = this.physics.add.sprite(Math.random()*(backgroundImage.width), Math.random()*(backgroundImage.height), 'goblin');
    this.goblinArray.push(this.goblin)
    this.goblin.setCollideWorldBounds(true);
    },
    loop: true
});
```

The line `this.time.addEvent` was basically a infinite loop with a delay that I set to 4000 milliseconds, the code inside of `callback` was the code that would run every 4 seconds. Inside of this loop, I would create a goblin sprite, then add it to `goblinArray`, then add collision with the map border. After this step, I went to the update section and made a loop that would run through each goblin in the `goblinArray` and make each one move towards the knight, and since this was in the update section it would be constantly running through the new goblins that were being added every 4 seconds and moving each one closer to my knight. This is what that looked like:

```js
for (let i = 0; i < this.goblinArray.length; i++) {
    this.physics.moveToObject(this.goblinArray[i], this.knight, 100);
}
```

Another problem that I had was when I was truing to add collison to my sprites. I used the code `this.physics.add.collider(this.goblin, this.knight);` inside of my loop that creates goblins every 4 seconds which added collsion between the goblins and the knights but the problem was when I tried to add collsion between the goblins. At first, I tried doing `this.physics.add.collider(this.goblin, this.goblin);` but it didn't work because the computer thought I was adding collison between the same goblin. After that I thought about making a loop inside a loop. The first loop would pick a goblin and the second one would add collison between that goblin and every other goblin in the array. This is what it looked like:

```js
for (let i = 0; i < this.goblinArray.length; i++) {
    for (let a = 0; a < this.goblinArray.length; a++){
        this.physics.add.collider(this.goblinArray[i], this.goblinArray[a]);
    }
}
```

The loop with variable i would pick a goblin and the loop with variable a would add collision with the goblin that the first variable picked and all the other goblins.

### EDP

Currently I am on the second stage of the engineering design process which is researching because I am still learing how to use Phaser and tinkering. I think that I will be on this stage of a while because there are still a lot of things that I need to learn about Phaser before making my game.

### Skills

#### Debugging

I feel like I have gotten better at debugging these past few weeks because as I have been coding using Phaser, I have run into many problems and errors with my code. Many of them are for reasons that I had not seen while using js and exclusively in Phaser. Because of this, I have had to test things is jsbin, search up how to use certain code, and comment parts of my code out to find out what is wrong.

#### Creativity

Another skill that I think that I have gotten better at is creativity because there are a lot of things that you can do with Phaser and I have to be creative when thinking about what I want to do with my game and the kinds of things that I want to learn. I also have to be creative when thinking about how to apply the things I learn in class into Phaser.

[Previous](entry01.md) | [Next](entry03.md)

[Home](../README.md)
