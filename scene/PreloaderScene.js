class PreloaderScene extends Phaser.Scene{
  constructor() {
    super('Preloader');
  }
  preload() {
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222,0.8);
    progressBox.fillRect(240,270,320,50);

    this.load.on('progress',function (value){
      console.log(value);
      progressBar.clear();
      progressBar.fillStyle(0xffffff,1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });
    this.load.on('fileprogress', function (file){
      console.log(file.src);
    });
    this.load.on('complete', function (){
      console.log('complete');

    })

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;

    this.load.audio('walking','assets/audio/player_walking.mp3')

    //loads map assets
    this.load.image('FireMap','assets/FireMap.png');
    this.load.image('wall', 'assets/wall.png');

    // Loads assets game assets

    this.load.spritesheet('dude', 'assets/professor.png', { frameWidth: 64, frameHeight: 64});
    this.load.image('testInteractable', 'assets/interactable.png');
    this.load.image('winBlock', 'assets/winBlock.png');
    this.load.image('loseBlock', 'assets/loseBlock.png');
    this.load.image('bed','assets/Bed.png');
    this.load.image('closet','assets/Closet.png');
    this.load.image('desk','assets/Desk.png');
    this.load.image('window','assets/Window.png');
    this.load.spritesheet('candle', 'assets/candle.png', {frameWidth: 32, frameWidth: 32});
    this.load.image('toaster', 'assets/Toaster.png');
    this.load.image('cord', 'assets/extensionCord.png');


    // loads game audio
    this.load.audio('click', ['assets/audio/UIClick.ogg', 'assets/audio/UIClick.mp3']);

    // placeholder
    this.load.image('logo','assets/PhaserLogo.png');


  }
  create()  {

    //Launches the ui with the game

    this.scene.start('Menu');
  }
  update()  {

  }

}
export default PreloaderScene
