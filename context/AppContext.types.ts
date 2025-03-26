
export interface AppContextType {
  selectedArrow: any;
  selectedColor: any;
  selectedNumber: any;
  updateSelectedArrow: (data: any) => void;
  updateSelectedColor: (data: any) => void;
  updateSelectedNumber: (data: any) => void;
  resetContext: () => void;
}

export interface ContextProviderProps {
  children: React.ReactNode;
}
