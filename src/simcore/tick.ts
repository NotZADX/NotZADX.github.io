import type { Action } from "./actions/actionSchema.js";
import { applyAction } from "./actions/applyAction.js";
import { collectProposals, resolveDiplomacy } from "./systems/diplomacy.js";
import { runEconomySystem } from "./systems/economy.js";
import { runEventSystem } from "./systems/events.js";
import { runPoliticsSystem } from "./systems/politics.js";
import { runSocietySystem } from "./systems/society.js";
import type { World } from "./models/World.js";

export type TurnReport = {
  turn: number;
  actionReasons: string[];
  economy: Record<string, unknown>;
  society: Record<string, unknown>;
  politics: Record<string, unknown>;
  diplomacy: Record<string, unknown>;
  events: Record<string, unknown>;
};

export const runTurn = (world: World, actions: Action[]): TurnReport => {
  const actionReasons: string[] = [];
  const immediateActions = actions.filter(
    (action) => action.type !== "PROPOSE_TREATY" && action.type !== "RESPOND_TREATY"
  );

  for (const action of immediateActions) {
    const result = applyAction(world, action);
    actionReasons.push(...result.reasons);
  }

  collectProposals(world, actions);

  const economy = runEconomySystem(world);
  const society = runSocietySystem(world);
  const politics = runPoliticsSystem(world);
  const diplomacy = resolveDiplomacy(world, actions);
  const events = runEventSystem(world);

  world.turn += 1;

  return {
    turn: world.turn,
    actionReasons,
    economy,
    society,
    politics,
    diplomacy,
    events
  };
};
