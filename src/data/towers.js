const towers = [
  {
    id: 'basic',
    name: 'Gun Tower',
    cost: 80,
    range: 160,
    damage: 20,
    fireRate: 1.1,
    projectileSpeed: 380,
    targeting: 'first',
    bulletType: 'single',
    color: '#33ffee',
    upgradeLevels: [
      { cost: 60, rangeMultiplier: 1.1, damageMultiplier: 1.3, fireRateMultiplier: 1.1 },
      { cost: 90, rangeMultiplier: 1.25, damageMultiplier: 1.5, fireRateMultiplier: 1.2 }
    ]
  },
  {
    id: 'sniper',
    name: 'Sniper Tower',
    cost: 150,
    range: 280,
    damage: 60,
    fireRate: 0.5,
    projectileSpeed: 520,
    targeting: 'strong',
    bulletType: 'single',
    color: '#ff3fa4',
    upgradeLevels: [
      { cost: 110, rangeMultiplier: 1.1, damageMultiplier: 1.4, fireRateMultiplier: 1.05 },
      { cost: 150, rangeMultiplier: 1.25, damageMultiplier: 1.6, fireRateMultiplier: 1.1 }
    ]
  },
  {
    id: 'slow',
    name: 'Cryo Tower',
    cost: 120,
    range: 150,
    damage: 12,
    fireRate: 0.9,
    projectileSpeed: 320,
    targeting: 'closest',
    bulletType: 'slow',
    slowAmount: 0.35,
    slowDuration: 2.5,
    color: '#7bc6ff',
    upgradeLevels: [
      { cost: 80, rangeMultiplier: 1.05, damageMultiplier: 1.1, fireRateMultiplier: 1.05, slowAmount: 0.45 },
      { cost: 120, rangeMultiplier: 1.1, damageMultiplier: 1.2, fireRateMultiplier: 1.1, slowAmount: 0.5 }
    ]
  },
  {
    id: 'aoe',
    name: 'Pulse Tower',
    cost: 140,
    range: 170,
    damage: 24,
    fireRate: 0.8,
    projectileSpeed: 260,
    targeting: 'first',
    bulletType: 'aoe',
    aoeRadius: 60,
    color: '#ffa447',
    upgradeLevels: [
      { cost: 90, rangeMultiplier: 1.05, damageMultiplier: 1.2, fireRateMultiplier: 1.05, aoeRadius: 70 },
      { cost: 130, rangeMultiplier: 1.1, damageMultiplier: 1.35, fireRateMultiplier: 1.1, aoeRadius: 80 }
    ]
  }
];

export default towers;
