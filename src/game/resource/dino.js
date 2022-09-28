const DinoResource = [
  {
    name: "bg-floor",
    type: RESOURCE_TYPE.IMAGE,
    src: {
      image: {
        type: "png",
        url: "../../assets/dino-bg-floor.png",
      },
    },
    preload: true,
  },
  {
    name: "hero-run-anim",
    type: RESOURCE_TYPE.SPRITE_ANIMATION,
    src: {
      image: {
        type: "png",
        url: "../../assets/dino-run-anim.png",
      },
      json: {
        type: "json",
        url: "../../assets/dino-run-anim.json",
      },
    },
    preload: true,
  },
  {
    name: "world-atlas",
    type: RESOURCE_TYPE.SPRITE,
    src: {
      image: {
        type: "png",
        url: "../../assets/dino-world-atlas.png",
      },
      json: {
        type: "json",
        url: "../../assets/dino-world-atlas.json",
      },
    },
    preload: true,
  },
  {
    name: 'bg-music',
    type: RESOURCE_TYPE.AUDIO,
    src: {
      audio: {
        type: 'audio',
        url: '../../assets/dino-bg-music.mp3',
      },
    },
    preload: true,
  },
  {
    name: 'gameover-sound',
    type: RESOURCE_TYPE.AUDIO,
    src: {
      audio: {
        type: 'audio',
        url: '../../assets/dino-gameover-sound.mp3',
      },
    },
    preload: true,
  },
];

const DinoAlphaBetMap = {
  0: "img_0023_图层-24",
  1: "img_0024_图层-25",
  2: "img_0025_图层-26",
  3: "img_0026_图层-27",
  4: "img_0027_图层-28",
  5: "img_0028_图层-29",
  6: "img_0029_图层-30",
  7: "img_0030_图层-31",
  8: "img_0031_图层-32",
  9: "img_0032_图层-33",

  HI: "img_0033_图层-34",
  G: "img_0034_图层-35",
  A: "img_0035_图层-36",
  M: "img_0036_图层-37",
  E: "img_0037_图层-38",
  O: "img_0038_图层-39",
  V: "img_0039_图层-40",
  R: "img_0041_图层-42",

  HeroDie: "img_0046_图层-47",

  Sky: 'img_0001_图层-2'
};

const DinoPosSizeMap = {
  Hero: {
    size: {
      width: 50,
      height: 50,
    },
    position: {
      x: 50,
      y: 130,
    },
  },
  Floor: {
    size: {
      width: 2400,
      height: 29,
    },
    position: {
      x: 0,
      y: 130,
    },
  },
  HiScore: {
    size: {
      width: 100,
      height: 10,
    },
    position: {
      x: 200,
      y: 10,
    },
  },
  PlayerScore: {
    size: {
      width: 100,
      height: 10,
    },
    position: {
      x: 260,
      y: 10,
    },
  },
  "Char-HI": {
    size: {
      width: 20,
      height: 10,
    },
    position: "do not set",
  },
  "ScoreChar-Digit": {
    size: {
      width: 10,
      height: 10,
    },
    position: "do not set",
    leadingSpace: 30,
    space: 10,
  },
  GameOverTitle: {
    size: {
      width: 1000,
      height: 30,
    },
    position: {
      x: 50,
      y: 60,
    },
  },
  "TitleChar-Letter": {
    size: {
      width: 15,
      height: 15,
    },
    position: "do not set",
    space: 50,
  },
  Sky: {
    size: {
      width: 92 * 0.5,
      height: 47 * 0.5
    },
    position: {
      x: 900,
      y: "do not set"
    }
  }
};

const DinoEnemiesType = [
  {
    spriteName: "img_0004_图层-5",
    transform: {
      size: {
        width: 34 * 0.8,
        height: 70 * 0.8,
      },
      position: {
        x: 700,
        y: 125,
      },
    },
  },
  {
    spriteName: "img_0006_图层-7",
    transform: {
      size: {
        width: 34 * 0.8,
        height: 70 * 0.8,
      },
      position: {
        x: 700,
        y: 125,
      },
    },
  },
  {
    spriteName: "img_0008_图层-9",
    transform: {
      size: {
        width: 34 * 0.8,
        height: 70 * 0.8,
      },
      position: {
        x: 700,
        y: 125,
      },
    },
  },
  {
    spriteName: "img_0010_图层-11",
    transform: {
      size: {
        width: 50 * 0.56,
        height: 100 * 0.56,
      },
      position: {
        x: 700,
        y: 125,
      },
    },
  },
  {
    spriteName: "img_0012_图层-13",
    transform: {
      size: {
        width: 50 * 0.56,
        height: 100 * 0.56,
      },
      position: {
        x: 700,
        y: 125,
      },
    },
  },
  {
    spriteName: "img_0014_图层-15",
    transform: {
      size: {
        width: 104 * 0.56,
        height: 100 * 0.56,
      },
      position: {
        x: 700,
        y: 125,
      },
    },
  },
];

const DinoResSet = {
  Resource: DinoResource,
  AlphaBetMap: DinoAlphaBetMap,
  PosSizeMap: DinoPosSizeMap,
  EnemiesType: DinoEnemiesType,
};
