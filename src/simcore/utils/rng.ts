export type RngState = {
  state: number;
};

export const createRng = (seed: number): RngState => ({ state: seed >>> 0 });

export const nextRng = (rng: RngState): number => {
  let t = (rng.state += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  rng.state = (t ^ (t >>> 14)) >>> 0;
  return rng.state / 4294967296;
};

export const nextRngInt = (rng: RngState, min: number, max: number): number => {
  const roll = nextRng(rng);
  return Math.floor(roll * (max - min + 1)) + min;
};
