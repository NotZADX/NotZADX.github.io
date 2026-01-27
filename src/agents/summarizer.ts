import type { World } from "../simcore/models/World.js";
import { CONTINENTS, type ContinentId } from "../simcore/models/Continent.js";

export const buildSummary = (world: World, continentId: ContinentId): string => {
  const continent = world.continents[continentId];
  const others = CONTINENTS.filter((entry) => entry.id !== continentId)
    .map((entry) => {
      const other = world.continents[entry.id];
      return `${entry.name}: GDP ${other.economy.gdp}, Inflation ${other.economy.inflation}, Unrest ${other.society.unrest}, Relation ${continent.diplomacy.relations[entry.id]}`;
    })
    .join("\n");

  return [
    `Turn: ${world.turn}`,
    `Treasury: ${continent.economy.treasury}, Debt: ${continent.economy.debt}`,
    `GDP: ${continent.economy.gdp}, Inflation: ${continent.economy.inflation}, Unemployment: ${continent.economy.unemployment}`,
    `Happiness: ${continent.society.happiness}, Unrest: ${continent.society.unrest}`,
    `Approval: ${continent.politics.approval}, Stability: ${continent.politics.stability}`,
    `Influence: ${continent.diplomacy.influence}`,
    `Treaties: ${continent.diplomacy.treaties.join(", ") || "None"}`,
    `Policies: ${continent.policies.join(", ") || "None"}`,
    "Other continents:",
    others
  ].join("\n");
};

export const buildProposalSummary = (world: World, continentId: ContinentId): string => {
  const proposals = world.pendingProposals.filter(
    (proposal) => proposal.to === continentId || proposal.from === continentId
  );
  if (proposals.length === 0) {
    return "None";
  }
  return proposals
    .map(
      (proposal) =>
        `${proposal.id}: ${proposal.type} from ${proposal.from} to ${proposal.to} terms=${JSON.stringify(
          proposal.terms
        )}`
    )
    .join("\n");
};
