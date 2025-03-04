import { createContext, useContext } from "react";
import { Page } from "../utils/types";
import { usePageState } from "./usePageState";

type AppStateContextType = ReturnType<typeof usePageState>;

const AppStateContext = createContext<AppStateContextType>(
  {} as AppStateContextType
);

type AppStateProviderProps = {
  children: React.ReactNode;
  initialState: Page;
};

export const AppStateProvider = ({
  children,
  initialState,
}: AppStateProviderProps) => {
  const pageStateHandlers = usePageState(initialState);
  return (
    <AppStateContext.Provider value={pageStateHandlers}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within a AppStateProvider");
  }
  return context;
};
