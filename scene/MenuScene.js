
class MenuScene extends Phaser.Scene {

  constructor() {
    super('Menu');
  }
  init(data)  {
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  preload() {
    this.load.image('start_button','assets/playbutton.png');
  }
  create(data)  {

    //sets background color of menu scene
    this.cameras.main.backgroundColor.setTo(255,255,255);

    // creates "Menu" text in top left of window
    this.add.text(10,10,'Fire Safety Game', {font: '48px Arial', fill: 'black'});

    // creates a start Button makes interactive, and ties it to start 'Boot' Scene after clicking
    const startButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Start game')
      .setOrigin(0.5)
      .setPadding(10)
      .setStyle({ backgroundColor: '#111' })
      .setInteractive({ useHandCursor: true })

      .on('pointerover', () => { console.log('pointeroverstart');})
      .on('pointerup', () => this.scene.start('Boot'))

    // creates info button
    const infoButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY+100, 'How to play')
      .setOrigin(0.5)
      .setPadding(10)
      .setStyle({ backgroundColor: '#111' })
      .setInteractive({ useHandCursor: true })

      .on('pointerover', () => { console.log('pointeroverinfo');})
      .on('pointerup', () => this.scene.start('Info'))



  }

  update()  {

  }
}
export default MenuScene
