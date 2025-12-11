import Level from './systems/level.js';
import WaveManager from './systems/waveManager.js';
import towersData from './data/towers.js';
import Tower from './entities/tower.js';

const GameStates = {
  MAIN_MENU: 'MAIN_MENU',
  LEVEL_SELECT: 'LEVEL_SELECT',
  GAMEPLAY: 'GAMEPLAY',
  PAUSE: 'PAUSE',
  GAME_OVER: 'GAME_OVER',
  LEVEL_COMPLETE: 'LEVEL_COMPLETE'
};

class AudioManager {
  constructor() {
    this.musicMuted = false;
    this.sfxMuted = false;
  }

  playMusic() {
    // placeholder
  }

  playSound() {
    // placeholder
  }
}

export default class Game {
  constructor({ canvas, ctx, input, ui, levelsData }) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.input = input;
    this.ui = ui;
    this.levelsData = levelsData;
    this.tileSize = 64;
    this.level = new Level(this.tileSize);
    this.waveManager = null;
    this.state = GameStates.MAIN_MENU;
    this.enemies = [];
    this.towers = [];
    this.projectiles = [];
    this.money = 0;
    this.lives = 0;
    this.selectedTowerType = null;
    this.selectedTower = null;
    this.gameSpeed = 1;
    this.audio = new AudioManager();
    this.progress = this.loadProgress();
    this.ui.setGame(this);
    this.ui.populateLevels(this.levelsData, this.progress.completedLevels);
    this.currentLevelId = null;
    this.messageTimer = 0;
  }

  loadProgress() {
    const stored = localStorage.getItem('cyber-defense-progress');
    if (stored) return JSON.parse(stored);
    const progress = { completedLevels: [], settings: { musicMuted: false, sfxMuted: false } };
    localStorage.setItem('cyber-defense-progress', JSON.stringify(progress));
    return progress;
  }

  saveProgress() {
    localStorage.setItem('cyber-defense-progress', JSON.stringify(this.progress));
  }

  applySettings(settings) {
    this.progress.settings = settings;
    this.saveProgress();
  }

  changeState(state) {
    this.state = state;
    switch (state) {
      case GameStates.MAIN_MENU:
        this.ui.showScreen('main');
        break;
      case GameStates.LEVEL_SELECT:
        this.ui.showScreen('levelSelect');
        break;
      case GameStates.GAMEPLAY:
        this.ui.showScreen('overlay');
        break;
      case GameStates.PAUSE:
        this.ui.showScreen('pause');
        break;
      case GameStates.LEVEL_COMPLETE:
      case GameStates.GAME_OVER:
        this.ui.showScreen('end');
        break;
    }
  }

  startLevel(levelId) {
    const levelData = this.levelsData.find((l) => l.id === levelId);
    if (!levelData) return;
    this.level.load(levelData);
    this.waveManager = new WaveManager(this.level);
    this.enemies = [];
    this.towers = [];
    this.projectiles = [];
    this.money = this.level.startingMoney;
    this.lives = this.level.startingLives;
    this.selectedTowerType = null;
    this.selectedTower = null;
    this.gameSpeed = 1;
    this.currentLevelId = levelId;
    this.changeState(GameStates.GAMEPLAY);
    this.ui.populateTowerList(this.money, this.selectedTowerType);
    this.ui.updateHUD({ money: this.money, lives: this.lives, wave: this.waveManager.currentWaveIndex + 1, totalWaves: this.waveManager.totalWaves });
  }

  startWave() {
    if (this.waveManager && !this.waveManager.isWaveInProgress()) {
      this.waveManager.startNextWave(this.enemies);
      this.enemies.forEach((enemy) => enemy.setStart(this.level.pathPoints[0]));
    }
  }

  toggleSpeed() {
    this.gameSpeed = this.gameSpeed === 1 ? 2 : 1;
    this.ui.updateSpeedButton(this.gameSpeed);
  }

  pause() {
    if (this.state !== GameStates.GAMEPLAY) return;
    this.changeState(GameStates.PAUSE);
  }

  resume() {
    if (this.state === GameStates.PAUSE) {
      this.changeState(GameStates.GAMEPLAY);
    }
  }

  restartLevel() {
    if (this.currentLevelId) {
      this.startLevel(this.currentLevelId);
      this.changeState(GameStates.GAMEPLAY);
    }
  }

  quitToMenu() {
    this.changeState(GameStates.MAIN_MENU);
  }

  backToLevelSelect() {
    this.changeState(GameStates.LEVEL_SELECT);
  }

  selectTowerToBuild(towerId) {
    this.selectedTowerType = towerId;
    this.selectedTower = null;
    this.ui.populateTowerList(this.money, this.selectedTowerType);
    this.ui.showTowerInfo(null);
  }

  handleTileClick(tileX, tileY) {
    const existingTower = this.towers.find((t) => t.tile.x === tileX && t.tile.y === tileY);
    if (existingTower) {
      this.selectedTower = existingTower;
      const canUpgrade = existingTower.canUpgrade();
      const nextUpgrade = existingTower.data.upgradeLevels[existingTower.level - 1];
      const upgradeCost = nextUpgrade?.cost ?? 0;
      this.ui.showTowerInfo(existingTower, canUpgrade && this.money >= upgradeCost, upgradeCost, existingTower.sellRefundAmount());
      return;
    }
    if (!this.selectedTowerType) return;
    if (!this.level.isTileBuildable(tileX, tileY)) return;
    const towerData = towersData.find((t) => t.id === this.selectedTowerType);
    if (!towerData || towerData.cost > this.money) return;
    this.money -= towerData.cost;
    const tower = new Tower({ x: tileX, y: tileY }, towerData);
    this.towers.push(tower);
    this.ui.populateTowerList(this.money, this.selectedTowerType);
    this.ui.updateHUD({ money: this.money, lives: this.lives, wave: this.waveManager.currentWaveIndex + 1, totalWaves: this.waveManager.totalWaves });
  }

  sellSelectedTower() {
    if (!this.selectedTower) return;
    const refund = this.selectedTower.sellRefundAmount();
    this.money += refund;
    this.towers = this.towers.filter((t) => t !== this.selectedTower);
    this.selectedTower = null;
    this.ui.flashMessage(`Refunded ${refund}`);
    this.ui.populateTowerList(this.money, this.selectedTowerType);
    this.ui.showTowerInfo(null);
  }

  upgradeSelectedTower() {
    if (!this.selectedTower) return;
    const upgradeData = this.selectedTower.data.upgradeLevels[this.selectedTower.level - 1];
    if (!upgradeData || this.money < upgradeData.cost) return;
    this.money -= this.selectedTower.upgrade();
    const canUpgrade = this.selectedTower.canUpgrade();
    const nextUpgrade = this.selectedTower.data.upgradeLevels[this.selectedTower.level - 1];
    const upgradeCost = nextUpgrade?.cost ?? 0;
    this.ui.showTowerInfo(this.selectedTower, canUpgrade && this.money >= upgradeCost, upgradeCost, this.selectedTower.sellRefundAmount());
    this.ui.populateTowerList(this.money, this.selectedTowerType);
    this.ui.updateHUD({ money: this.money, lives: this.lives, wave: this.waveManager.currentWaveIndex + 1, totalWaves: this.waveManager.totalWaves });
  }

  update(deltaTime) {
    const adjustedDelta = deltaTime * this.gameSpeed;
    switch (this.state) {
      case GameStates.MAIN_MENU:
        this.ui.showScreen('main');
        break;
      case GameStates.LEVEL_SELECT:
        this.ui.showScreen('levelSelect');
        break;
      case GameStates.PAUSE:
      case GameStates.GAME_OVER:
      case GameStates.LEVEL_COMPLETE:
        return;
      case GameStates.GAMEPLAY:
        this.updateGameplay(adjustedDelta);
        break;
    }
  }

  updateGameplay(deltaTime) {
    if (this.input.consumeClick()) {
      this.handleTileClick(this.input.tile.x, this.input.tile.y);
    }

    this.waveManager?.update(deltaTime, this.enemies);

    this.enemies.forEach((enemy) => {
      if (enemy.position.x === 0 && enemy.position.y === 0) {
        enemy.setStart(this.level.pathPoints[0]);
      }
      enemy.update(deltaTime, this.level.pathPoints);
    });

    for (let i = this.enemies.length - 1; i >= 0; i -= 1) {
      const enemy = this.enemies[i];
      if (enemy.reachedGoal) {
        this.lives -= enemy.lifeDamage;
        this.enemies.splice(i, 1);
      } else if (enemy.isDead()) {
        this.money += enemy.reward;
        this.enemies.splice(i, 1);
      }
    }

    this.towers.forEach((tower) => tower.update(deltaTime, this.enemies, this.projectiles));

    this.projectiles.forEach((proj) => proj.update(deltaTime, this.enemies));
    this.projectiles = this.projectiles.filter((p) => !p.isDone);

    this.checkOutcome();
    this.ui.updateHUD({ money: this.money, lives: this.lives, wave: Math.max(this.waveManager.currentWaveIndex + 1, 0), totalWaves: this.waveManager.totalWaves });
    this.ui.populateTowerList(this.money, this.selectedTowerType);
  }

  checkOutcome() {
    if (this.lives <= 0) {
      this.state = GameStates.GAME_OVER;
      this.ui.showEndScreen({ title: 'Defeat', stats: `Waves cleared: ${this.waveManager.currentWaveIndex + 1}` });
      return;
    }
    if (this.waveManager?.isAllWavesFinished()) {
      this.state = GameStates.LEVEL_COMPLETE;
      if (!this.progress.completedLevels.includes(this.currentLevelId)) {
        this.progress.completedLevels.push(this.currentLevelId);
        this.saveProgress();
        this.ui.populateLevels(this.levelsData, this.progress.completedLevels);
      }
      this.ui.showEndScreen({ title: 'Level Complete', stats: `Credits: ${this.money}` });
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();
    this.drawPath();
    this.towers.forEach((tower) => tower.draw(this.ctx, tower === this.selectedTower));
    this.enemies.forEach((enemy) => enemy.draw(this.ctx));
    this.projectiles.forEach((p) => p.draw(this.ctx));
  }

  drawGrid() {
    for (let y = 0; y < this.level.map.length; y++) {
      for (let x = 0; x < this.level.map[y].length; x++) {
        const tile = this.level.map[y][x];
        this.ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        this.ctx.strokeRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
        if (tile === 0) {
          this.ctx.fillStyle = 'rgba(51,255,238,0.03)';
        } else if (tile === 1) {
          this.ctx.fillStyle = 'rgba(255,63,164,0.2)';
        } else {
          this.ctx.fillStyle = 'rgba(255,255,255,0.05)';
        }
        this.ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
      }
    }
  }

  drawPath() {
    this.ctx.save();
    this.ctx.strokeStyle = 'rgba(255,63,164,0.6)';
    this.ctx.lineWidth = 12;
    this.ctx.beginPath();
    this.level.pathPoints.forEach((point, idx) => {
      if (idx === 0) {
        this.ctx.moveTo(point.x, point.y);
      } else {
        this.ctx.lineTo(point.x, point.y);
      }
    });
    this.ctx.stroke();
    this.ctx.restore();
  }
}

export { GameStates };
