function _createSoundGameObj(resourceName, options) {
  const gameObj = new GameObject(resourceName);
  const gameComponent = gameObj.addComponent(
    new Sound({
      resource: resourceName,
      ...(options ?? {}),
    })
  );
  return gameComponent;
}

function createSoundManager() {
  const soundEffects = {
    "bg-music": _createSoundGameObj("bg-music", {
      loop: true,
      autoplay: false,
    }),
    "gameover-sound": _createSoundGameObj("gameover-sound", {
      loop: false,
      autoplay: false,
    }),
  };

  const controller = {
    play(resourceName) {
      soundEffects[resourceName]?.play();
    },
    pause(resourceName) {
      if (resourceName) {
        soundEffects[resourceName]?.pause();
      } else {
        Object.values(resourceName).forEach((_) => _.pause());
      }
    },
  };
  return controller;
}
