class BootScene extends Phaser.Scene{
  constructor() {
    super('Boot');
  }
  preload() {
    this.load.image('HClogo','assets/HanoverLogo.png');
  }
  create()  {
    this.scene.start('Game')
  }
  update()  {
  }

}
export default BootScene
