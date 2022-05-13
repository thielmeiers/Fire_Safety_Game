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

    var player;
    var platforms;
    var cursors;
    var keys;

    var game = new Phaser.Game(config);



    function preload ()
    {
        this.load.image('bg', 'assets/background.png');
        this.load.image('ground', 'assets/platform.png');


        this.load.spritesheet('dude', 'assets/professor.png', { frameWidth: 64, frameHeight: 64});
    }

    function create ()
    {

        var camera = this.cameras.main.setBounds(0,0,2000*2,2000*2);
        this.physics.world.setBounds(0,0,2000*2,2000*2);

        this.add.image(0,0,'bg').setOrigin(0);
        this.add.image(2000,0,'bg').setOrigin(0).setFlipX(true);
        this.add.image(0,2000,'bg').setOrigin(0).setFlipY(true);
        this.add.image(2000,2000).setOrigin(0).setFlipX(true).setFlipY(true);



        keys = this.input.keyboard.addKeys("W,A,S,D");

        platforms = this.physics.add.staticGroup();



        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        player = this.physics.add.sprite(100, 500, 'dude');
        player.setSize(32,52,true);





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

        this.physics.add.collider(player, platforms);



    }

    function update ()
    {

        var scrol_x = player.x - game.config.width/2;
        var scrol_y = player.y - game.config.height/2;


        player.setVelocityX(0);
        player.setVelocityY(0);

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
