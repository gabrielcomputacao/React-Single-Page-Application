import { ReactNode, createContext, /*  useReducer, */ useState } from "react";

interface CreateCylceData {
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
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
  const [cycles, setCycles] = useState<Cycle[]>([]);
  // const [cycles, setCycles] = useReducer((state: Cycle[], action: any) => {
  //   return state;
  // }, []);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const [amuontSecondsPassed, setAmuontSecondsPassed] = useState(0);
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function setSecondsPassed(seconds: number) {
    setAmuontSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
  }

  function interruptCurrentCycle() {
    setCycles(
      cycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
    setActiveCycleId(null);
  }

  function createCreateNewCycle(data: CreateCylceData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
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
