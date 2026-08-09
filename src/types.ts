// Navigation type definitions
export type RootStackParamList = {
  Main: undefined;
  RetirementDay: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  FormRetirementLetter: undefined;
  FontStyles: undefined;
};

// Quote type
export interface Quote {
  author: string;
  meigen: string;
}

// Calendar context types
export interface CalenderContextType {
  retirementDate: string | null;
  setRetirementDate: (date: string | null) => void;
}

// Modal context types
export interface ModalContextType {
  showModal: (
    modalComponent: React.FC<any>,
    modalProps?: object,
    position?: 'upper' | 'center' | 'lower',
    from?: 'upper' | 'center' | 'lower',
  ) => void;
  hideModal: () => void;
}