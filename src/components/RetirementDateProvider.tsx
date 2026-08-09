import React, { createContext, useState } from 'react';

export const RetirementDateContext = createContext({
  retirementDate: "",
  setRetirementDate: (date: string) => {},
});

RetirementDateContext.displayName = 'RetirementDateContext';

export const RetirementDateProvider = ({ children }: { children: React.ReactNode }) => {
  const [retirementDate, setRetirementDate] = useState<string>("");
  const contextValue = {
    retirementDate: retirementDate,
    setRetirementDate: setRetirementDate,
  };

  return (
    <RetirementDateContext.Provider value={contextValue}>
      {children}
    </RetirementDateContext.Provider>
  );
};
