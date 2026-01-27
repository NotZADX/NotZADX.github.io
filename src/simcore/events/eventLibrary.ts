import type { EventDefinition } from "../models/Event.js";

export const EVENT_LIBRARY: EventDefinition[] = [
  {
    id: "harvest_boom",
    name: "Harvest Boom",
    description: "Excellent harvest boosts food security.",
    probability: 0.08,
    effects: [{ reasonCode: "event_harvest_boom", happinessDelta: 2, economyDelta: 30 }]
  },
  {
    id: "energy_shortage",
    name: "Energy Shortage",
    description: "Grid strain causes energy shortages.",
    probability: 0.06,
    effects: [{ reasonCode: "event_energy_shortage", inflationDelta: 0.5, happinessDelta: -2 }]
  },
  {
    id: "market_rally",
    name: "Market Rally",
    description: "Investor confidence boosts markets.",
    probability: 0.07,
    effects: [{ reasonCode: "event_market_rally", economyDelta: 40 }]
  },
  {
    id: "labor_strike",
    name: "Labor Strike",
    description: "Major strikes slow production.",
    probability: 0.05,
    effects: [{ reasonCode: "event_labor_strike", economyDelta: -30, unrestDelta: 3 }]
  },
  {
    id: "tech_breakthrough",
    name: "Tech Breakthrough",
    description: "New innovation boosts productivity.",
    probability: 0.04,
    effects: [{ reasonCode: "event_tech_breakthrough", economyDelta: 50 }]
  },
  {
    id: "public_scandal",
    name: "Public Scandal",
    description: "Corruption scandal hits leadership.",
    probability: 0.04,
    effects: [{ reasonCode: "event_public_scandal", approvalDelta: -3, unrestDelta: 2 }]
  },
  {
    id: "flooding",
    name: "Flooding",
    description: "Severe flooding damages infrastructure.",
    probability: 0.04,
    effects: [{ reasonCode: "event_flooding", economyDelta: -25, happinessDelta: -1 }]
  },
  {
    id: "drought",
    name: "Drought",
    description: "Drought reduces agricultural output.",
    probability: 0.05,
    effects: [{ reasonCode: "event_drought", economyDelta: -20, inflationDelta: 0.4 }]
  },
  {
    id: "trade_windfall",
    name: "Trade Windfall",
    description: "Export demand surges.",
    probability: 0.06,
    effects: [{ reasonCode: "event_trade_windfall", economyDelta: 35 }]
  },
  {
    id: "border_skirmish",
    name: "Border Skirmish",
    description: "Small border incident raises tensions.",
    probability: 0.03,
    effects: [{ reasonCode: "event_border_skirmish", unrestDelta: 1, approvalDelta: -1 }]
  },
  {
    id: "tourism_boom",
    name: "Tourism Boom",
    description: "Tourism revenues climb.",
    probability: 0.05,
    effects: [{ reasonCode: "event_tourism_boom", economyDelta: 25, happinessDelta: 1 }]
  },
  {
    id: "pandemic_wave",
    name: "Pandemic Wave",
    description: "New health wave strains hospitals.",
    probability: 0.03,
    effects: [{ reasonCode: "event_pandemic_wave", economyDelta: -40, happinessDelta: -3 }]
  },
  {
    id: "housing_surge",
    name: "Housing Surge",
    description: "Housing supply improves.",
    probability: 0.05,
    effects: [{ reasonCode: "event_housing_surge", happinessDelta: 2 }]
  },
  {
    id: "cyber_incident",
    name: "Cyber Incident",
    description: "Cyber attack disrupts services.",
    probability: 0.04,
    effects: [{ reasonCode: "event_cyber_incident", economyDelta: -15, unrestDelta: 1 }]
  },
  {
    id: "mineral_discovery",
    name: "Mineral Discovery",
    description: "New mineral deposits found.",
    probability: 0.03,
    effects: [{ reasonCode: "event_mineral_discovery", economyDelta: 30 }]
  },
  {
    id: "inflation_spike",
    name: "Inflation Spike",
    description: "Prices rise unexpectedly.",
    probability: 0.04,
    effects: [{ reasonCode: "event_inflation_spike", inflationDelta: 0.8, happinessDelta: -1 }]
  },
  {
    id: "banking_stress",
    name: "Banking Stress",
    description: "Financial sector volatility increases.",
    probability: 0.03,
    effects: [{ reasonCode: "event_banking_stress", economyDelta: -20, approvalDelta: -1 }]
  },
  {
    id: "education_awards",
    name: "Education Awards",
    description: "Schools receive international praise.",
    probability: 0.04,
    effects: [{ reasonCode: "event_education_awards", happinessDelta: 1 }]
  },
  {
    id: "infrastructure_breakdown",
    name: "Infrastructure Breakdown",
    description: "Key infrastructure fails.",
    probability: 0.03,
    effects: [{ reasonCode: "event_infrastructure_breakdown", economyDelta: -30, unrestDelta: 2 }]
  },
  {
    id: "agri_innovation",
    name: "Agri Innovation",
    description: "New farming techniques boost yields.",
    probability: 0.04,
    effects: [{ reasonCode: "event_agri_innovation", economyDelta: 20, inflationDelta: -0.2 }]
  },
  {
    id: "energy_grid_upgrade",
    name: "Energy Grid Upgrade",
    description: "Grid modernization improves reliability.",
    probability: 0.03,
    effects: [{ reasonCode: "event_energy_grid_upgrade", happinessDelta: 1, inflationDelta: -0.2 }]
  },
  {
    id: "protests",
    name: "Mass Protests",
    description: "Large protests erupt in major cities.",
    probability: 0.04,
    effects: [{ reasonCode: "event_protests", unrestDelta: 4, approvalDelta: -2 }]
  },
  {
    id: "sports_victory",
    name: "Sports Victory",
    description: "Major sporting victory boosts morale.",
    probability: 0.05,
    effects: [{ reasonCode: "event_sports_victory", happinessDelta: 1 }]
  },
  {
    id: "trade_disruption",
    name: "Trade Disruption",
    description: "Shipping delays disrupt trade.",
    probability: 0.04,
    effects: [{ reasonCode: "event_trade_disruption", economyDelta: -25 }]
  },
  {
    id: "diplomatic_breakthrough",
    name: "Diplomatic Breakthrough",
    description: "Unexpected diplomatic gains improve standing.",
    probability: 0.03,
    effects: [{ reasonCode: "event_diplomatic_breakthrough", approvalDelta: 1 }]
  },
  {
    id: "security_success",
    name: "Security Success",
    description: "Security services prevent a major incident.",
    probability: 0.03,
    effects: [{ reasonCode: "event_security_success", stabilityDelta: 1 }]
  },
  {
    id: "wildfire_season",
    name: "Wildfire Season",
    description: "Wildfires damage key regions.",
    probability: 0.04,
    effects: [{ reasonCode: "event_wildfire_season", economyDelta: -20, happinessDelta: -1 }]
  },
  {
    id: "foreign_investment",
    name: "Foreign Investment",
    description: "Capital inflows increase.",
    probability: 0.05,
    effects: [{ reasonCode: "event_foreign_investment", economyDelta: 35 }]
  },
  {
    id: "transport_strike",
    name: "Transport Strike",
    description: "Transport workers strike.",
    probability: 0.04,
    effects: [{ reasonCode: "event_transport_strike", economyDelta: -15, unrestDelta: 2 }]
  },
  {
    id: "medical_breakthrough",
    name: "Medical Breakthrough",
    description: "New treatments improve public health.",
    probability: 0.03,
    effects: [{ reasonCode: "event_medical_breakthrough", happinessDelta: 2 }]
  }
];
