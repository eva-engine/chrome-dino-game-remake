class BgSkyComp extends Component {
  #speed;
  #playing = false;

  init() {}

  constructor(worldConfig) {
    super();
    this.#speed = worldConfig?.speed * 0.4 ?? 200;
  }

  update(evt) {
    if (this.#playing) {
      this.gameObject.transform.position.x -=
        (evt.deltaTime * this.#speed) / 1000;
      if (
        this.gameObject.transform.position.x +
          this.gameObject.transform.size.width <=
        0
      ) {
        this.gameObject.transform.position = _generateSkyPos();
      }
    }
  }

  play() {
    this.#playing = true;
  }

  pause() {
    this.#playing = false;
  }
}

function _generateSkyPos() {
  return {
    x: PosSizeMap["Sky"].position.x * Math.random() * 1.5,
    y: Math.random() * 50 + 10 ,
  };
}

function _createBgSky(game, worldConfig) {
  const skyGameObj = new GameObject("floor", {
    size: PosSizeMap["Sky"].size,
    position: _generateSkyPos(),
  });
  skyGameObj.addComponent(
    new Sprite({
      resource: "world-atlas",
      spriteName: AlphaBetMap["Sky"],
    })
  );
  const sky = skyGameObj.addComponent(new BgSkyComp(worldConfig));
  game.scene.addChild(skyGameObj);
  return sky;
}

function createBgSky(game, worldConfig) {
  const skies = new Array(3).fill('').map(_ => _createBgSky(game, worldConfig));

  const controller = {
    play() {
      skies.forEach((_) => _.play());
    },
    pause() {
      skies.forEach((_) => _.pause());
    },
  };
  return controller;
}
