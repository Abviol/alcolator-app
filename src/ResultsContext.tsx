import React from 'react';
import { useContext, useState } from 'react';

interface ResultsContextProps {
   drinkStrength: {
      value: number
      setValue: React.Dispatch<React.SetStateAction<number>>
   }
   volumeToDrink: {
      value: number
      setValue: React.Dispatch<React.SetStateAction<number>>
   }
}

interface ResultsProviderProps {
   children: React.ReactNode
}

//? init context
const ResultsContext = React.createContext<ResultsContextProps | undefined>(undefined);

//? creat hook to use the context
export function useResults() {
   return useContext(ResultsContext)
}

export function ResultsProvider({ children }: ResultsProviderProps) {

   const [drinkStrength, setDrinkStrength] = useState(0);
   const [volumeToDrink, setVolumeToDrink] = useState(0);


   return (
      <ResultsContext.Provider value={{
         drinkStrength: {
            value: drinkStrength,
            setValue: setDrinkStrength,
         },
         volumeToDrink: {
            value: volumeToDrink,
            setValue: setVolumeToDrink,
         },
      }}>
         { children }
      </ResultsContext.Provider>
   )
}