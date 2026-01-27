import type { World } from "../models/World.js";
import type { EventInstance } from "../models/Event.js";
import { EVENT_LIBRARY } from "../events/eventLibrary.js";
import { createRng, nextRng } from "../utils/rng.js";

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export type EventDelta = {
  events: EventInstance[];
  reasons: string[];
};

export const runEventSystem = (world: World): Record<string, EventDelta> => {
  const rng = createRng(world.rngState);
  const deltas: Record<string, EventDelta> = {};

  for (const [id, continent] of Object.entries(world.continents)) {
    const triggered: EventInstance[] = [];
    for (const event of EVENT_LIBRARY) {
      const roll = nextRng(rng);
      if (roll <= event.probability && (!event.condition || event.condition(world.turn, id as any))) {
        const instance: EventInstance = {
          id: event.id,
          turn: world.turn,
          target: id as any,
          effects: event.effects
        };
        triggered.push(instance);
        for (const effect of event.effects) {
          if (effect.economyDelta) {
            continent.economy.gdp += effect.economyDelta;
          }
          if (effect.happinessDelta) {
            continent.society.happiness = clamp(
              continent.society.happiness + effect.happinessDelta,
              0,
              100
            );
          }
          if (effect.unrestDelta) {
            continent.society.unrest = clamp(
              continent.society.unrest + effect.unrestDelta,
              0,
              100
            );
          }
          if (effect.inflationDelta) {
            continent.economy.inflation = clamp(
              continent.economy.inflation + effect.inflationDelta,
              0,
              20
            );
          }
          if (effect.approvalDelta) {
            continent.politics.approval = clamp(
              continent.politics.approval + effect.approvalDelta,
              0,
              100
            );
          }
          if (effect.stabilityDelta) {
            continent.politics.stability = clamp(
              continent.politics.stability + effect.stabilityDelta,
              0,
              100
            );
          }
        }
      }
    }
    if (triggered.length > 0) {
      world.eventsLog.push(...triggered);
      deltas[id] = {
        events: triggered,
        reasons: triggered.flatMap((event) => event.effects.map((effect) => effect.reasonCode))
      };
    } else {
      deltas[id] = { events: [], reasons: [] };
    }
  }

  world.rngState = rng.state;
  return deltas;
};
