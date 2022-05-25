class TestScene extends Phaser.Scene {
  constructor() {
    super('test')
  }
  preload() {
    this.load.image('test', 'assets/test.png');
  }
  create()  {
    this.add.image(300,300,'test');
  }
}

export default TestScene
