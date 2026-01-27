import type { World } from "../models/World.js";
import { findPolicy } from "../events/policies.js";

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export type PoliticsDelta = {
  approvalDelta: number;
  stabilityDelta: number;
  reasons: string[];
};

export const runPoliticsSystem = (world: World): Record<string, PoliticsDelta> => {
  const deltas: Record<string, PoliticsDelta> = {};

  for (const [id, continent] of Object.entries(world.continents)) {
    const policyStability = continent.policies
      .map((policyId) => findPolicy(policyId))
      .filter((policy): policy is NonNullable<typeof policy> => Boolean(policy))
      .reduce((sum, policy) => sum + (policy.effects.stabilityBoost ?? 0), 0);

    const approvalDelta = clamp(
      (continent.society.happiness - 50) / 20 - continent.society.unrest / 50,
      -3,
      3
    );
    const stabilityDelta = clamp(
      (continent.politics.approval - 50) / 25 - continent.society.unrest / 60 + policyStability,
      -3,
      3
    );

    continent.politics.approval = clamp(continent.politics.approval + approvalDelta, 0, 100);
    continent.politics.stability = clamp(continent.politics.stability + stabilityDelta, 0, 100);

    deltas[id] = {
      approvalDelta,
      stabilityDelta,
      reasons: ["political_feedback", "policy_effects"]
    };
  }

  return deltas;
};
