import { getPathDirection } from '../systems/path.js';

export default class Enemy {
  constructor(definition) {
    this.data = definition;
    this.position = { x: 0, y: 0 };
    this.speed = definition.speed;
    this.health = definition.maxHealth;
    this.maxHealth = definition.maxHealth;
    this.reward = definition.reward;
    this.lifeDamage = definition.lifeDamage;
    this.armor = definition.armor || 0;
    this.pathIndex = 0;
    this.reachedGoal = false;
    this.slowTimer = 0;
    this.slowAmount = 0;
    this.pathProgress = 0;
  }

  setStart(point) {
    this.position = { ...point };
  }

  applySlow(amount, duration) {
    this.slowAmount = Math.max(this.slowAmount, amount);
    this.slowTimer = Math.max(this.slowTimer, duration);
  }

  takeDamage(amount) {
    const dmg = Math.max(amount - this.armor, 1);
    this.health -= dmg;
  }

  update(deltaTime, pathPoints) {
    if (this.health <= 0 || this.reachedGoal) return;
    if (this.slowTimer > 0) {
      this.slowTimer -= deltaTime;
      if (this.slowTimer <= 0) this.slowAmount = 0;
    }
    const targetIndex = Math.min(this.pathIndex + 1, pathPoints.length - 1);
    const target = pathPoints[targetIndex];
    const direction = getPathDirection(this.position, target);
    const speed = this.speed * (1 - this.slowAmount);
    this.position.x += direction.x * speed * deltaTime;
    this.position.y += direction.y * speed * deltaTime;

    const distSq = (this.position.x - target.x) ** 2 + (this.position.y - target.y) ** 2;
    if (distSq < 16) {
      if (targetIndex === pathPoints.length - 1) {
        this.reachedGoal = true;
      } else {
        this.pathIndex++;
      }
    }
    this.pathProgress = this.pathIndex + Math.random() * 0.1; // rough ordering for targeting
  }

  isDead() {
    return this.health <= 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.data.color;
    ctx.strokeStyle = '#0a0f1a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(this.position.x - 14, this.position.y - 14, 28, 28);
    ctx.fill();
    ctx.stroke();
    // health bar
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillRect(this.position.x - 15, this.position.y - 22, 30, 5);
    ctx.fillStyle = '#58ff9a';
    const healthWidth = (this.health / this.maxHealth) * 30;
    ctx.fillRect(this.position.x - 15, this.position.y - 22, healthWidth, 5);
    ctx.restore();
  }
}
