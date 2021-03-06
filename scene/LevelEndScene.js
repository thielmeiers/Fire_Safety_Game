var click
class LevelEndScene extends Phaser.Scene{
  constructor(){
    super('LevelEnd');
  }
  init(data)  {
    this.isSuccessful = data.isSuccessful;
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  preload(){
    this.load.audio('click', ['assets/audio/UIClick.ogg', 'assets/audio/UIClick.mp3']);
  }

  create(data){
    this.scene.stop('ui-scene');
    click = this.sound.add('click');
    this.cameras.main.backgroundColor.setTo(255,255,255);
    if(this.isSuccessful == true){
      this.add.text(10, 70,'You found all of the hazards!\nGood Job!', {font: '48px Arial', fill: 'black'});

      const continueButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Continue')
        .setOrigin(0.5)
        .setPadding(10)
        .setStyle({ backgroundColor: '#111' })
        .setInteractive({ useHandCursor: true })

        .on('pointerover', () => { console.log('pointerovercontinue');})
        .on('pointerup', openSurvey, this)
        .on('pointerup', () => click.play())

      const backButton = this.add.text(100, 50, 'Return to menu')
        .setOrigin(0.5)
        .setPadding(10)
        .setStyle({ backgroundColor: '#111' })
        .setInteractive({ useHandCursor: true })

        .on('pointerover', () => { console.log('pointeroverback');})
        .on('pointerup', () => this.scene.start('Menu'))
        .on('pointerup', () => click.play())
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
          .on('pointerup', () => click.play())

        const backButton = this.add.text(100, 50, 'Return to menu')
          .setOrigin(0.5)
          .setPadding(10)
          .setStyle({ backgroundColor: '#111' })
          .setInteractive({ useHandCursor: true })

          .on('pointerover', () => { console.log('pointeroverback');})
          .on('pointerup', () => this.scene.start('Menu'))
          .on('pointerup', () => click.play())
    }
  }
}
export default LevelEndScene
function openSurvey ()
{

    var url = 'https://forms.gle/WHZMPbUEdhGppo3t8';

    var s = window.open(url, '_blank');

    if (s && s.focus)
    {
        s.focus();
    }
    else if (!s)
    {
        window.location.href = url;
    }
}
