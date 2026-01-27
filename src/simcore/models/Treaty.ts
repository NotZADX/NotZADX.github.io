import type { ContinentId } from "./Continent.js";

export type TreatyType = "trade" | "alliance" | "sanctions" | "aid";

export type Treaty = {
  id: string;
  type: TreatyType;
  parties: ContinentId[];
  terms: Record<string, unknown>;
  startTurn: number;
};

export type TreatyProposal = {
  id: string;
  from: ContinentId;
  to: ContinentId;
  type: TreatyType;
  terms: Record<string, unknown>;
  createdTurn: number;
};
