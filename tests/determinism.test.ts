import { describe, expect, it } from "vitest";
import { createInitialWorld } from "../src/simcore/models/World.js";
import { runTurn } from "../src/simcore/tick.js";
import { heuristicActions } from "../src/simcore/ai/heuristicAI.js";
import type { ContinentId } from "../src/simcore/models/Continent.js";

const runSample = () => {
  const world = createInitialWorld(1234);
  for (let turn = 0; turn < 5; turn += 1) {
    const actions = heuristicActions(world, "africa" as ContinentId);
    runTurn(world, actions);
  }
  return JSON.stringify(world);
};

describe("determinism", () => {
  it("produces identical output with same seed", () => {
    expect(runSample()).toEqual(runSample());
  });
});
