import config from '../config.js'

var keys
var player
var interactionBox
var interactables
var testInteractable

class GameScene extends Phaser.Scene{
  constructor(){
    super('Game');
  }
  create()  {
    var logo = this.add.image(400,150,'logo');
  }create ()
  {
// creates camera and sets the boundaries for it
      var camera = this.cameras.main.setBounds(0,0,2000*2,2000*2);
// sets world bounds to be 4000 x 4000
      this.physics.world.setBounds(0,0,2000*2,2000*2);
// creates a 4 x 4 of the 2000 x 2000 png image loaded as the background asset
      this.add.image(0,0,'bg').setOrigin(0);
      this.add.image(2000,0,'bg').setOrigin(0).setFlipX(true);
      this.add.image(0,2000,'bg').setOrigin(0).setFlipY(true);
      this.add.image(2000,2000).setOrigin(0).setFlipX(true).setFlipY(true);
// creates player interactionBox
      interactionBox = this.physics.add.sprite('10', '10', 'interactionBox');
      interactionBox.body.setImmovable(true);
      interactionBox.visible = false;


// creates the keys used for movement
      keys = this.input.keyboard.addKeys("W,A,S,D,E");

// creates the player from a spritesheet
      player = this.physics.add.sprite(100, 500, 'dude');
      interactionBox.setX(player.x);
      interactionBox.setY(player.y);

//creates interactables
      interactables = this.physics.add.staticGroup();
      testInteractable = interactables.create(30, 30, 'testInteractable');
//checks for interactionBox overlap    
      this.physics.add.collider(player, interactables);
      this.physics.add.overlap(interactionBox, interactables, interaction);

// sets the player hitbox without changing image size
      player.setSize(32,50,true);
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
      camera.setZoom(2.0);

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


      if (keys.A.isDown)
      {
          player.setVelocityX(-160);

          player.anims.play('left', true);
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
      else
      {
          player.anims.stop();
      }
  }




}
export default GameScene

//interaction function
function interaction(interactionBox, interactable){
    if(keys.E.isDown){
        interactable.destroy();
    }
}
