import React, { useEffect, useState } from 'react';
import { Header } from '../components/header';
import { Block } from '../components/block';
import { Input } from '../components/input';
import { RadioButton } from '../components/radioBatton';
import { Checkbox } from '../components/checkbox';

function CalculatorPage() {
   //i Start show/hide go-up button
   const [showButton, setShowButton] = useState(false)

   useEffect(() => {
      const handleScroll = () => {
         let scrolled = window.scrollY;
         if (scrolled >= 150) {
            setShowButton(true)
         } else {
            setShowButton(false)
         }
      }

      window.addEventListener('scroll', handleScroll)

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, [])



   if (showButton) {
      document.querySelector('.button_up')?.classList.add('button_up_show')
   } else {
      document.querySelector('.button_up')?.classList.remove('button_up_show')
   }

   function goUp(): void {
      window.scroll({
         top: 0,
         left: 0,
         behavior: "smooth",
      });
   }
   //i End show/hide go-up button

   return (
      <>
         <Header />
         <main className="main">
            <div className="container">

               {/* //s Start Kind-of-drink block */}
               <Block title='Kind of drink'>
                  <Input placeholder='E.g. Jägermeister' />
                  <Checkbox name='custom-drink-strength' id='custom-drink-strength-1' text='Select custom strength' />
                  <Input placeholder='1-99%' />
               </Block>
               {/* //s end Kind-of-drink block */}

               {/* //s Start Gender block */}
               <Block title='Gender'>
                  <RadioButton name='gender' id='male' text='Male' />
                  <RadioButton name='gender' id='female' text='Female' />
               </Block>
               {/* //s End Gender block */}

               {/* //s Start Weight block */}
               <Block title='Weight (kg)'>
                  <Input placeholder='E.g. 80' />
               </Block>
               {/* //s End Weight block */}

               {/* //s Start Snacks block */}
               <Block title='Snacks'>
                  <RadioButton name='snacks' id='snacks-no' text='No' />
                  <RadioButton name='snacks' id='snacks-cold' text='Cold snacks' />
                  <RadioButton name='snacks' id='snacks-hot' text='Hot snacks' />
               </Block>
               {/* //s End Snacks block */}

               {/* //s Start Previous-meal block */}
               <Block title='Did you eat before?'>
                  <RadioButton name='previous-meal' id='previous-meal-a-lot' text='Yes, a big portion' />
                  <RadioButton name='previous-meal' id='previous-meal-a-bit' text='Yes, a little bit' />
                  <RadioButton name='previous-meal' id='previous-meal-no' text='Not at all' />
               </Block>
               {/* //s End Previous-meal block */}

               {/* //s Start Place-of-bender block */}
               <Block title='Where will you drink?'>
                  <RadioButton name='place-of-bender' id='place-of-bender-indoors' text='Indoors' />
                  <RadioButton name='place-of-bender' id='place-of-bender-outdoors' text='Outdoors' />
               </Block>
               {/* //s End Place-of-bender block */}

               {/* //s Start Temperature block */}
               <Block title='Temperature outdoors (optional)'>
                  <Input placeholder='From -20 to 40ºC' />
               </Block>
               {/* //s End Temperature block */}

               {/* //s Start Drinker-level block */}
               <Block title='Your level'>
                  <RadioButton name='drinker-level' id='drinker-level-new' text='New guy' />
                  <RadioButton name='drinker-level' id='drinker-level-soldier' text='Soldier' />
                  <RadioButton name='drinker-level' id='drinker-level-general' text='General' />
                  <RadioButton name='drinker-level' id='drinker-level-major' text='Major' />
                  <RadioButton name='drinker-level' id='drinker-level-officer' text='Officer' />
               </Block>
               {/* //s End Drinker-level block */}

               {/* //s Start Hangover-frequency block */}
               <Block title='How often do you have hangover?'>
                  <RadioButton name='hangover-frequency' id='hangover-never' text='Never' />
                  <RadioButton name='hangover-frequency' id='hangover-hardly-ever' text='Hardly ever' />
                  <RadioButton name='hangover-frequency' id='hangover-rarely' text='Rarely' />
                  <RadioButton name='hangover-frequency' id='hangover-often' text='Often' />
                  <RadioButton name='hangover-frequency' id='hangover-almost-always' text='Almost always' />
               </Block>
               {/* //s End Drinker-level block */}

               {/* //s Start Physical-activity block */}
               <Block title='Will you have any physical activity?'>
                  <RadioButton name='physical-activity' id='physical-activity-yes' text='Yes' />
                  <RadioButton name='physical-activity' id='physical-activity-no' text='No' />
               </Block>
               {/* //s End Physical-activity block */}

               {/* //s Start Alcohol-smell-acceptable block */}
               <Block title='Is alcohol smell acceptable?'>
                  <RadioButton name='alcohol-smell-acceptable' id='alcohol-smell-acceptable-yes' text='Yes' />
                  <RadioButton name='alcohol-smell-acceptable' id='alcohol-smell-acceptable-no' text='No' />
               </Block>
               {/* //s End Alcohol-smell-acceptable block */}

               {/* //s Start Smoking block */}
               <Block title='Do you smoke?'>
                  <RadioButton name='smoking' id='smoking-yes' text='Yes' />
                  <RadioButton name='smoking' id='smoking-no' text='No' />
               </Block>
               {/* //s End Smoking block */}

               {/* //s Start Goal block */}
               <Block title='The goal of the bender'>
                  <RadioButton name='goal' id='goal-1' text='Relax a bit' />
                  <RadioButton name='goal' id='goal-2' text='Relax' />
                  <RadioButton name='goal' id='goal-3' text='Have fun' />
                  <RadioButton name='goal' id='goal-4' text='Get drunk' />
                  <RadioButton name='goal' id='goal-5' text='Get drunk as hell' />
               </Block>
               {/* //s End Smoking block */}

               <div className="align-center">
                  <button type='submit' className='button button_submit'>
                     <p className="button__text">
                        Calculate
                     </p>
                  </button>
               </div>

            </div>
         </main>

         <button className="button button_up" onClick={goUp}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
               <path d="M12 13.9142L16.7929 18.7071L18.2071 17.2929L12 11.0858L5.79291 17.2929L7.20712 18.7071L12 13.9142ZM6.00001 7L18 7V9L6.00001 9L6.00001 7Z"></path>
            </svg>
         </button>
      </>
   );
}

export default CalculatorPage;
