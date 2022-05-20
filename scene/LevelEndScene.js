class LevelEndScene extends Phaser.Scene{
  constructor(){
    super('LevelEnd');
  }
  init(data)  {
    this.isSuccessful = data.isSuccessful;
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create(data){
    this.cameras.main.backgroundColor.setTo(255,255,255);
    if(this.isSuccessful == true){
      this.add.text(10, 70,'You found all of the hazards!\nGood Job!', {font: '48px Arial', fill: 'black'});

      const continueButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Continue')
        .setOrigin(0.5)
        .setPadding(10)
        .setStyle({ backgroundColor: '#111' })
        .setInteractive({ useHandCursor: true })

        .on('pointerover', () => { console.log('pointerovercontinue');})
        .on('pointerup', () => this.scene.start('Boot'))

      const backButton = this.add.text(100, 50, 'Return to menu')
        .setOrigin(0.5)
        .setPadding(10)
        .setStyle({ backgroundColor: '#111' })
        .setInteractive({ useHandCursor: true })

        .on('pointerover', () => { console.log('pointeroverback');})
        .on('pointerup', () => this.scene.start('Menu'))
    }
    else{
        this.add.text(10,70,'You didn\'t find all of the hazards,\n resulting in a fire.', {font: '48px Arial', fill: 'black'});
        const retryButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Retry')
          .setOrigin(0.5)
          .setPadding(10)
          .setStyle({ backgroundColor: '#111' })
          .setInteractive({ useHandCursor: true })

          .on('pointerover', () => { console.log('pointeroverretry');})
          .on('pointerup', () => this.scene.start('Game'))

        const backButton = this.add.text(100, 50, 'Return to menu')
          .setOrigin(0.5)
          .setPadding(10)
          .setStyle({ backgroundColor: '#111' })
          .setInteractive({ useHandCursor: true })

          .on('pointerover', () => { console.log('pointeroverback');})
          .on('pointerup', () => this.scene.start('Menu'))
    }
  }
}
export default LevelEndScene
