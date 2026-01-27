import type { World } from "../models/World.js";
import { findPolicy } from "../events/policies.js";

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export type SocietyDelta = {
  happinessDelta: number;
  unrestDelta: number;
  reasons: string[];
};

export const runSocietySystem = (world: World): Record<string, SocietyDelta> => {
  const deltas: Record<string, SocietyDelta> = {};

  for (const [id, continent] of Object.entries(world.continents)) {
    const needsAverage =
      (continent.society.needs.food +
        continent.society.needs.energy +
        continent.society.needs.housing +
        continent.society.needs.safety +
        continent.society.needs.freedom) /
      5;
    const policyHappiness = continent.policies
      .map((policyId) => findPolicy(policyId))
      .filter((policy): policy is NonNullable<typeof policy> => Boolean(policy))
      .reduce((sum, policy) => sum + (policy.effects.happinessBoost ?? 0), 0);

    const happinessDelta = clamp((needsAverage - 60) / 10 + policyHappiness, -3, 3);
    const unrestDelta = clamp((50 - needsAverage) / 8, -3, 3);

    continent.society.happiness = clamp(continent.society.happiness + happinessDelta, 0, 100);
    continent.society.unrest = clamp(continent.society.unrest + unrestDelta, 0, 100);

    deltas[id] = {
      happinessDelta,
      unrestDelta,
      reasons: ["needs_adjustment", "policy_effects"]
    };
  }

  return deltas;
};
