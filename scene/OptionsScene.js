var click

class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }
  init(data)  {
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  preload() {
    this.load.audio('click', ['assets/audio/UIClick.ogg', 'assets/audio/UIClick.mp3']);
  }
  create(){
    click = this.sound.add('click');

    this.cameras.main.backgroundColor.setTo(255,255,255);


    const backButton = this.add.text(100, 50, 'Back')
      .setOrigin(0.5)
      .setPadding(10)
      .setStyle({ backgroundColor: '#111' })
      .setInteractive({ useHandCursor: true })

      .on('pointerover', () => { console.log('pointeroverback');})
      .on('pointerup', () => this.scene.stop('Options'))
      .on('pointerup', () => this.scene.resume('Game'))
      .on('pointerup', () => { console.log('resume');})
      .on('pointerup', () => click.play())
  }
}
export default OptionsScene
