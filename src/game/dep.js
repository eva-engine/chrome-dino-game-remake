const {
  Game,
  RESOURCE_TYPE,
  resource, 
  plugin,
  Component,
  GameObject,
  LOAD_EVENT
} = window.EVA;
const {
  RendererSystem,
} = plugin.renderer;
const {
  EventSystem,
} = plugin.renderer.event;
const {
  ImgSystem,
  Img,
} = plugin.renderer.img;
const {
  Sprite, 
  SpriteSystem,
} = plugin.renderer.sprite;
const {
  SpriteAnimation,
  SpriteAnimationSystem,
} = plugin.renderer.spriteAnimation;
const {
  Sound,
  SoundSystem,
} = plugin.sound;
const {
  Transition,
  TransitionSystem,
} = plugin.transition;


console.log('plugin = ', plugin);