var config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        physics: {
          default: 'arcade',
          arcade: {
              gravity: { y: 0 },
              debug: false
          }
        }
}

export default config;
