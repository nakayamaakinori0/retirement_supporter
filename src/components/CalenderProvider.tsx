import React, {createContext, useState} from 'react';

export const CalenderContext = createContext({
  retirementDate: null as string | null,
  setRetirementDate: (date: string) => {},
});

CalenderContext.displayName = 'CalenderContext';

export const CalenderProvider = ({children}: {children: React.ReactNode}) => {
  const [retirementDate, setRetirementDate] = useState<string | null>(null);
  const contextValue = {
    retirementDate: retirementDate,
    setRetirementDate: setRetirementDate,
  };

  return (
    <CalenderContext.Provider value={contextValue}>
      {children}
    </CalenderContext.Provider>
  );
};
