import Projectile from './projectile.js';

export default class Tower {
  constructor(tile, data) {
    this.tile = tile;
    this.data = data;
    this.level = 1;
    this.damage = data.damage;
    this.range = data.range;
    this.fireRate = data.fireRate;
    this.projectileSpeed = data.projectileSpeed;
    this.targeting = data.targeting;
    this.bulletType = data.bulletType;
    this.aoeRadius = data.aoeRadius || 0;
    this.slowAmount = data.slowAmount || 0;
    this.slowDuration = data.slowDuration || 0;
    this.cooldown = 0;
    this.totalCost = data.cost;
  }

  get center() {
    return {
      x: this.tile.x * 64 + 32,
      y: this.tile.y * 64 + 32
    };
  }

  update(deltaTime, enemies, projectiles) {
    this.cooldown -= deltaTime;
    if (this.cooldown > 0) return;
    const target = this.findTarget(enemies);
    if (target) {
      this.shoot(target, projectiles);
      this.cooldown = 1 / this.fireRate;
    }
  }

  findTarget(enemies) {
    const inRange = enemies.filter((enemy) => {
      const dist = Math.hypot(enemy.position.x - this.center.x, enemy.position.y - this.center.y);
      return dist <= this.range && !enemy.reachedGoal && !enemy.isDead();
    });
    if (!inRange.length) return null;
    switch (this.targeting) {
      case 'closest':
        return inRange.sort((a, b) => {
          const da = Math.hypot(a.position.x - this.center.x, a.position.y - this.center.y);
          const db = Math.hypot(b.position.x - this.center.x, b.position.y - this.center.y);
          return da - db;
        })[0];
      case 'strong':
        return inRange.sort((a, b) => b.health - a.health)[0];
      case 'last':
        return inRange.sort((a, b) => a.pathProgress - b.pathProgress)[0];
      case 'first':
      default:
        return inRange.sort((a, b) => b.pathProgress - a.pathProgress)[0];
    }
  }

  shoot(target, projectiles) {
    const projectile = new Projectile({
      position: this.center,
      target,
      damage: this.damage,
      speed: this.projectileSpeed,
      color: this.data.color,
      aoeRadius: this.bulletType === 'aoe' ? (this.aoeRadius || 60) : 0,
      slowEffect: this.bulletType === 'slow' ? { amount: this.slowAmount, duration: this.slowDuration } : null
    });
    projectiles.push(projectile);
  }

  upgrade() {
    const upgradeData = this.data.upgradeLevels[this.level - 1];
    if (!upgradeData) return null;
    this.level += 1;
    this.range *= upgradeData.rangeMultiplier ?? 1;
    this.damage *= upgradeData.damageMultiplier ?? 1;
    this.fireRate *= upgradeData.fireRateMultiplier ?? 1;
    if (upgradeData.aoeRadius) this.aoeRadius = upgradeData.aoeRadius;
    if (upgradeData.slowAmount) this.slowAmount = upgradeData.slowAmount;
    this.totalCost += upgradeData.cost;
    return upgradeData.cost;
  }

  canUpgrade() {
    return Boolean(this.data.upgradeLevels[this.level - 1]);
  }

  sellRefundAmount() {
    return Math.floor(this.totalCost * 0.7);
  }

  draw(ctx, selected) {
    const center = this.center;
    ctx.save();
    ctx.fillStyle = this.data.color;
    ctx.strokeStyle = selected ? '#fff' : 'rgba(255,255,255,0.4)';
    ctx.lineWidth = selected ? 3 : 1;
    ctx.beginPath();
    ctx.arc(center.x, center.y, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    if (selected) {
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.beginPath();
      ctx.arc(center.x, center.y, this.range, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }
}
