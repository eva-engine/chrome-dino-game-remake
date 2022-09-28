const game = new DinoGame();
game.loadResource();

createWorldGameObj(game, {
  speed: 280, // 一秒移动多少像素
  gameOverFreezingTimeMS: 500,
});

game.start();
