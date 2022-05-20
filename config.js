var config = {
        type: Phaser.AUTO,
        width: window.innerWidth * window.devicePixelRatio,
        height: window.innerHeight * window.devicePixelRatio,
        physics: {
          default: 'arcade',
          arcade: {
              gravity: { y: 0 },
              debug: false
          }
        }
}

export default config;
