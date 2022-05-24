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


    this.load.image('tiles', 'assets/FireMapSet.png');
      console.log('fire map tileset loaded');
    this.load.tilemapTiledJSON('FireMap',"assets/FireMap.json");
      console.log('fire map preload is Successful');


    // Loads assets into game
    this.load.image('bg', 'assets/background.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.spritesheet('dude', 'assets/professor.png', { frameWidth: 64, frameHeight: 64});
    this.load.image('testInteractable', 'assets/interactable.png');
    this.load.image('winBlock', 'assets/winBlock.png');
    this.load.image('loseBlock', 'assets/loseBlock.png');
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
