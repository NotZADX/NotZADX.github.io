export type PolicyDefinition = {
  id: string;
  name: string;
  description: string;
  effects: {
    gdpBoost?: number;
    happinessBoost?: number;
    stabilityBoost?: number;
    inflationDelta?: number;
    unemploymentDelta?: number;
  };
};

export const POLICY_LIBRARY: PolicyDefinition[] = [
  {
    id: "green_transition",
    name: "Green Transition",
    description: "Invest in renewables and clean transport.",
    effects: { gdpBoost: 20, happinessBoost: 1, inflationDelta: 0.2 }
  },
  {
    id: "industrial_modernization",
    name: "Industrial Modernization",
    description: "Upgrade factories and logistics.",
    effects: { gdpBoost: 30, unemploymentDelta: -0.3 }
  },
  {
    id: "universal_healthcare",
    name: "Universal Healthcare",
    description: "Guarantee basic healthcare access.",
    effects: { happinessBoost: 2, stabilityBoost: 1 }
  },
  {
    id: "education_overhaul",
    name: "Education Overhaul",
    description: "Improve schooling quality and access.",
    effects: { gdpBoost: 15, happinessBoost: 1 }
  },
  {
    id: "anti_corruption_drive",
    name: "Anti-Corruption Drive",
    description: "Crack down on corruption and waste.",
    effects: { stabilityBoost: 2 }
  },
  {
    id: "tax_simplification",
    name: "Tax Simplification",
    description: "Streamline tax code to boost compliance.",
    effects: { gdpBoost: 10, inflationDelta: -0.2 }
  },
  {
    id: "rural_investment",
    name: "Rural Investment",
    description: "Boost rural infrastructure and services.",
    effects: { happinessBoost: 1, unemploymentDelta: -0.2 }
  },
  {
    id: "digital_identity",
    name: "Digital Identity",
    description: "Deploy secure digital ID systems.",
    effects: { stabilityBoost: 1 }
  },
  {
    id: "innovation_grants",
    name: "Innovation Grants",
    description: "Fund startups and R&D.",
    effects: { gdpBoost: 25 }
  },
  {
    id: "food_security_program",
    name: "Food Security Program",
    description: "Guarantee food reserves and subsidies.",
    effects: { happinessBoost: 1, unemploymentDelta: -0.1 }
  },
  {
    id: "energy_subsidies",
    name: "Energy Subsidies",
    description: "Lower energy prices for households.",
    effects: { happinessBoost: 1, inflationDelta: -0.3 }
  },
  {
    id: "labor_reform",
    name: "Labor Reform",
    description: "Modernize labor rules for flexibility.",
    effects: { unemploymentDelta: -0.4, stabilityBoost: -1 }
  },
  {
    id: "housing_push",
    name: "Housing Push",
    description: "Accelerate housing construction.",
    effects: { happinessBoost: 1, gdpBoost: 10 }
  },
  {
    id: "port_expansion",
    name: "Port Expansion",
    description: "Expand major ports to boost trade.",
    effects: { gdpBoost: 18 }
  },
  {
    id: "defense_modernization",
    name: "Defense Modernization",
    description: "Upgrade military technology.",
    effects: { stabilityBoost: 1 }
  },
  {
    id: "public_transit_push",
    name: "Public Transit Push",
    description: "Invest in mass transit.",
    effects: { happinessBoost: 1, inflationDelta: -0.1 }
  },
  {
    id: "trade_facilitation",
    name: "Trade Facilitation",
    description: "Reduce friction in cross-border trade.",
    effects: { gdpBoost: 12 }
  },
  {
    id: "water_resilience",
    name: "Water Resilience",
    description: "Upgrade water infrastructure.",
    effects: { happinessBoost: 1, stabilityBoost: 1 }
  },
  {
    id: "tourism_campaign",
    name: "Tourism Campaign",
    description: "Market the region to tourists.",
    effects: { gdpBoost: 14, unemploymentDelta: -0.2 }
  },
  {
    id: "smart_agriculture",
    name: "Smart Agriculture",
    description: "Deploy precision agriculture tools.",
    effects: { gdpBoost: 16, inflationDelta: -0.1 }
  }
];

export const findPolicy = (policyId: string): PolicyDefinition | undefined =>
  POLICY_LIBRARY.find((policy) => policy.id === policyId);
