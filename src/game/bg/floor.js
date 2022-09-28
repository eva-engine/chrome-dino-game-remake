class BgFloorComp extends Component {
  #speed;
  #playing = false;

  init() {}

  constructor(worldConfig) {
    super();
    this.#speed = worldConfig?.speed ?? 200;
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
        this.gameObject.transform.position.x =
          this.gameObject.transform.size.width;
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

function _createBgFloor(
  game,
  worldConfig,
  posX = PosSizeMap["Floor"].position.x
) {
  const floorGameObj = new GameObject("floor", {
    size: PosSizeMap["Floor"].size,
    position: {
      x: posX,
      y: PosSizeMap["Floor"].position.y,
    },
  });
  floorGameObj.addComponent(
    new Img({
      resource: "bg-floor",
    })
  );
  const floor = floorGameObj.addComponent(new BgFloorComp(worldConfig));
  game.scene.addChild(floorGameObj);
  return floor;
}

function createBgFloor(game, worldConfig) {
  const floors = [
    _createBgFloor(game, worldConfig),
    _createBgFloor(game, worldConfig, PosSizeMap["Floor"].size.width),
  ];

  const controller = {
    play() {
      floors.forEach((_) => _.play());
    },
    pause() {
      floors.forEach((_) => _.pause());
    },
  };
  return controller;
}
