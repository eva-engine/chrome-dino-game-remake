
const { Resource, AlphaBetMap, PosSizeMap, EnemiesType } = DinoResSet;
// const { Resource, AlphaBetMap, PosSizeMap, EnemiesType } = KittyResSet;
class DinoGame {
  game = null;
  scene = null;

  constructor() {
    const canvasEl = document.getElementById('game-scene');
    const canvasRect = canvasEl.getBoundingClientRect();

    this.game = new Game({
      frameRate: 60,
      autoStart: false,
      systems: [
        new RendererSystem({
          canvas: document.getElementById('game-scene'),
          width: canvasRect.width,
          height: canvasRect.height,
          transparent: true,
          // resolution: window.devicePixelRatio / 2, // 可选, 如果是2倍图设计 可以除以2
          enableScroll: false, // 允许页面滚动
          renderType: 1 // 0:自动判断，1: WebGL，2:Canvas，建议android6.1 ios9 以下使用Canvas，需业务判断。
        }),
        new ImgSystem(),
        new SpriteSystem(),
        new SpriteAnimationSystem(),
        new SoundSystem(),
        new TransitionSystem(),
      ]
    });

    this.scene = this.game.scene;
    this.scene.transform.size.width = canvasRect.width;
    this.scene.transform.size.height = canvasRect.height;
  }

  loadResource() {
    resource.addResource(Resource);
    resource.on(LOAD_EVENT.COMPLETE, () => {
      const curtainDom = document.querySelector('#error');
      curtainDom.style.animation = 'curtain-up 1.2s ease-in-out forwards';
    });
    resource.preload();
  }

  start() {
    this.game.start();
  }
}
