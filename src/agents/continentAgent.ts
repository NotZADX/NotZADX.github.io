import { readFileSync } from "node:fs";
import { actionListSchema } from "../simcore/actions/actionSchema.js";
import type { Action } from "../simcore/actions/actionSchema.js";
import type { ContinentId } from "../simcore/models/Continent.js";
import type { World } from "../simcore/models/World.js";
import { callOpenRouter } from "./openrouterClient.js";
import { buildProposalSummary, buildSummary } from "./summarizer.js";

const promptTemplate = readFileSync(
  new URL("./prompts/continentAgentPrompt.txt", import.meta.url),
  "utf-8"
);

export type AgentConfig = {
  model: string;
  apiKey?: string;
  temperature?: number;
};

export const runContinentAgent = async (
  world: World,
  continentId: ContinentId,
  config: AgentConfig
): Promise<Action[]> => {
  if (!config.apiKey) {
    return [];
  }

  const summary = buildSummary(world, continentId);
  const proposals = buildProposalSummary(world, continentId);
  const prompt = promptTemplate
    .replace("{{continentName}}", continentId)
    .replace("{{stateSummary}}", summary)
    .replace("{{proposals}}", proposals)
    .replace("{{schema}}", actionListSchema.toString());

  const response = await callOpenRouter(config.apiKey, {
    model: config.model,
    messages: [{ role: "system", content: prompt }],
    temperature: config.temperature ?? 0.3,
    max_tokens: 400
  });

  const content = response.choices[0]?.message?.content ?? "[]";
  const parsed = JSON.parse(content);
  const validated = actionListSchema.safeParse(parsed);
  if (!validated.success) {
    return [];
  }

  return validated.data;
};
