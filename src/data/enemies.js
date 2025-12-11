const enemies = {
  regular: {
    id: 'regular',
    name: 'Regular Drone',
    maxHealth: 80,
    speed: 80,
    reward: 10,
    lifeDamage: 1,
    armor: 0,
    color: '#8ef0ff'
  },
  fast: {
    id: 'fast',
    name: 'Fast Drone',
    maxHealth: 50,
    speed: 140,
    reward: 8,
    lifeDamage: 1,
    armor: 0,
    color: '#7cf792'
  },
  tank: {
    id: 'tank',
    name: 'Tank Drone',
    maxHealth: 200,
    speed: 55,
    reward: 20,
    lifeDamage: 2,
    armor: 4,
    color: '#ff8c6b'
  },
  shield: {
    id: 'shield',
    name: 'Shielded Drone',
    maxHealth: 120,
    speed: 75,
    reward: 15,
    lifeDamage: 1,
    armor: 6,
    color: '#b48bff'
  },
  boss: {
    id: 'boss',
    name: 'Boss Drone',
    maxHealth: 600,
    speed: 45,
    reward: 60,
    lifeDamage: 3,
    armor: 8,
    color: '#ffdf6b'
  }
};

export default enemies;
