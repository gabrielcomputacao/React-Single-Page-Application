import { ReactNode, createContext, useReducer, useState } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import {
  addNewCycleAction,
  interruptCycleAction,
  markCurrentFinishedAction,
} from "../reducers/cycles/actions";

interface CreateCylceData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amuontSecondsPassed: number;
  cycles: Cycle[];
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  interruptCurrentCycle: () => void;
  createCreateNewCycle: (data: CreateCylceData) => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesChildrenProps {
  children: ReactNode;
}

export function CyclesContextProvider({ children }: CyclesChildrenProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  });

  const [amuontSecondsPassed, setAmuontSecondsPassed] = useState(0);
  const { activeCycleId, cycles } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function setSecondsPassed(seconds: number) {
    setAmuontSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentFinishedAction());
  }

  function interruptCurrentCycle() {
    dispatch(interruptCycleAction());
  }

  function createCreateNewCycle(data: CreateCylceData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle));
    setAmuontSecondsPassed(0);
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amuontSecondsPassed,
        setSecondsPassed,
        createCreateNewCycle,
        interruptCurrentCycle,
        cycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
