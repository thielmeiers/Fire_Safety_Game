// Imports
import config from './config.js'
import GameScene from './scene/GameScene.js'
import BootScene from './scene/BootScene.js'
import PreloaderScene from './scene/PreloaderScene.js'
import MenuScene from './scene/MenuScene.js'
import InfoScene from './scene/InfoScene.js'
import LevelEndScene from './scene/LevelEndScene.js'

//game variables



class Game extends Phaser.Game  {
  constructor(){
    super(config);
    this.scene.add('Game', GameScene);
    this.scene.add('Boot', BootScene);
    this.scene.add('Menu',  MenuScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Info', InfoScene);
    this.scene.add('LevelEnd', LevelEndScene);
    this.scene.start('Menu');
  }
}

window.onload = function () {
  window.game = new Game();
}
