export default class Projectile {
  constructor({ position, target, damage, speed, color, aoeRadius = 0, slowEffect }) {
    this.position = { ...position };
    this.target = target;
    this.damage = damage;
    this.speed = speed;
    this.color = color;
    this.aoeRadius = aoeRadius;
    this.slowEffect = slowEffect;
    this.isDone = false;
  }

  update(deltaTime, enemies) {
    if (!this.target || this.target.isDead() || this.target.reachedGoal) {
      this.isDone = true;
      return;
    }
    const dx = this.target.position.x - this.position.x;
    const dy = this.target.position.y - this.position.y;
    const distance = Math.hypot(dx, dy);
    const dirX = dx / (distance || 1);
    const dirY = dy / (distance || 1);
    this.position.x += dirX * this.speed * deltaTime;
    this.position.y += dirY * this.speed * deltaTime;

    if (distance < 8) {
      this.applyDamage(enemies);
      this.isDone = true;
    }
  }

  applyDamage(enemies) {
    if (this.aoeRadius > 0) {
      enemies.forEach((enemy) => {
        const dist = Math.hypot(enemy.position.x - this.position.x, enemy.position.y - this.position.y);
        if (dist <= this.aoeRadius) {
          enemy.takeDamage(this.damage);
        }
      });
    } else if (this.target) {
      this.target.takeDamage(this.damage);
      if (this.slowEffect) {
        this.target.applySlow(this.slowEffect.amount, this.slowEffect.duration);
      }
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
