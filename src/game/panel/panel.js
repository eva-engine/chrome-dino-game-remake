class PanelComp extends Component {
  hiScore;
  playerScore;

  init() {
    this.hiScore = this.gameObject.transform.children.find(child => child.gameObject.name == 'hiScore').gameObject.getComponent(ScoreComp);
    this.playerScore = this.gameObject.transform.children.find(child => child.gameObject.name == 'playerScore').gameObject.getComponent(ScoreComp);
    this.gameOver = this.gameObject.transform.children.find(child => child.gameObject.name == 'gameOverTitle').gameObject.getComponent(GameOverTitleComp);
    this.gameOver.show(false);
  }

  setPlayerScore(newScoreVal) {
    this.playerScore.setScore(newScoreVal);
  }

  setHiScore(newScoreVal) {
    this.hiScore.setScore(newScoreVal);
  }

  saveHiScore(newScoreVal) {
    this.hiScore.saveScore(newScoreVal);
  }

  loadHiScore() {
    const hiScoreVal = this.hiScore.loadScore();
    return hiScoreVal;
  }

  showGameOverTitle(show = true) {
    this.gameOver.show(show);
  }
}

function createPanel(game) {
  const panelGameObj = new GameObject('panel', {
    size: {
      width: game.scene.canvas.getBoundingClientRect().width,
      height: game.scene.canvas.getBoundingClientRect().height,
    },
    position: {
      x: 0,
      y: 0
    },
  });

  createScore(panelGameObj, 'hiScore', PosSizeMap['HiScore'].position, PosSizeMap['HiScore'].size, 5, true);
  createScore(panelGameObj, 'playerScore', PosSizeMap['PlayerScore'].position, PosSizeMap['PlayerScore'].size, 5, false);
  createGameOverTitle(panelGameObj);

  const panel = panelGameObj.addComponent(new PanelComp());
  game.scene.addChild(panelGameObj);
  return panel;
}