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
var candle
var extensionCord
var toaster
var closet
var hazards
var physics
var leaveAreaBox


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

      this.scene.launch('ui-scene');

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
// creates level end area
      leaveAreaBox = this.physics.add.sprite(960, 440, 'leaveAreaBox');
      leaveAreaBox.visible = false;
      leaveAreaBox.body.setImmovable(true);
      leaveAreaBox.setSize(100, 220);


//creates interactables
      interactables = this.physics.add.staticGroup();


// creates objects

    //creates a physics variable for collision effects
      physics = this.physics.add.staticGroup();

      //north side desks
      physics.create(125,35,'desk'); // 1st room on top
      physics.create(605,35,'desk'); // 2nd room on top
      physics.create(765,35,'desk'); // 3rd room on top
      physics.create(925,35,'desk'); // 4th room on top

      //south side desks
      physics.create(125,500,'desk'); // 1st room on bottom
      physics.create(285,500,'desk'); // 2nd room on bottom
      physics.create(445,500,'desk'); // 3rd room on bottom
      physics.create(605,500,'desk'); // 4th room on bottom
      physics.create(765,500,'desk'); // 5th room on bottom

      //north side beds
      physics.create(190,45,'bed'); // 1st room on top
      physics.create(670,45,'bed'); // 2nd room on top
      physics.create(830,45,'bed'); // 3rd room on top
      physics.create(990,45,'bed'); // 4th room on top

      //south side beds
      physics.create(190,490,'bed').toggleFlipY().toggleFlipX(); // 1st room on bottom
      physics.create(350,490,'bed').toggleFlipY().toggleFlipX(); // 2nd room on bottom
      physics.create(510,490,'bed').toggleFlipY().toggleFlipX(); // 3rd room on bottom
      physics.create(670,490,'bed').toggleFlipY().toggleFlipX(); // 4th room on bottom
      physics.create(830,490,'bed').toggleFlipY().toggleFlipX(); // 5th room on bottom

      //fire hazards
      hazards = [candle, toaster, extensionCord, closet];
      candle = this.physics.add.staticSprite(445, 500, 'candle');
      toaster = physics.create(670, 156, 'toaster').toggleFlipY();
      extensionCord = physics.create(768, 465, 'cord');
      closet = physics.create(155, 27, 'closet').toggleFlipX().toggleFlipY();
      interactables.add(candle);
      interactables.add(toaster);
      interactables.add(extensionCord);
      interactables.add(closet);

//creates a lot of walls

      //main 4 walls
      physics.create(96, -5, 'wall').setSize(32, 1120);
      physics.create(650, -5, 'wall').setSize(1120, 32);
      physics.create(1023,27, 'wall').setSize(32, 1120);
      physics.create(650, 540, 'wall').setSize(1220, 32);
      //longer inner walls
      physics.create(369, 188, 'wall').setSize(444, 32);
      physics.create(224, 90, 'wall').setSize(32, 200);
      physics.create(575, 90, 'wall').setSize(32, 200);
      //double-wide walls
      physics.create(719, 90, 'wall').setSize(64, 200);
      physics.create(879, 90, 'wall').setSize(64, 200);
      physics.create(880, 432, 'wall').setSize(64, 200);
      physics.create(720, 432, 'wall').setSize(64, 200);
      physics.create(560, 432, 'wall').setSize(64, 200);
      physics.create(400, 432, 'wall').setSize(64, 200);
      physics.create(240, 432, 'wall').setSize(64, 200);
      //hallway-facing walls
      physics.create(176, 348, 'wall').setSize(55, 32);
      physics.create(338, 348, 'wall').setSize(55, 32);
      physics.create(500, 348, 'wall').setSize(55, 32);
      physics.create(659, 348, 'wall').setSize(55, 32);
      physics.create(821, 348, 'wall').setSize(55, 32);
      physics.create(689, 188, 'wall').setSize(124, 32);
      physics.create(849, 188, 'wall').setSize(124, 32);
      physics.create(1009, 188, 'wall').setSize(124, 32);
      //small blocks near exit
      physics.create(896, 315, 'wall');
      physics.create(991, 316, 'wall');


//checks for interactionBox overlap
      this.physics.add.collider(player, interactables);
      this.physics.add.collider(player, physics);
      this.physics.add.overlap(interactionBox, interactables, interaction);
//checks for player overlap with leaveAreaBox
      this.physics.add.overlap(player, leaveAreaBox, exit);

// sets the player hitbox without changing image size
      player.setSize(30,50,true);

// moves the hitbox position to better fit the player image inside hitbox
      player.setOffset(16,12,true);
      player.setCollideWorldBounds(true);

      this.anims.create({
        key: 'flicker',
        frames: this.anims.generateFrameNumbers('candle', {start: 0, end: 8}),
        frameRate: 15,
        repeat: -1
      });


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

  update()  {

        if(hazards.includes(candle)){
          candle.anims.play('flicker', true);
        }

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
        //removes interactable from hazards array
        var indexOfInteractable = hazards.indexOf(interactable);
        hazards.splice(indexOfInteractable, 1);

        if(interactable == candle){
          candle.anims.stop();
        }

        interactable.destroy();
        if(hazards.length == 0){
          console.log('array is empty');
        }


    }
};
//called when the player enters the exit area of the map
function exit(player, leaveAreaBox){
    if(hazards.length == 0){
      createGame.scene.start('LevelEnd', {isSuccessful : true});
    }
    else{
      createGame.scene.start('LevelEnd', {isSuccessful : false});
    }

}
