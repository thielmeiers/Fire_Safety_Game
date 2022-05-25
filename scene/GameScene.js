import config from '../config.js'

var keys
var player
var interactionBox
var interactables
var testInteractable
var winTestBlock
var loseTestBlock
var isSuccessful
var startSuccessEnd
var startFailEnd
var createGame
var walls

var physics

class GameScene extends Phaser.Scene{
  constructor(){
    super('Game');
  }
  create ()
  {
// creates player ui
      this.scene.launch('ui-scene');
// loads game level map
      this.add.image(400,300,'FireMap');

      createGame = this;

// creates camera and sets the boundaries for it
      var camera = this.cameras.main.setBounds(0,0,2000*2,2000*2);
      this.cameras.main.setBackgroundColor('red');
// sets world bounds to be 4000 x 4000
      this.physics.world.setBounds('FireMap');

// creates player interactionBox
      interactionBox = this.physics.add.sprite('10', '10', 'interactionBox');
      interactionBox.body.setImmovable(true);
      interactionBox.visible = false;
// creates the keys used for movement
      keys = this.input.keyboard.addKeys("W,A,S,D,E,P");

// creates audio
      this.walkingSound = this.sound.add('walking', {
          volume: 1,

      })

// creates the player from a spritesheet
      player = this.physics.add.sprite(130, 300, 'dude');
      interactionBox.setX(player.x);
      interactionBox.setY(player.y);

//creates interactables
      interactables = this.physics.add.staticGroup();

      //creates test interactable 100 pixels in front of 'dude' asset
      testInteractable = interactables.create(180, 500, 'testInteractable');
      //creates winTestBlock and loseTestBlock
      winTestBlock = interactables.create(300, 500, 'winBlock');
      loseTestBlock = interactables.create(340, 500, 'loseBlock');
      //changes created interactable hitbox size
      testInteractable.setSize(10,10);
//creates a lot of walls
      walls = this.physics.add.staticGroup();

      this.physics.add.collider(player, walls);
      //main 4 walls
      walls.create(96, -5, 'wall').setSize(32, 1120);
      walls.create(650, -5, 'wall').setSize(1120, 32);
      walls.create(1023,27, 'wall').setSize(32, 1120);
      walls.create(650, 540, 'wall').setSize(1220, 32);
      //longer inner walls
      walls.create(369, 188, 'wall').setSize(444, 32);
      walls.create(224, 90, 'wall').setSize(32, 200);
      walls.create(575, 90, 'wall').setSize(32, 200);
      //double-wide walls
      walls.create(719, 90, 'wall').setSize(64, 200);
      walls.create(879, 90, 'wall').setSize(64, 200);
      walls.create(880, 432, 'wall').setSize(64, 200);
      walls.create(720, 432, 'wall').setSize(64, 200);
      walls.create(560, 432, 'wall').setSize(64, 200);
      walls.create(400, 432, 'wall').setSize(64, 200);
      walls.create(240, 432, 'wall').setSize(64, 200);
      //hallway-facing walls
      walls.create(176, 348, 'wall').setSize(63, 32);
      walls.create(338, 348, 'wall').setSize(63, 32);
      walls.create(500, 348, 'wall').setSize(63, 32);
      walls.create(659, 348, 'wall').setSize(63, 32);
      walls.create(821, 348, 'wall').setSize(63, 32);
      walls.create(689, 188, 'wall').setSize(124, 32);
      walls.create(849, 188, 'wall').setSize(124, 32);
      walls.create(1009, 188, 'wall').setSize(124, 32);
      //small blocks near exit
      walls.create(896, 315, 'wall');
      walls.create(991, 316, 'wall');




//checks for interactionBox overlap
      this.physics.add.collider(player, interactables);
      this.physics.add.overlap(interactionBox, interactables, interaction);

// sets the player hitbox without changing image size
      player.setSize(30,50,true);

// moves the hitbox position to better fit the player image inside hitbox
      player.setOffset(16,12,true);
      player.setCollideWorldBounds(true);

      this.anims.create({
          key: 'left',
          frames: this.anims.generateFrameNumbers('dude', { start: 9, end: 17}),
          frameRate: 10,
          repeat: -1
      });


      this.anims.create({
          key:'up',
          frames: this.anims.generateFrameNumbers('dude', {start:0, end:8}),
          frameRate:10,
          repeat: -1
      })

      this.anims.create({
          key:'down',
          frames: this.anims.generateFrameNumbers('dude', {start: 18, end: 26}),
          frameRate:10,
          repeat: -1
      })

      this.anims.create({
          key: 'right',
          frames: this.anims.generateFrameNumbers('dude', { start: 27, end: 35 }),
          frameRate: 10,
          repeat: -1
      });

      camera.startFollow(player);
      camera.setZoom(3);

  }

  update ()
  {
// variables used to follow player's x & y cords
      var scrol_x = player.x - game.config.width/2;
      var scrol_y = player.y - game.config.height/2;

      player.setVelocityX(0);
      player.setVelocityY(0);
// moves main camera based on player x & y cords
      this.cameras.main.scrollX = scrol_x;
      this.cameras.main.scrollY = scrol_y;

// Player Movement
      if (keys.A.isDown)
      {
          player.setVelocityX(-160);

          player.anims.play('left', true);
          this.walkingSound.play();
          //changes position of interactionBox
          interactionBox.setSize(32, 32);
          interactionBox.body.setSize(32, 32);
          interactionBox.setX(player.x - 28);
          interactionBox.setY(player.y + 10);
      }
      else if (keys.D.isDown)
      {
          player.setVelocityX(160);

          player.anims.play('right', true);
          //changes position of interactionBox
          interactionBox.setSize(32, 32);
          interactionBox.body.setSize(32, 32);
          interactionBox.setX(player.x + 28);
          interactionBox.setY(player.y + 10);
        }
      else if (keys.W.isDown)
      {
          player.setVelocityY(-160);

          player.anims.play('up',true);
          //changes position of interactionBox
          interactionBox.setSize(32, 32);
          interactionBox.body.setSize(32, 32);
          interactionBox.setX(player.x );
          interactionBox.setY(player.y - 20);
      }
      else if (keys.S.isDown)
      {
          player.setVelocityY(160);
          player.anims.play('down',true);
          //changes position of interactionBox
          interactionBox.setSize(32, 32);
          interactionBox.body.setSize(32, 32);
          interactionBox.setX(player.x );
          interactionBox.setY(player.y + 40);
      }
      else if (keys.P.isDown)
      {
          console.log(player.x, "is x");
          console.log(player.y, "is y");

      }
      else
      {
          player.anims.stop();
          this.walkingSound.stop();
      }
  }
}

export default GameScene

//interaction function with win and lose testing paths
function interaction(interactionBox, interactable){
    if(keys.E.isDown){
      if(interactable == winTestBlock){
        createGame.scene.start('LevelEnd', {isSuccessful : true});
      }
      else if(interactable == loseTestBlock){
        createGame.scene.start('LevelEnd', {isSuccessful : false});
      }
        interactable.destroy();
    }
};
