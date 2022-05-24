// Imports
import config from './config.js'
import GameScene from './scene/GameScene.js'
import BootScene from './scene/BootScene.js'
import PreloaderScene from './scene/PreloaderScene.js'
import MenuScene from './scene/MenuScene.js'
import UIScene from './scene/UIScene.js'
import TestScene from './scene/TestScene.js'
import InfoScene from './scene/InfoScene.js'
import LevelEndScene from './scene/LevelEndScene.js'


//game variables



class Game extends Phaser.Game  {
  constructor(){
    super(config);
    this.scene.add('Game', GameScene);
    this.scene.add('Boot', BootScene);
    this.scene.add('Menu',  MenuScene);
    this.scene.add('ui-scene', UIScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('test', TestScene);
    this.scene.add('Info', InfoScene);
    this.scene.add('LevelEnd', LevelEndScene);
    this.scene.start('Preloader');




  }
}

window.onload = function () {
  window.game = new Game();
}
