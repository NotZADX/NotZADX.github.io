import enemiesData from '../data/enemies.js';
import Enemy from '../entities/enemy.js';

export default class WaveManager {
  constructor(level) {
    this.level = level;
    this.currentWaveIndex = -1;
    this.spawnInterval = 0;
    this.timer = 0;
    this.queue = [];
    this.totalWaves = level.waves.length;
    this.active = false;
  }

  startNextWave(enemiesList) {
    if (this.currentWaveIndex + 1 >= this.level.waves.length) return false;
    this.currentWaveIndex++;
    const wave = this.level.waves[this.currentWaveIndex];
    this.spawnInterval = wave.spawnInterval / 1000;
    this.timer = 0;
    this.queue = [];
    wave.enemies.forEach((entry) => {
      for (let i = 0; i < entry.count; i++) {
        this.queue.push(entry.type);
      }
    });
    this.active = true;
    this.spawnEnemy(enemiesList); // spawn immediately
    return true;
  }

  spawnEnemy(enemiesList) {
    if (!this.queue.length) return;
    const type = this.queue.shift();
    const definition = enemiesData[type];
    if (!definition) return;
    const enemy = new Enemy(definition);
    enemy.setStart(this.level.pathPoints[0]);
    enemiesList.push(enemy);
  }

  update(deltaTime, enemiesList) {
    if (!this.active) return;
    this.timer += deltaTime;
    if (this.timer >= this.spawnInterval && this.queue.length) {
      this.timer = 0;
      this.spawnEnemy(enemiesList);
    }
    if (!this.queue.length && enemiesList.length === 0) {
      this.active = false;
    }
  }

  isWaveInProgress() {
    return this.active || this.queue.length > 0;
  }

  isAllWavesFinished() {
    return this.currentWaveIndex >= this.level.waves.length - 1 && !this.isWaveInProgress();
  }
}
