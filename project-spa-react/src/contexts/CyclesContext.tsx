import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import {
  addNewCycleAction,
  interruptCycleAction,
  markCurrentFinishedAction,
} from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

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
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storeStateAsJson = localStorage.getItem(
        "@project:cycles-timer-1.0.0"
      );

      if (storeStateAsJson) {
        return JSON.parse(storeStateAsJson);
      }
      return initialState;
    }
  );
  const { activeCycleId, cycles } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
  const [amuontSecondsPassed, setAmuontSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }

    return 0;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem("@project:cycles-timer-1.0.0", stateJSON);
  }, [cyclesState]);

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
