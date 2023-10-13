import { Cycle } from "./reducer";

export enum ActionTypes {
  ADD = "ADD",
  FINISHED = "FINISHED",
  INTERRUPT = "INTERRUPT",
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.ADD,
    payload: {
      newCycle,
    },
  };
}

export function interruptCycleAction() {
  return {
    type: ActionTypes.INTERRUPT,
  };
}

export function markCurrentFinishedAction() {
  return {
    type: ActionTypes.FINISHED,
  };
}
