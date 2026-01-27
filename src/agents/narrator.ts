import { readFileSync } from "node:fs";
import { callOpenRouter } from "./openrouterClient.js";

const promptTemplate = readFileSync(
  new URL("./prompts/narratorPrompt.txt", import.meta.url),
  "utf-8"
);

export const runNarrator = async (
  apiKey: string | undefined,
  model: string,
  turnResults: string
): Promise<string | null> => {
  if (!apiKey) {
    return null;
  }
  const prompt = promptTemplate.replace("{{turnResults}}", turnResults);
  const response = await callOpenRouter(apiKey, {
    model,
    messages: [{ role: "system", content: prompt }],
    temperature: 0.7,
    max_tokens: 200
  });
  return response.choices[0]?.message?.content ?? null;
};
