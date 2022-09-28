class ScoreComp extends Component {
  digitsSpr = [];
  hiSpr;
  localStoreKeyName = 'ALL-TB-GAME-DEV-PRACTICE-2022-SCR';

  init() {
    for (const child of this.gameObject.transform.children) {
      if (child.gameObject.name == 'HI') {
        this.hiSpr = child.gameObject.getComponent(Sprite);
      } else  {
        const match = child.gameObject.name.match(/digit_(\d)/);
        if (match) {
          this.digitsSpr[match[1]] = child.gameObject.getComponent(Sprite);
        }
      }
    }
  }

  setScore(newScore) {
    if (typeof newScore == 'number') {
      newScore = newScore.toString();
    }
    const digitList = newScore.split('');
    const diff = this.digitsSpr.length - digitList.length;
    if (diff > 0) {
      digitList.unshift(...new Array(diff).fill('0'));
    }
    for (let i = 0; i < digitList.length; i++) {
      this.setDigitVal(i, digitList[i]);
    }
  }

  setDigitVal(digitIdx, newVal) {
    const dSpr = this.digitsSpr[digitIdx];
    dSpr.spriteName = AlphaBetMap[newVal];
  }

  loadScore() {
    const key = this.localStoreKeyName;
    const score = localStorage.getItem(key);
    if (score == null) {
      this.saveScore(0);
      return 0;
    }
    return parseInt(score);
  }

  saveScore(score) {
    const key = this.localStoreKeyName;
    localStorage.setItem(key, score.toString());
  }
}

function createScore(panelGameObj, scoreGameObjName, position, size, digitNum = 5, isHiScore = false) {
  const parentGameObj = new GameObject(scoreGameObjName, {
    size ,
    position,
  });
  panelGameObj.addChild(parentGameObj);

  let xx = position.x;

  if (isHiScore) {
    const highGameObj = new GameObject(`HI`, {
      size: PosSizeMap['Char-HI'].size,
      position: {
        x: xx,
        y: position.y,
      },
    });
    highGameObj.addComponent(new Sprite({
      resource: 'world-atlas',
      spriteName: AlphaBetMap['HI'],
    }))
    parentGameObj.addChild(highGameObj);
  }

  for (let i = 0; i < digitNum; i++) {
    const childScoreGameObj = new GameObject(`digit_${i}`, {
      size: PosSizeMap['ScoreChar-Digit'].size,
      position: {
        x: (i == 0) ? xx += PosSizeMap['ScoreChar-Digit'].leadingSpace : xx += PosSizeMap['ScoreChar-Digit'].space,
        y: position.y,
      },
    });
    childScoreGameObj.addComponent(new Sprite({
      resource: 'world-atlas',
      spriteName: AlphaBetMap['0'],
    }));
    parentGameObj.addChild(childScoreGameObj);
  }

  const score = parentGameObj.addComponent(new ScoreComp());
  return score;
}
