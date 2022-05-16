import {CST} from "./CST.js"
class MenuScene extends Phaser.Scene {
  constructor() {
    super({
        key: CST.SCENES.MENU
    })
  }
  preload(){

  }
  create(){
      this.scene.start(CST.SCENES.MENU,"Hello")
  }
  update(){

  }
}
export default MenuScene
