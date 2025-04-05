import React, { createContext, useContext, useState, useEffect } from 'react';
import { getBankAccount, addGold, removeGold, canAfford, initBankAccount } from '../utils/bankAccount';

interface GoldContextType {
  gold: number;
  addGold: (amount: number) => void;
  removeGold: (amount: number) => void;
  canAfford: (amount: number) => boolean;
}

const GoldContext = createContext<GoldContextType | undefined>(undefined);

export const GoldProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialiser le compte en banque au chargement
  useEffect(() => {
    initBankAccount();
    setGold(getBankAccount());
  }, []);

  const [gold, setGold] = useState(getBankAccount());

  // Mettre à jour l'état toutes les 50ms pour une meilleure synchronisation
  useEffect(() => {
    const interval = setInterval(() => {
      const currentGold = getBankAccount();
      if (currentGold !== gold) {
        console.log('Mise à jour de l\'or:', currentGold);
        setGold(currentGold);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [gold]);

  return (
    <GoldContext.Provider value={{ gold, addGold, removeGold, canAfford }}>
      {children}
    </GoldContext.Provider>
  );
};

export const useGold = () => {
  const context = useContext(GoldContext);
  if (context === undefined) {
    throw new Error('useGold must be used within a GoldProvider');
  }
  return context;
}; 