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
    click = this.sound.add('click');

    this.add.text(0, 0, '0x0')
    this.add.text(25, 100, 'INSTRUCTIONS:')
    this.add.text(150, 100, 'In this game you and Mr.P have to take on the')
    this.add.text(50, 125, 'role of a Hanover RA and search through this dorm hall')
    this.add.text(50, 150, 'for any fire safety hazards. There are multiple items')
    this.add.text(50, 175, 'to be found on each level you play but you may leave')
    this.add.text(50, 200, 'the building whenever you wnat. But, if the building is')
    this.add.text(50, 225, 'left and there are still hazards inside. You jeapordize')
    this.add.text(50, 250, 'the safety of everyone inside and will lose the game.')

    this.add.text(25, 300, 'CONTROLS: controls for this game are fairly simple.')
    this.add.text(50, 350, 'WASD is the standard movement scheme for this game')
    this.add.text(50, 375, 'W - UP')
    this.add.text(50, 400, 'A - LEFT')
    this.add.text(50, 425, 'S - RIGHT')
    this.add.text(50, 450, 'D - DOWN')
    this.add.text(50, 475, 'E - Interact')
    this.add.text(50, 525, 'E is the interact button which can be used to grab/remove')
    this.add.text(50, 550, 'any of the hazards you come across in the game')

    this.add.text(900, 100, 'HANOVER FIRE SAFETY POLICIES:')
    this.add.text(850, 150, 'Candles are a common ignition source in residential fires.')
    this.add.text(850, 170, 'Candles and Incense are not permitted anywhere in residences,')
    this.add.text(850, 190, 'including student rooms, common areas, hallways, bathrooms,')
    this.add.text(850, 210, 'and porches.')
    this.add.text(850, 230, 'Smokers should only smoke outside (25 feet) as smoking is')
    this.add.text(850, 250, 'prohibited in all residential units.')
    this.add.text(850, 270, 'All seasonal decorations, particularly Christmas decorations, must')
    this.add.text(850, 290, 'be approved by the Residence Life staff. Only artificial trees and')
    this.add.text(850, 310, 'greenery may be used in student rooms and decorative lighting must')
    this.add.text(850, 330, 'be kept away from drapery/combustible materials.')
    this.add.text(850, 350, 'Room lights, smoke detectors and heating units may not be')
    this.add.text(850, 370, 'covered at any time')
    this.add.text(850, 390, 'All occupants of a College residence must vacate the building when')
    this.add.text(850, 410, 'the fire alarm is sounded.')
    this.add.text(850, 430, 'Fire extinguishers and fire alarm boxes are to be used only for')
    this.add.text(850, 450, 'emergencies. False alarms are illegal and dangerous.')
    this.add.text(850, 470, 'Electrical cooking appliances, space heaters, and other')
    this.add.text(850, 490, 'appliances with "open" heating elements are not permitted')
    this.add.text(850, 510, 'in student dorms.')
    this.add.text(850, 530, 'Power strips connected to strong electrical loads could begin')
    this.add.text(850, 550, 'heating of the wires to ')

    this.add.text(1430, 700, '1430x700')

    this.cameras.main.backgroundColor.setTo(0,0,0);

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
