import type { Action } from "../actions/actionSchema.js";
import type { World } from "../models/World.js";
import type { Treaty } from "../models/Treaty.js";
import { estimateEconomicBenefit } from "./economy.js";

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export type DiplomacyDelta = {
  treatiesAdded: Treaty[];
  reasons: string[];
};

const acceptanceScore = (world: World, proposalId: string): number => {
  const proposal = world.pendingProposals.find((item) => item.id === proposalId);
  if (!proposal) {
    return -999;
  }
  const target = world.continents[proposal.to];
  const relationScore = target.diplomacy.relations[proposal.from] ?? 0;
  const economicNeed = estimateEconomicBenefit(target);
  const stabilityRisk = 100 - target.politics.stability;

  return relationScore + economicNeed - stabilityRisk / 2;
};

export const collectProposals = (world: World, actions: Action[]): void => {
  const proposalActions = actions.filter((action) => action.type === "PROPOSE_TREATY");
  for (const action of proposalActions) {
    world.pendingProposals.push({
      id: action.id,
      from: action.actor,
      to: action.target,
      type: action.treatyType,
      terms: action.terms,
      createdTurn: world.turn
    });
  }
};

export const resolveDiplomacy = (
  world: World,
  responseActions: Action[]
): Record<string, DiplomacyDelta> => {
  const deltas: Record<string, DiplomacyDelta> = {};
  const responses = responseActions.filter((action) => action.type === "RESPOND_TREATY");

  for (const response of responses) {
    const proposal = world.pendingProposals.find((item) => item.id === response.proposalId);
    if (!proposal) {
      continue;
    }

    const target = world.continents[proposal.to];
    const actor = world.continents[proposal.from];
    const score = acceptanceScore(world, response.proposalId);
    const shouldAccept = response.decision === "accept" || score > 10;

    if (shouldAccept) {
      const treaty: Treaty = {
        id: `${proposal.id}-treaty`,
        type: proposal.type,
        parties: [proposal.from, proposal.to],
        terms: response.decision === "counter" && response.counterTerms ? response.counterTerms : proposal.terms,
        startTurn: world.turn
      };
      world.treaties.push(treaty);
      actor.diplomacy.treaties.push(treaty.id);
      target.diplomacy.treaties.push(treaty.id);
      actor.diplomacy.relations[proposal.to] = clamp(
        actor.diplomacy.relations[proposal.to] + 8,
        -100,
        100
      );
      target.diplomacy.relations[proposal.from] = clamp(
        target.diplomacy.relations[proposal.from] + 8,
        -100,
        100
      );
      deltas[proposal.to] = {
        treatiesAdded: [treaty],
        reasons: ["treaty_accepted"]
      };
    } else {
      actor.diplomacy.relations[proposal.to] = clamp(
        actor.diplomacy.relations[proposal.to] - 5,
        -100,
        100
      );
      target.diplomacy.relations[proposal.from] = clamp(
        target.diplomacy.relations[proposal.from] - 3,
        -100,
        100
      );
      deltas[proposal.to] = {
        treatiesAdded: [],
        reasons: ["treaty_rejected"]
      };
    }
  }

  world.pendingProposals = world.pendingProposals.filter(
    (proposal) => !responses.some((response) => response.proposalId === proposal.id)
  );

  return deltas;
};
