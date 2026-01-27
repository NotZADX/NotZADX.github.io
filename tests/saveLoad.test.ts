import { describe, expect, it } from "vitest";
import { createInitialWorld } from "../src/simcore/models/World.js";
import { saveWorld, loadWorld } from "../src/simcore/persistence/saveLoad.js";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { unlinkSync } from "node:fs";

const filePath = join(tmpdir(), "world-save-test.json");

describe("save/load", () => {
  it("round-trips world state", () => {
    const world = createInitialWorld(99);
    saveWorld(world, filePath);
    const loaded = loadWorld(filePath);
    expect(loaded).toEqual(world);
    unlinkSync(filePath);
  });
});
