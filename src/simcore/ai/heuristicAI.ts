import type { Action } from "../actions/actionSchema.js";
import type { ContinentId } from "../models/Continent.js";
import type { World } from "../models/World.js";

const createActionId = (continentId: string, suffix: string) =>
  `${continentId}-${suffix}-${Date.now()}`;

export const heuristicActions = (world: World, continentId: ContinentId): Action[] => {
  const continent = world.continents[continentId];
  const actions: Action[] = [];

  if (continent.economy.treasury < 1000) {
    actions.push({
      id: createActionId(continentId, "issue-bonds"),
      actor: continentId,
      type: "ISSUE_BONDS",
      amount: 500
    });
  }

  if (continent.society.happiness < 50) {
    actions.push({
      id: createActionId(continentId, "welfare-up"),
      actor: continentId,
      type: "ADJUST_SPENDING",
      category: "welfare",
      deltaPercent: 3
    });
  }

  if (continent.economy.unemployment > 10) {
    actions.push({
      id: createActionId(continentId, "infrastructure-up"),
      actor: continentId,
      type: "ADJUST_SPENDING",
      category: "infrastructure",
      deltaPercent: 2
    });
  }

  if (continent.politics.stability < 40) {
    actions.push({
      id: createActionId(continentId, "stability"),
      actor: continentId,
      type: "ENACT_POLICY",
      policyId: "anti_corruption_drive"
    });
  }

  return actions.slice(0, 5);
};
