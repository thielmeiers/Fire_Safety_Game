var pflag = 0
var create
class UIScene extends Phaser.Scene{

  constructor()
  {
      super('ui-scene');
  }
  create()
  {
    create = this
    const pauseButton = this.add.text(70, 25, 'Pause Game')
      .setOrigin(0.5)
      .setPadding(10)
      .setStyle({ backgroundColor: '#111' })
      .setInteractive({ useHandCursor: true })
      .on('pointerup', () => pause_game())
  }

}

export default UIScene
function pause_game() {
  if (pflag == 1) {
    console.log('resume');
    create.scene.resume('Game');
    pflag = 0;}
  else {
    console.log('pause');
    create.scene.pause('Game');
    create.scene.launch('test');
    pflag = 1;
  }
  }
