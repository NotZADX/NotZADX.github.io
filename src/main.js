import Game from './game.js';
import Input from './input.js';
import UIManager from './systems/ui.js';
import levelsData from './data/levels.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const input = new Input(canvas);
const ui = new UIManager();

const game = new Game({ canvas, ctx, input, ui, levelsData });

let lastTime = 0;
function gameLoop(timestamp) {
  const deltaTime = (timestamp - lastTime) / 1000;
  lastTime = timestamp;
  game.update(deltaTime);
  game.render();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
