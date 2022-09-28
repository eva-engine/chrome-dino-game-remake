class GameOverTitleComp extends Component {
  initialScaleX;

  init() {
    this.initialScaleX = this.gameObject.transform.scale.x;
  }

  show(show = true) {
    if (show) {
      this.gameObject.transform.scale.x = this.initialScaleX;
    } else {
      this.gameObject.transform.scale.x = 0;
    }
  }
}

function createGameOverTitle(panelGameObj) {
  function addChild(parentGO, x, y, childGOName, mapKeyName) {
    const childGO = new GameObject(childGOName, {
      size: PosSizeMap['TitleChar-Letter'].size,
      position: {
        x: x,
        y: y,
      }
    });
    childGO.addComponent(new Sprite({
      resource: 'world-atlas',
      spriteName: AlphaBetMap[mapKeyName],
    }));

    parentGO.addChild(childGO);
  }

  const parentGameObj = new GameObject('gameOverTitle', {
    size: PosSizeMap['GameOverTitle'].size,
    position: PosSizeMap['GameOverTitle'].position,
  });
  panelGameObj.addChild(parentGameObj);

  let xx = PosSizeMap['GameOverTitle'].position.x;
  let y = PosSizeMap['GameOverTitle'].position.y;
  let stepX = PosSizeMap['TitleChar-Letter'].space;
  xx = 10;
  y = 10;
  addChild(parentGameObj, xx+=stepX, y, 'title-G', 'G');
  addChild(parentGameObj, xx+=stepX, y, 'title-A', 'A');
  addChild(parentGameObj, xx+=stepX, y, 'title-M', 'M');
  addChild(parentGameObj, xx+=stepX, y, 'title-E', 'E');
  addChild(parentGameObj, xx+=stepX, y, 'title-O', 'O');
  addChild(parentGameObj, xx+=stepX, y, 'title-V', 'V');
  addChild(parentGameObj, xx+=stepX, y, 'title-E', 'E');
  addChild(parentGameObj, xx+=stepX, y, 'title-R', 'R');

  const gameOverTitle = parentGameObj.addComponent(new GameOverTitleComp());
  return gameOverTitle;
}