import { actionSchema, actionListSchema, type Action } from "./actionSchema.js";

export const validateAction = (action: unknown): action is Action => {
  return actionSchema.safeParse(action).success;
};

export const validateActionList = (actions: unknown): actions is Action[] => {
  return actionListSchema.safeParse(actions).success;
};
