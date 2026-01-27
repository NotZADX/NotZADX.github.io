import { z } from "zod";
import { CONTINENTS } from "../models/Continent.js";

const continentEnum = z.enum(
  CONTINENTS.map((continent) => continent.id) as [
    (typeof CONTINENTS)[number]["id"],
    ...(typeof CONTINENTS)[number]["id"][]
  ]
);

const baseAction = z.object({
  id: z.string().min(1),
  actor: continentEnum
});

export const setTaxRateSchema = baseAction.extend({
  type: z.literal("SET_TAX_RATE"),
  tax: z.enum(["vat", "income", "corporate"]),
  value: z.number().min(0).max(50)
});

export const adjustSpendingSchema = baseAction.extend({
  type: z.literal("ADJUST_SPENDING"),
  category: z.enum(["welfare", "health", "education", "infrastructure", "military"]),
  deltaPercent: z.number().min(-20).max(20)
});

export const enactPolicySchema = baseAction.extend({
  type: z.literal("ENACT_POLICY"),
  policyId: z.string().min(1)
});

export const buildProjectSchema = baseAction.extend({
  type: z.literal("BUILD_PROJECT"),
  projectId: z.string().min(1)
});

export const subsidizeGoodSchema = baseAction.extend({
  type: z.literal("SUBSIDIZE_GOOD"),
  good: z.enum(["food", "energy", "housing", "industry", "services"]),
  budgetAmount: z.number().min(0)
});

export const issueBondsSchema = baseAction.extend({
  type: z.literal("ISSUE_BONDS"),
  amount: z.number().min(1)
});

export const payDownDebtSchema = baseAction.extend({
  type: z.literal("PAY_DOWN_DEBT"),
  amount: z.number().min(1)
});

export const proposeTreatySchema = baseAction.extend({
  type: z.literal("PROPOSE_TREATY"),
  target: continentEnum,
  treatyType: z.enum(["trade", "alliance", "sanctions", "aid"]),
  terms: z.record(z.string(), z.unknown())
});

export const respondTreatySchema = baseAction.extend({
  type: z.literal("RESPOND_TREATY"),
  proposalId: z.string().min(1),
  decision: z.enum(["accept", "reject", "counter"]),
  counterTerms: z.record(z.string(), z.unknown()).optional()
});

export const imposeSanctionsSchema = baseAction.extend({
  type: z.literal("IMPOSE_SANCTIONS"),
  target: continentEnum,
  scope: z.string().min(1)
});

export const sendAidSchema = baseAction.extend({
  type: z.literal("SEND_AID"),
  target: continentEnum,
  amount: z.number().min(1),
  aidType: z.enum(["cash", "food", "energy", "medical"])
});

export const launchTradeRouteSchema = baseAction.extend({
  type: z.literal("LAUNCH_TRADE_ROUTE"),
  target: continentEnum,
  good: z.enum(["food", "energy", "industry", "services"]),
  volumeCap: z.number().min(1)
});

export const increaseMilitarySchema = baseAction.extend({
  type: z.literal("INCREASE_MILITARY_READINESS"),
  levelDelta: z.number().min(-10).max(10)
});

export const threatenSchema = baseAction.extend({
  type: z.literal("THREATEN"),
  target: continentEnum
});

export const actionSchema = z.discriminatedUnion("type", [
  setTaxRateSchema,
  adjustSpendingSchema,
  enactPolicySchema,
  buildProjectSchema,
  subsidizeGoodSchema,
  issueBondsSchema,
  payDownDebtSchema,
  proposeTreatySchema,
  respondTreatySchema,
  imposeSanctionsSchema,
  sendAidSchema,
  launchTradeRouteSchema,
  increaseMilitarySchema,
  threatenSchema
]);

export const actionListSchema = z.array(actionSchema).max(20);

export type Action = z.infer<typeof actionSchema>;
