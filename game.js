
//sets configuration for game elements
var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },

        scene: {

            preload: preload,
            create: create,
            update: update
        }
    };

//game variables
    var player;
    var platforms;
    var cursors;
    var keys;


    var game = new Phaser.Game(config);



    function preload ()
    {
      game.load.tilemap('FireMap', 'assets/FireMap.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.image('tiles', 'assets/FireMap Tileset.png');


        this.load.spritesheet('dude', 'assets/professor.png', { frameWidth: 64, frameHeight: 64});
    }
    var map;
    var layer;

    function create ()
    {

      map = game.add.tilemap('FireMap');
      map.addTilesetImages('Bed','Bed (flipped)','Closet','Closet (flipped)')
      layer = map.createLayer('Tile Layer 1')
// creates camera and sets the boundaries for it
        var camera = this.cameras.main.setBounds(0,0,2000*2,2000*2);
// sets world bounds to be 4000 x 4000
        this.physics.world.setBounds(0,0,2000*2,2000*2);
// creates a 4 x 4 of the 2000 x 2000 png image loaded as the background asset
        this.add.image(0,0,'bg').setOrigin(0);
        this.add.image(2000,0,'bg').setOrigin(0).setFlipX(true);
        this.add.image(0,2000,'bg').setOrigin(0).setFlipY(true);
        this.add.image(2000,2000).setOrigin(0).setFlipX(true).setFlipY(true);


// creates the keys used for movement
        keys = this.input.keyboard.addKeys("W,A,S,D");

        platforms = this.physics.add.staticGroup();



        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

// creates the player from a spritesheet
        player = this.physics.add.sprite(100, 500, 'dude');
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
        camera.setZoom(4.5);

        this.physics.add.collider(player, platforms);



    }

    function update ()
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
        }
        else if (keys.D.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);
          }
        else if (keys.W.isDown)
        {
            player.setVelocityY(-160);

            player.anims.play('up',true);
        }
        else if (keys.S.isDown)
        {
            player.setVelocityY(160);
            player.anims.play('down',true);

        }
        else
        {
            player.anims.stop();
        }
    }
