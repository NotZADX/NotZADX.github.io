export default class Level {
  constructor(tileSize = 64) {
    this.tileSize = tileSize;
    this.map = [];
    this.pathPoints = [];
    this.startingMoney = 0;
    this.startingLives = 0;
    this.waves = [];
    this.name = '';
  }

  load(levelData) {
    this.map = levelData.map;
    this.pathPoints = levelData.pathPoints.map((p) => ({
      x: p.x * this.tileSize + this.tileSize / 2,
      y: p.y * this.tileSize + this.tileSize / 2
    }));
    this.startingMoney = levelData.startingMoney;
    this.startingLives = levelData.startingLives;
    this.waves = levelData.waves;
    this.name = levelData.name;
  }

  isTileBuildable(x, y) {
    if (!this.map[y] || typeof this.map[y][x] === 'undefined') return false;
    return this.map[y][x] === 0;
  }

  getTileAt(x, y) {
    if (!this.map[y]) return 2;
    return this.map[y][x] ?? 2;
  }
}
