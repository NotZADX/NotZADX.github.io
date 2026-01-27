import type { World } from "../models/World.js";
import type { Continent } from "../models/Continent.js";
import { findPolicy } from "../events/policies.js";

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export type EconomyDelta = {
  treasuryDelta: number;
  deficit: number;
  inflationDelta: number;
  unemploymentDelta: number;
  gdpDelta: number;
  reasons: string[];
};

const policyEffects = (continent: Continent) => {
  return continent.policies
    .map((policyId) => findPolicy(policyId))
    .filter((policy): policy is NonNullable<typeof policy> => Boolean(policy));
};

export const runEconomySystem = (world: World): Record<string, EconomyDelta> => {
  const deltas: Record<string, EconomyDelta> = {};

  for (const [id, continent] of Object.entries(world.continents)) {
    const policies = policyEffects(continent);
    const policyGdpBoost = policies.reduce((sum, policy) => sum + (policy.effects.gdpBoost ?? 0), 0);
    const policyInflationDelta = policies.reduce(
      (sum, policy) => sum + (policy.effects.inflationDelta ?? 0),
      0
    );
    const policyUnemploymentDelta = policies.reduce(
      (sum, policy) => sum + (policy.effects.unemploymentDelta ?? 0),
      0
    );

    const revenue =
      (continent.economy.gdp *
        (continent.economy.taxRates.vat +
          continent.economy.taxRates.income +
          continent.economy.taxRates.corporate)) /
      100;
    const spendingPercent =
      continent.economy.spending.welfare +
      continent.economy.spending.health +
      continent.economy.spending.education +
      continent.economy.spending.infrastructure +
      continent.economy.spending.military;
    const spending = (continent.economy.gdp * spendingPercent) / 100;
    const deficit = spending - revenue;
    continent.economy.treasury -= deficit;
    if (deficit > 0) {
      continent.economy.debt += deficit;
    }

    const growthFactor = 1 + (continent.economy.spending.infrastructure - 10) / 200;
    const gdpDelta = Math.round(continent.economy.gdp * (growthFactor - 1) + policyGdpBoost);
    continent.economy.gdp += gdpDelta;

    const inflationDelta = clamp(deficit / 500 + policyInflationDelta, -1.5, 2.5);
    const unemploymentDelta = clamp(2 - growthFactor * 2 + policyUnemploymentDelta, -1.5, 1.5);
    continent.economy.inflation = clamp(continent.economy.inflation + inflationDelta, 0, 20);
    continent.economy.unemployment = clamp(
      continent.economy.unemployment + unemploymentDelta,
      2,
      25
    );

    deltas[id] = {
      treasuryDelta: -deficit,
      deficit,
      inflationDelta,
      unemploymentDelta,
      gdpDelta,
      reasons: ["budget_cycle", "growth_update", "policy_effects"]
    };
  }

  return deltas;
};

export const estimateEconomicBenefit = (continent: Continent): number => {
  const needScore =
    100 -
    (continent.society.needs.energy + continent.society.needs.food) / 2 +
    (continent.economy.inflation + continent.economy.unemployment) / 2;
  return Math.round(needScore);
};
