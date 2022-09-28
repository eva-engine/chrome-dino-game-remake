class HeroComp extends Component {
  _startPosY;

  _jumpResolve;
  _jumpReject;

  _runAnim;
  _jumAnim;
  _dieSprite;

  init() {
    this._startPosY = this.gameObject.transform.position.y;
  }

  born() {
    this.gameObject.transform.position.y = this._startPosY;

    if (this._dieSprite) {
      this.gameObject.removeComponent(Sprite);
      this._dieSprite = null;
    }
    this._runAnim = this.gameObject.addComponent(new SpriteAnimation({
      resource: 'hero-run-anim',
      speed: 100,
      autoPlay: false,
    }));

    this._jumAnim = this.gameObject.addComponent(new Transition());
    this._jumAnim.group = {
      jump: [{
        name: 'position.y',
        component: this.gameObject.transform,
        values: [
          {
            time: 0,
            value: this._startPosY,
            tween: 'ease-out',
          },
          {
            time: 300,
            value: this._startPosY - 100,
            tween: 'ease-in'
          },
          {
            time: 600,
            value: this._startPosY,
          }
        ]
      }]
    };
    this._jumAnim.on('finish', (animName) => {
      if (animName == 'jump' && this._jumpResolve) {
        this._jumpResolve();
        this._jumpResolve = null;
      }
    });
  }

  run() {
    if (this._runAnim) {
      this._runAnim.play();
    }
  }

  jump() {
    if (this._jumpResolve != null) {
      return;
    }
    return new Promise((resolve, reject) => {
      this._jumpResolve = resolve;
      this._jumpReject = reject;

      if (this._jumAnim) {
        this._jumAnim.play();
      }
    });
  }

  die() {
    if (this._runAnim) {
      this._runAnim.stop();
      if (this._jumAnim) {
        this._jumAnim.stop();
        this._jumAnim = null;
        this.gameObject.removeComponent(Transition);
      }
      this.gameObject.removeComponent(SpriteAnimation);
      this._runAnim = null;
      this._dieSprite = this.gameObject.addComponent(new Sprite({
        resource: 'world-atlas',
        spriteName: AlphaBetMap['HeroDie'],
      }));
    }
    if (this._jumpReject) {
      this._jumpReject();
      this._jumpResolve = null;
      this._jumpReject = null;
    }
  }
}

function createHero(game) {
  const heroGameObj = new GameObject('hero', {
    size: PosSizeMap['Hero'].size,
    position: PosSizeMap['Hero'].position,
    origin: {
      x: 0.5,
      y: 0.5
    },
  });

  const hero = heroGameObj.addComponent(new HeroComp());
  game.scene.addChild(heroGameObj);
  return hero;
}