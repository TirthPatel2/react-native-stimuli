import React, { createContext, useContext, useState } from "react";
import { AppContextType, ContextProviderProps } from "./AppContext.types";


const defaultContextValue: AppContextType = {
  selectedArrow: {},
  selectedColor: {},
  selectedNumber: {},
  updateSelectedArrow: () => { },
  updateSelectedColor: () => { },
  updateSelectedNumber: () => { },
  resetContext: () => { },
};

export const AppContext = createContext<AppContextType>(defaultContextValue);

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [selectedArrow, setSelectedArrow] = useState<any>({});
  const [selectedColor, setSelectedColor] = useState<any>({});
  const [selectedNumber, setSelectedNumber] = useState<any>({});

  const updateSelectedArrow = (data: any) => setSelectedArrow(data);
  const updateSelectedColor = (data: any) => setSelectedColor(data);
  const updateSelectedNumber = (data: any) => setSelectedNumber(data);

  const resetContext = () => {
    updateSelectedArrow({});
    updateSelectedColor({});
    updateSelectedNumber({});
  }

  return (
    <AppContext.Provider value={{
      selectedArrow,
      selectedColor,
      selectedNumber,
      updateSelectedArrow,
      updateSelectedColor,
      updateSelectedNumber,
      resetContext,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
