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

        this.load.spritesheet('fire', 'assets/Fire2.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('dude', 'assets/professor.png', { frameWidth: 64, frameHeight: 64});
    }

    function create ()
    {
        this.physics.world.setBounds(0,0,1600,1200);

        bg = this.add.image(400,280,'bg');
          


        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        player = this.physics.add.sprite(100, 500, 'dude');
        player.setSize(32,52,true);
        fire = this.physics.add.sprite(200,300,'fire');

        this.anims.create({
            key: 'fire',
            frames: this.anims.generateFrameNumbers('fire', {start: 1, end: 59}),
            frameRate:30,
            repeat: -1
        })

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


        keys = this.input.keyboard.addKeys("W,A,S,D");


        this.physics.add.collider(player, platforms);



    }

    function update ()
    {
        fire.anims.play('fire',true);

        player.setVelocityX(0);
        player.setVelocityY(0);

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


    function collectStar (player, star)
    {
        star.disableBody(true, true);
    }
