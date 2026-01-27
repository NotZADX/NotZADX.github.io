import { describe, expect, it } from "vitest";
import { actionListSchema } from "../src/simcore/actions/actionSchema.js";

const validAction = [
  {
    id: "action-1",
    actor: "africa",
    type: "SET_TAX_RATE",
    tax: "vat",
    value: 12
  }
];

describe("action validation", () => {
  it("accepts valid action list", () => {
    const result = actionListSchema.safeParse(validAction);
    expect(result.success).toBe(true);
  });

  it("rejects invalid action list", () => {
    const result = actionListSchema.safeParse([
      {
        id: "bad",
        actor: "africa",
        type: "SET_TAX_RATE",
        tax: "vat",
        value: 999
      }
    ]);
    expect(result.success).toBe(false);
  });
});
