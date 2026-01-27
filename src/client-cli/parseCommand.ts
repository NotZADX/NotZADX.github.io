import type { Action } from "../simcore/actions/actionSchema.js";
import type { ContinentId } from "../simcore/models/Continent.js";

const createActionId = (continentId: string, suffix: string) =>
  `${continentId}-${suffix}-${Date.now()}`;

const normalize = (input: string) => input.trim().toLowerCase();

export const parsePlayerCommand = (input: string, actor: ContinentId): Action[] => {
  const normalized = normalize(input);
  if (!normalized) {
    return [];
  }

  const actions: Action[] = [];
  const segments = normalized.split(/,|;|\band\b/).map((segment) => segment.trim());

  for (const segment of segments) {
    if (segment.startsWith("set tax")) {
      const match = segment.match(/set tax (vat|income|corporate) (\d+)/);
      if (match) {
        actions.push({
          id: createActionId(actor, `tax-${match[1]}`),
          actor,
          type: "SET_TAX_RATE",
          tax: match[1] as "vat" | "income" | "corporate",
          value: Number(match[2])
        });
      }
    } else if (segment.startsWith("increase") || segment.startsWith("decrease")) {
      const match = segment.match(/(increase|decrease) (welfare|health|education|infrastructure|military) (\d+)/);
      if (match) {
        const delta = Number(match[3]) * (match[1] === "increase" ? 1 : -1);
        actions.push({
          id: createActionId(actor, `spend-${match[2]}`),
          actor,
          type: "ADJUST_SPENDING",
          category: match[2] as
            | "welfare"
            | "health"
            | "education"
            | "infrastructure"
            | "military",
          deltaPercent: delta
        });
      }
    } else if (segment.startsWith("propose")) {
      const match = segment.match(/propose (trade|alliance|sanctions|aid) with (.+)/);
      if (match) {
        actions.push({
          id: createActionId(actor, `treaty-${match[1]}`),
          actor,
          type: "PROPOSE_TREATY",
          target: match[2].replace(" ", "_") as ContinentId,
          treatyType: match[1] as "trade" | "alliance" | "sanctions" | "aid",
          terms: { intent: "player_proposal" }
        });
      }
    } else if (segment.startsWith("build")) {
      const match = segment.match(/build (\w+)/);
      if (match) {
        actions.push({
          id: createActionId(actor, `build-${match[1]}`),
          actor,
          type: "BUILD_PROJECT",
          projectId: match[1]
        });
      }
    }
  }

  return actions;
};
