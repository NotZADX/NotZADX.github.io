import type { ContinentId } from "./Continent.js";

export type EventEffect = {
  target?: ContinentId;
  economyDelta?: number;
  happinessDelta?: number;
  unrestDelta?: number;
  inflationDelta?: number;
  approvalDelta?: number;
  stabilityDelta?: number;
  reasonCode: string;
};

export type EventDefinition = {
  id: string;
  name: string;
  description: string;
  probability: number;
  condition?: (worldTurn: number, target: ContinentId) => boolean;
  effects: EventEffect[];
};

export type EventInstance = {
  id: string;
  turn: number;
  target: ContinentId;
  effects: EventEffect[];
};
