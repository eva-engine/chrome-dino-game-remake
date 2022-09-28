class WorldComp extends Component {
  worldConfig;

  gameState = 'Ready'; // 'Ready', 'Start', 'Over'
  playerScore = 0;

  hero;
  bgFloor;
  bgSky;
  panel;
  enemyManager;
  soundManager;

  _duringGameOverFreezing;

  constructor(worldConfig) {
    super();

    /** worldConfig
     *    .speed
     *    .gameOverFreezingTimeMS
     */
    this.worldConfig = worldConfig;
  }

  init() {
    this.bgFloor = createBgFloor(game, this.worldConfig);
    this.bgSky = createBgSky(game, this.worldConfig);
    this.enemyManager = new EnemyManager(this.worldConfig.speed);
    this.hero = createHero(game);
    this.panel = createPanel(game);
    this.soundManager = createSoundManager();

    this._gameOverFreezingTime = false;

    this.initUserInterop();
    this.gameReady();
  }

  update(evt) {
    this.collisionDetect(evt.deltaTime);
    this.enemyManager.update(evt);
  }

  gameReady() {
    this.gameState = 'Ready';
    this.playerScore = 0;

    this.enemyManager.setStatus(this.gameState);
    this.panel.setPlayerScore(this.playerScore);
    this.panel.showGameOverTitle(false);
    this.panel.setHiScore(this.panel.loadHiScore());
    this.hero.born();
  }

  gameStart() {
    this.gameState = 'Start';
    this.hero.run();
    this.enemyManager.setStatus(this.gameState);
    this.bgFloor.play();
    this.bgSky.play();
    // this.soundManager.play('bg-music');
  }

  gameOver() {
    this.gameState = 'Over';
    this.enemyManager.setStatus(this.gameState);
    this.bgFloor.pause();
    this.bgSky.pause();
    this.panel.showGameOverTitle(true);
    this.soundManager.pause('bg-music');
    // this.soundManager.play('gameover-sound');

    this._duringGameOverFreezing = true;
    setTimeout(() => {
      this._duringGameOverFreezing = false;
    }, this.worldConfig.gameOverFreezingTimeMS);
  }

  initUserInterop() {
    document.addEventListener('keypress', (evt) => {
      if (evt.code == 'Space') {
        switch(this.gameState) {
          case 'Ready': {
            this.gameStart();
            break;
          }
          case 'Start': {
            this.hero.jump().then(() => {
              const newScoreVal = ++this.playerScore;
              this.panel.setPlayerScore(newScoreVal);

              const hiScoreVal = this.panel.loadHiScore();
              if (newScoreVal > hiScoreVal) {
                this.panel.saveHiScore(newScoreVal);
              }
            }).catch(() => {

            });
            break;
          }
        }
      }
    });
    document.addEventListener('keyup', (evt) => {
      if (this._duringGameOverFreezing == false) {
        if (evt.code == 'Space' && this.gameState == 'Over') {
          this.gameReady();
          Promise.resolve().then(() => {
            this.gameStart();
          });
        }
      }
    });
  }

  collisionDetect(deltaTime) {
    if (this.gameState == 'Start') {
      const enemies = this.enemyManager.getEnemyQueue();
      for (const enemy of enemies) {
        if (this._heroCollideWith(enemy)) {
          this.hero.die();
          this.gameOver();
          break;
        }
      }
    }
  }

  _heroCollideWith(enemy) {
    const heroGO = this.hero.gameObject;
    const hDistPos = Math.abs(heroGO.transform.position.x - enemy.transform.position.x);
    const hDistHalfSize = (heroGO.transform.size.width + enemy.transform.size.width) / 2;
    const hIntersect = hDistPos - hDistHalfSize <= -10;

    const vDistPos = Math.abs(heroGO.transform.position.y - enemy.transform.position.y);
    const vDistHalfSize = (heroGO.transform.size.height + enemy.transform.size.height) / 2;
    const vIntersect = vDistPos - vDistHalfSize <= -10;

    const intersect = hIntersect && vIntersect;
    return intersect;
  }
}

function createWorldGameObj(game, worldConfig, worldElements) {
  const world = new GameObject('world');
  const worldComp = new WorldComp(worldConfig, worldElements);
  world.addComponent(worldComp);
  game.scene.addChild(world);
}