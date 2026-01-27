import { CONTINENTS, type Continent } from "./Continent.js";
import type { EventInstance } from "./Event.js";
import type { Treaty, TreatyProposal } from "./Treaty.js";

export type World = {
  seed: number;
  turn: number;
  rngState: number;
  continents: Record<string, Continent>;
  treaties: Treaty[];
  pendingProposals: TreatyProposal[];
  eventsLog: EventInstance[];
};

export const createInitialWorld = (seed: number): World => {
  const continents: Record<string, Continent> = {};
  for (const continent of CONTINENTS) {
    continents[continent.id] = {
      id: continent.id,
      name: continent.name,
      economy: {
        treasury: 5000,
        debt: 2000,
        taxRates: { vat: 10, income: 15, corporate: 12 },
        spending: {
          welfare: 15,
          health: 12,
          education: 10,
          infrastructure: 12,
          military: 8
        },
        inflation: 2,
        unemployment: 6,
        gdp: 8000,
        production: {
          food: 100,
          energy: 90,
          industry: 110,
          services: 120
        }
      },
      society: {
        happiness: 65,
        unrest: 20,
        inequality: 35,
        needs: {
          food: 70,
          energy: 68,
          housing: 60,
          safety: 62,
          freedom: 66
        }
      },
      politics: {
        approval: 55,
        stability: 60,
        corruption: 40,
        governmentType: "Representative"
      },
      diplomacy: {
        relations: Object.fromEntries(
          CONTINENTS.map((entry) => [entry.id, entry.id === continent.id ? 0 : 10])
        ) as Record<string, number>,
        influence: 50,
        treaties: []
      },
      resources: {
        energy: 70,
        agriculture: 70,
        minerals: 70
      },
      security: {
        militaryReadiness: 50,
        intelligence: 50,
        police: 50
      },
      policies: []
    };
  }

  return {
    seed,
    turn: 0,
    rngState: seed,
    continents,
    treaties: [],
    pendingProposals: [],
    eventsLog: []
  };
};
