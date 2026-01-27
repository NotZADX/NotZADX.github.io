import { CONTINENTS } from "../simcore/models/Continent.js";
import type { World } from "../simcore/models/World.js";
import type { TurnReport } from "../simcore/tick.js";

export const renderTurnReport = (
  world: World,
  report: TurnReport,
  playerId: string
): string => {
  const continent = world.continents[playerId];
  const lines: string[] = [];

  lines.push(`\n=== Turn ${report.turn} (${continent.name}) ===`);
  lines.push(`Treasury: ${continent.economy.treasury} | Debt: ${continent.economy.debt}`);
  lines.push(
    `GDP: ${continent.economy.gdp} | Inflation: ${continent.economy.inflation.toFixed(
      2
    )} | Unemployment: ${continent.economy.unemployment.toFixed(2)}`
  );
  lines.push(
    `Happiness: ${continent.society.happiness.toFixed(1)} | Unrest: ${continent.society.unrest.toFixed(
      1
    )}`
  );
  lines.push(
    `Approval: ${continent.politics.approval.toFixed(1)} | Stability: ${continent.politics.stability.toFixed(
      1
    )}`
  );
  lines.push(`Influence: ${continent.diplomacy.influence}`);
  lines.push(`Treaties: ${continent.diplomacy.treaties.join(", ") || "None"}`);
  lines.push(`Policies: ${continent.policies.join(", ") || "None"}`);

  lines.push("\nRelations:");
  for (const other of CONTINENTS) {
    if (other.id === playerId) {
      continue;
    }
    lines.push(`- ${other.name}: ${continent.diplomacy.relations[other.id]}`);
  }

  lines.push("\nRecent reasons:");
  lines.push(report.actionReasons.join(", ") || "None");

  lines.push("\nEvent log:");
  const events = report.events[playerId] as { events: Array<{ id: string }> } | undefined;
  if (events && events.events.length > 0) {
    lines.push(events.events.map((event) => `- ${event.id}`).join("\n"));
  } else {
    lines.push("No events.");
  }

  return lines.join("\n");
};
