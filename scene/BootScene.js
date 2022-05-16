class BootScene extends Phaser.Scene{
  constructor() {
    super('Boot');
  }
  preload() {
    this.load.image('HClogo','assets/HanoverLogo.png');
  }
  create()  {
    this.scene.start('Preloader')
  }
  update()  {

  }

}
export default BootScene
