class EnemyManager {
  /** 敌人对象队列 */
  #enemyQueue = [];
  /** 队列状态 */
  #status; // 'Ready', 'Start', 'Over'
  /** 敌人对象的容器 */
  #goContainer;
  /** 上次加入队列的时间 */
  #lastEnqueueTime = 0;
  #thresholdTime = 1500;
  #speed = 0;

  constructor(speed) {
    this.#speed = speed;
    this.setStatus("Ready");
    this.#goContainer = new GameObject("enemy-container", {
      size: {
        width: 50,
        height: 50,
      },
      position: {
        x: 0,
        y: 0,
      },
    });
    game.scene.addChild(this.#goContainer);
  }

  getEnemyQueue() {
    return this.#enemyQueue;
  }

  /** 生成enemy，加入队列 */
  #generateEnemy() {
    // 随机生成一个enemy
    const nextEnemy =
      EnemiesType[Math.floor(Math.random() * EnemiesType.length)];
    const enemyGameObj = new GameObject("enemy", {
      size: nextEnemy.transform.size,
      position: nextEnemy.transform.position,
      origin: {
        x: 0.5,
        y: 0.5,
      },
    });
    enemyGameObj.addComponent(
      new Sprite({
        resource: "world-atlas",
        spriteName: nextEnemy.spriteName,
      })
    );
    this.#goContainer.addChild(enemyGameObj);
    this.#enemyQueue.push(enemyGameObj);
    // 最小距离：min(身位+当前敌人的宽度, 恐龙跳跃动画时长)；在此基础上做随机
    this.#thresholdTime =
      (2000 *
        (1.5 * PosSizeMap["Hero"].size.width +
          nextEnemy.transform.size.width +
          Math.random() * 300)) /
      this.#speed; 
  }

  #updateHandler = {
    Start: (evt) => {
      // 间隔一段时间之后在屏幕之外生成一个新的🌵
      this.#lastEnqueueTime += evt.deltaTime;
      if (this.#lastEnqueueTime > this.#thresholdTime) {
        this.#generateEnemy();
        this.#lastEnqueueTime = 0;
      }
      this.#enemyQueue.forEach((_) => {
        if (_.transform.position.x < 0) {
          _.destroy();
          this.#goContainer.removeChild(_);
        } else {
          const speed = this.#speed;
          _.transform.position.x -= (speed * evt.deltaTime) / 1000;
        }
      });
      this.#enemyQueue = this.#enemyQueue.filter((_) => !_.destroyed);
    },
  };

  update(evt) {
    const updateHandler = this.#updateHandler[this.#status];
    updateHandler && updateHandler(evt);
  }

  setStatus(status) {
    this.#status = status;
    if (this.#status === "Ready") {
      this.#enemyQueue.forEach((_) => {
        _.destroy();
        this.#goContainer.removeChild(_);
      });
      this.#enemyQueue = [];
    }
  }
}
