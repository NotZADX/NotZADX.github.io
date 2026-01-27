export type ContinentId =
  | "africa"
  | "europe"
  | "asia"
  | "north_america"
  | "south_america"
  | "oceania"
  | "antarctica";

export const CONTINENTS: { id: ContinentId; name: string }[] = [
  { id: "africa", name: "Africa" },
  { id: "europe", name: "Europe" },
  { id: "asia", name: "Asia" },
  { id: "north_america", name: "North America" },
  { id: "south_america", name: "South America" },
  { id: "oceania", name: "Oceania" },
  { id: "antarctica", name: "Antarctica" }
];

export type Economy = {
  treasury: number;
  debt: number;
  taxRates: {
    vat: number;
    income: number;
    corporate: number;
  };
  spending: {
    welfare: number;
    health: number;
    education: number;
    infrastructure: number;
    military: number;
  };
  inflation: number;
  unemployment: number;
  gdp: number;
  production: {
    food: number;
    energy: number;
    industry: number;
    services: number;
  };
};

export type Society = {
  happiness: number;
  unrest: number;
  inequality: number;
  needs: {
    food: number;
    energy: number;
    housing: number;
    safety: number;
    freedom: number;
  };
};

export type Politics = {
  approval: number;
  stability: number;
  corruption: number;
  governmentType: string;
};

export type Diplomacy = {
  relations: Record<ContinentId, number>;
  influence: number;
  treaties: string[];
};

export type Resources = {
  energy: number;
  agriculture: number;
  minerals: number;
};

export type Security = {
  militaryReadiness: number;
  intelligence: number;
  police: number;
};

export type Continent = {
  id: ContinentId;
  name: string;
  economy: Economy;
  society: Society;
  politics: Politics;
  diplomacy: Diplomacy;
  resources: Resources;
  security: Security;
  policies: string[];
};
