const levels = [
  {
    id: 1,
    name: 'Neon Avenue',
    startingMoney: 120,
    startingLives: 20,
    map: [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,2,2,0,0,0,0,2,2,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],
    pathPoints: [
      { x: 0, y: 3 }, { x: 15, y: 3 }
    ],
    waves: [
      { waveNumber: 1, spawnInterval: 1000, enemies: [ { type: 'regular', count: 10 } ] },
      { waveNumber: 2, spawnInterval: 900, enemies: [ { type: 'regular', count: 8 }, { type: 'fast', count: 4 } ] },
      { waveNumber: 3, spawnInterval: 800, enemies: [ { type: 'regular', count: 8 }, { type: 'fast', count: 6 }, { type: 'tank', count: 3 } ] },
      { waveNumber: 4, spawnInterval: 750, enemies: [ { type: 'shield', count: 6 }, { type: 'fast', count: 6 } ] },
      { waveNumber: 5, spawnInterval: 700, enemies: [ { type: 'regular', count: 10 }, { type: 'tank', count: 4 }, { type: 'boss', count: 1 } ] }
    ]
  },
  {
    id: 2,
    name: 'Circuit Bend',
    startingMoney: 140,
    startingLives: 18,
    map: [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],
    pathPoints: [
      { x: 0, y: 3 }, { x: 7, y: 3 }, { x: 8, y: 4 }, { x: 15, y: 4 }
    ],
    waves: [
      { waveNumber: 1, spawnInterval: 950, enemies: [ { type: 'regular', count: 12 } ] },
      { waveNumber: 2, spawnInterval: 850, enemies: [ { type: 'regular', count: 12 }, { type: 'fast', count: 8 } ] },
      { waveNumber: 3, spawnInterval: 750, enemies: [ { type: 'shield', count: 6 }, { type: 'fast', count: 6 } ] },
      { waveNumber: 4, spawnInterval: 700, enemies: [ { type: 'tank', count: 5 }, { type: 'regular', count: 10 }, { type: 'fast', count: 8 } ] },
      { waveNumber: 5, spawnInterval: 650, enemies: [ { type: 'shield', count: 6 }, { type: 'tank', count: 6 }, { type: 'boss', count: 1 } ] }
    ]
  },
  {
    id: 3,
    name: 'Skyline Loop',
    startingMoney: 160,
    startingLives: 16,
    map: [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],
    pathPoints: [
      { x: 0, y: 2 }, { x: 5, y: 2 }, { x: 5, y: 3 }, { x: 10, y: 3 }, { x: 10, y: 4 }, { x: 14, y: 4 }, { x: 14, y: 5 }, { x: 15, y: 5 }
    ],
    waves: [
      { waveNumber: 1, spawnInterval: 900, enemies: [ { type: 'regular', count: 14 } ] },
      { waveNumber: 2, spawnInterval: 800, enemies: [ { type: 'fast', count: 12 }, { type: 'regular', count: 8 } ] },
      { waveNumber: 3, spawnInterval: 750, enemies: [ { type: 'shield', count: 8 }, { type: 'fast', count: 8 } ] },
      { waveNumber: 4, spawnInterval: 700, enemies: [ { type: 'tank', count: 8 }, { type: 'regular', count: 10 } ] },
      { waveNumber: 5, spawnInterval: 650, enemies: [ { type: 'boss', count: 1 }, { type: 'shield', count: 8 }, { type: 'fast', count: 10 } ] }
    ]
  }
];

export default levels;
