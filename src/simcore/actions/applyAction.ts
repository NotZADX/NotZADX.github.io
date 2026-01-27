import type { Action } from "./actionSchema.js";
import type { World } from "../models/World.js";
import type { Continent } from "../models/Continent.js";

export type ActionResult = {
  reasons: string[];
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const getActor = (world: World, actorId: string): Continent => {
  const continent = world.continents[actorId];
  if (!continent) {
    throw new Error(`Unknown actor ${actorId}`);
  }
  return continent;
};

export const applyAction = (world: World, action: Action): ActionResult => {
  const reasons: string[] = [];
  const actor = getActor(world, action.actor);

  switch (action.type) {
    case "SET_TAX_RATE":
      actor.economy.taxRates[action.tax] = clamp(action.value, 0, 50);
      reasons.push(`tax_rate_${action.tax}_set`);
      break;
    case "ADJUST_SPENDING":
      actor.economy.spending[action.category] = clamp(
        actor.economy.spending[action.category] + action.deltaPercent,
        0,
        40
      );
      reasons.push(`spending_${action.category}_adjusted`);
      break;
    case "ENACT_POLICY":
      if (!actor.policies.includes(action.policyId)) {
        actor.policies.push(action.policyId);
        reasons.push(`policy_${action.policyId}_enacted`);
      }
      break;
    case "BUILD_PROJECT":
      actor.economy.treasury -= 200;
      actor.economy.gdp += 40;
      actor.society.happiness += 1;
      reasons.push(`project_${action.projectId}_started`);
      break;
    case "SUBSIDIZE_GOOD":
      actor.economy.treasury -= action.budgetAmount;
      actor.society.needs[action.good as keyof Continent["society"]["needs"]] = clamp(
        actor.society.needs[action.good as keyof Continent["society"]["needs"]] + 2,
        0,
        100
      );
      reasons.push(`subsidy_${action.good}_issued`);
      break;
    case "ISSUE_BONDS":
      actor.economy.treasury += action.amount;
      actor.economy.debt += action.amount;
      reasons.push("bonds_issued");
      break;
    case "PAY_DOWN_DEBT":
      actor.economy.treasury -= action.amount;
      actor.economy.debt = Math.max(0, actor.economy.debt - action.amount);
      reasons.push("debt_paid");
      break;
    case "IMPOSE_SANCTIONS": {
      const target = getActor(world, action.target);
      actor.diplomacy.relations[action.target] = clamp(
        actor.diplomacy.relations[action.target] - 10,
        -100,
        100
      );
      target.diplomacy.relations[action.actor] = clamp(
        target.diplomacy.relations[action.actor] - 8,
        -100,
        100
      );
      reasons.push(`sanctions_${action.target}_imposed`);
      break;
    }
    case "SEND_AID": {
      const target = getActor(world, action.target);
      actor.economy.treasury -= action.amount;
      target.economy.treasury += action.amount;
      actor.diplomacy.relations[action.target] = clamp(
        actor.diplomacy.relations[action.target] + 6,
        -100,
        100
      );
      target.diplomacy.relations[action.actor] = clamp(
        target.diplomacy.relations[action.actor] + 4,
        -100,
        100
      );
      reasons.push(`aid_${action.target}_sent`);
      break;
    }
    case "LAUNCH_TRADE_ROUTE": {
      const target = getActor(world, action.target);
      actor.economy.gdp += 20;
      target.economy.gdp += 20;
      reasons.push(`trade_route_${action.target}_${action.good}`);
      break;
    }
    case "INCREASE_MILITARY_READINESS":
      actor.security.militaryReadiness = clamp(
        actor.security.militaryReadiness + action.levelDelta,
        0,
        100
      );
      actor.economy.treasury -= Math.max(0, action.levelDelta) * 10;
      reasons.push("military_readiness_changed");
      break;
    case "THREATEN": {
      const target = getActor(world, action.target);
      actor.diplomacy.relations[action.target] = clamp(
        actor.diplomacy.relations[action.target] - 5,
        -100,
        100
      );
      target.diplomacy.relations[action.actor] = clamp(
        target.diplomacy.relations[action.actor] - 7,
        -100,
        100
      );
      actor.diplomacy.influence = clamp(actor.diplomacy.influence + 2, 0, 100);
      reasons.push(`threat_${action.target}`);
      break;
    }
    case "PROPOSE_TREATY":
    case "RESPOND_TREATY":
      break;
    default: {
      const exhaustive: never = action;
      throw new Error(`Unhandled action ${exhaustive}`);
    }
  }

  return { reasons };
};
