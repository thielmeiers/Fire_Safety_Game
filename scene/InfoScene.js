var click
class InfoScene extends Phaser.Scene{
  constructor(){
    super('Info');
  }
  init(data){
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  preload(){
    this.load.audio('click', ['assets/audio/UIClick.ogg', 'assets/audio/UIClick.mp3']);
  }

  create(data){
    this.scene.stop('ui-scene');
    click = this.sound.add('click');

    this.cameras.main.backgroundColor.setTo(255,255,255);

    const backButton = this.add.text(100, 50, 'Return to menu')
      .setOrigin(0.5)
      .setPadding(10)
      .setStyle({ backgroundColor: '#111' })
      .setInteractive({ useHandCursor: true })

      .on('pointerover', () => { console.log('pointeroverinfo');})
      .on('pointerup', () => this.scene.start('Menu'))
      .on('pointerup', () => click.play())
  }
}
export default InfoScene
