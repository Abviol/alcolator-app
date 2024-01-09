import * as React from 'react';
import { Header } from '../components/header';
import { Block } from '../components/block';
import { useResults } from '../ResultsContext';

export function ResultsPage() {

   const results = useResults()
   const drinkStrength = results?.drinkStrength.value
   const volumeToDrink = results?.volumeToDrink.value

   return(
      <> 
         <Header title='Results' goBackButton={true} />
         <main className="main">
            <div className="container">
               <Block type='warning' title='Attention'>
                  <p>
                     The results may differ from real alcohol level.
                     Individual characteristics of the organism can influence the result.
                  </p>
               </Block>

               <Block title='Information about the drink'>
                  <div className="block__specific-info">
                     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 33 32" fill="none">
                        <path d="M15.1667 25.3333V18.5185L4.5 6.66667V4H28.5V6.66667L17.8333 18.5185V25.3333H24.5V28H8.5V25.3333H15.1667ZM10.4876 9.33333H22.5124L24.9124 6.66667H8.08763L10.4876 9.33333Z" fill="#8D5A76" />
                     </svg>
                     <p>
                        { drinkStrength }%
                     </p>
                  </div>
               </Block>
               <Block title='Your dose'>
                  <div className="block__more-specific-info">
                     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 33 32" fill="none">
                        <path d="M16.4998 29.3334C9.13604 29.3334 3.1665 23.3638 3.1665 16C3.1665 8.63622 9.13604 2.66669 16.4998 2.66669C23.8636 2.66669 29.8332 8.63622 29.8332 16C29.8332 23.3638 23.8636 29.3334 16.4998 29.3334ZM16.4998 26.6667C22.3909 26.6667 27.1665 21.8911 27.1665 16C27.1665 10.109 22.3909 5.33335 16.4998 5.33335C10.6088 5.33335 5.83317 10.109 5.83317 16C5.83317 21.8911 10.6088 26.6667 16.4998 26.6667ZM15.1665 9.33335H17.8332V12H15.1665V9.33335ZM15.1665 14.6667H17.8332V22.6667H15.1665V14.6667Z" fill="#8D5A76" />
                     </svg>
                     <p>
                        { volumeToDrink } ml
                     </p>
                  </div>
               </Block>
            </div>
         </main>
      </>
   )
}