import { readFileSync, writeFileSync } from "node:fs";
import type { World } from "../models/World.js";

export const saveWorld = (world: World, filePath: string): void => {
  writeFileSync(filePath, JSON.stringify(world, null, 2), "utf-8");
};

export const loadWorld = (filePath: string): World => {
  const data = readFileSync(filePath, "utf-8");
  return JSON.parse(data) as World;
};
