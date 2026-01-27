import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { createInitialWorld } from "../simcore/models/World.js";
import { CONTINENTS, type ContinentId } from "../simcore/models/Continent.js";
import { runTurn } from "../simcore/tick.js";
import { parsePlayerCommand } from "./parseCommand.js";
import { renderTurnReport } from "./renderTurn.js";
import { runContinentAgent } from "../agents/continentAgent.js";
import { heuristicActions } from "../simcore/ai/heuristicAI.js";
import { validateActionList } from "../simcore/actions/validateAction.js";
import { saveWorld, loadWorld } from "../simcore/persistence/saveLoad.js";
import type { Action } from "../simcore/actions/actionSchema.js";

const rl = readline.createInterface({ input, output });

const prompt = async (message: string) => {
  const answer = await rl.question(message);
  return answer.trim();
};

const chooseContinent = async (): Promise<ContinentId> => {
  const choices = CONTINENTS.map((continent) => continent.id).join(", ");
  const answer = await prompt(`Choose continent (${choices}): `);
  const selected = answer.replace(" ", "_").toLowerCase() as ContinentId;
  return CONTINENTS.some((continent) => continent.id === selected)
    ? selected
    : "africa";
};

const runAgents = async (
  world: ReturnType<typeof createInitialWorld>,
  apiKey: string | undefined,
  model: string
): Promise<Action[]> => {
  const actions: Action[] = [];
  for (const continent of CONTINENTS) {
    try {
      const agentActions = await runContinentAgent(world, continent.id, {
        apiKey,
        model
      });
      if (validateActionList(agentActions) && agentActions.length > 0) {
        actions.push(...agentActions);
      } else {
        actions.push(...heuristicActions(world, continent.id));
      }
    } catch (error) {
      console.error(`Agent error for ${continent.id}:`, error);
      actions.push(...heuristicActions(world, continent.id));
    }
  }
  return actions;
};

const runGame = async () => {
  console.log("World Simulator CLI");
  const seedInput = await prompt("Seed (number, default 42): ");
  const seed = seedInput ? Number(seedInput) : 42;
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL ?? "openai/gpt-4o-mini";
  const playerId = await chooseContinent();
  let world = createInitialWorld(seed);
  const emptyReport = () => ({
    turn: world.turn,
    actionReasons: [],
    economy: {},
    society: {},
    politics: {},
    diplomacy: {},
    events: {}
  });

  while (true) {
    console.log(renderTurnReport(world, emptyReport(), playerId));
    const inputCommand = await prompt("\nCommand (or 'next', 'save <file>', 'load <file>', 'quit'): ");

    if (inputCommand === "quit") {
      break;
    }

    if (inputCommand.startsWith("save")) {
      const [, filePath] = inputCommand.split(" ");
      if (filePath) {
        saveWorld(world, filePath);
        console.log(`Saved to ${filePath}`);
      }
      continue;
    }

    if (inputCommand.startsWith("load")) {
      const [, filePath] = inputCommand.split(" ");
      if (filePath) {
        world = loadWorld(filePath);
        console.log(`Loaded from ${filePath}`);
      }
      continue;
    }

    const playerActions = inputCommand === "next" ? [] : parsePlayerCommand(inputCommand, playerId);
    const aiActions = await runAgents(world, apiKey, model);
    const actions = [...playerActions, ...aiActions];
    const report = runTurn(world, actions);
    console.log(renderTurnReport(world, report, playerId));
  }

  rl.close();
};

runGame().catch((error) => {
  console.error(error);
  rl.close();
});
