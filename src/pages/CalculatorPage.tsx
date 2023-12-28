import React, { useEffect, useState } from 'react';
import { Header } from '../components/header';
import { Block } from '../components/block';
import { RadioButton } from '../components/radioBatton';
import { Checkbox } from '../components/checkbox';
import { useNavigate } from 'react-router-dom';
import { IQuestions } from '../models';
import { coefficients } from '../data/app.data';
import { useResults } from '../ResultsContext';

function calcWidmarkFactor(gender: string, weight: number, heightInCm: number): number {
   let widmarkFactor: number = 0;
   switch (gender) {
      case 'male':
         widmarkFactor = 1.0181 - 0.01213 * weight / (heightInCm / 100) ** 2;
         break;
      case 'female':
         widmarkFactor = 0.9367 - 0.01240 * weight / (heightInCm / 100) ** 2;
         break;
   }
   console.log(widmarkFactor)
   return widmarkFactor;
}

function CalculatorPage() {

   //? State variables for selected answers
   const [gender, setGender] = useState('');
   const [weight, setWeight] = useState(0);
   const [height, setHeight] = useState(0);
   const [drinkStrength, setDrinkStrength] = useState(0);
   const [snacksCoefficient, setSnacksCoefficient] = useState(0);
   const [placeOfBenderCoefficient, setPlaceOfBenderCoefficient] = useState(0);
   const [drinkingBuddiesCoefficient, setDrinkingBuddiesCoefficient] = useState(0);
   const [drinkerLevelCoefficient, setDrinkerLevelCoefficient] = useState(0);
   const [hangoverFrequencyCoefficient, setHangoverFrequencyCoefficient] = useState(0);
   const [physicalActivityCoefficient, setPhysicalActivityCoefficient] = useState(0);
   const [smokingCoefficient, setSmokingCoefficient] = useState(0);
   const [goalCoefficient, setGoalCoefficient] = useState(0);

   const results = useResults();

   //? validation state
   const [validationStatus, setValidationStatus] = useState<IQuestions>({
      'gender': false,
      'weight': false,
      'height': false,
      'drink-strength': false,
      'snacks': false,
      'place-of-bender': false,
      'drinking-buddies': false,
      'drinker-level': false,
      'hangover-frequency': false,
      'physical-activity': false,
      'smoking': false,
      'goal': false,
   });

   //? onChange handler
   function onChangeHandler(e: any, setState: (value: React.SetStateAction<any>) => void): void {
      const blockName = e.target.closest('.block').id
      const value = (coefficients as any)[blockName][e.target.id.replace(e.target.name + '-', '')]
      if ((validationStatus as any)[blockName] === false) setValidationStatus((prevStatus) => ({ ...prevStatus, [blockName]: true }))
      setState(value)
      console.log(`${blockName}: ${value}`)
   }

   //? onInput handler
   let timeout: any;
   function onInputHandler(e: any, setState: (value: React.SetStateAction<any>) => void): void {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
         const blockName = e.target.closest('.block').id
         const value = e.target.value
         setState(value);
         if ((validationStatus as any)[blockName] === false) setValidationStatus((prevStatus) => ({ ...prevStatus, [blockName]: true }))
         if (value === '') setValidationStatus((prevStatus) => ({ ...prevStatus, [blockName]: false }))
         console.log(`${blockName}: ${value}`)
      }, 1000)
   }

   //i Start calculation logic
   const navigate = useNavigate();

   function calculateResults() {

      //? validate the form
      const isValid = Object.values(validationStatus).every((status) => status);
      if (!isValid) {
         const firstInvalidBlock = Object.keys(validationStatus).find((block) => !(validationStatus as any)[block]);
         const element = document.getElementById(`${firstInvalidBlock}`);
         element?.scrollIntoView({ behavior: 'smooth' });
         return;
      }

      //? calculate volume of drink to consume
      let widmarkFactor = calcWidmarkFactor(gender, weight, height)
      let totalCoefficient = snacksCoefficient * placeOfBenderCoefficient * drinkingBuddiesCoefficient * drinkerLevelCoefficient * hangoverFrequencyCoefficient * physicalActivityCoefficient * smokingCoefficient;
      let volumeOfDrink = Math.floor(goalCoefficient * widmarkFactor * weight / (drinkStrength / 100 * 0.789) * totalCoefficient);

      //? set values to pass to the results page through the ResultsContext
      results?.drinkStrength.setValue(drinkStrength)
      results?.volumeToDrink.setValue(volumeOfDrink)

      console.log('total coefficient:', totalCoefficient)
      console.log('volume of drink to drink:', volumeOfDrink)

      navigate('/results');
   }
   //i End calculation logic


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
         <Header title='Alcolator' />
         <main className="main">
            <div className="container">
               {/* //s Start Gender block */}
               <Block title='Gender' id='gender'>
                  <RadioButton name='gender' id='gender-male' text='Male' onChange={(e) => onChangeHandler(e, setGender)} />
                  <RadioButton name='gender' id='gender-female' text='Female' onChange={(e) => onChangeHandler(e, setGender)} />
               </Block>
               {/* //s End Gender block */}

               {/* //s Start Weight block */}
               <Block title='Weight (kg)' id='weight'>
                  <input className="input input-question" placeholder='E.g. 80' onInput={(e) => onInputHandler(e, setWeight)} />
               </Block>
               {/* //s End Weight block */}

               {/* //s Start Weight block */}
               <Block title='Height (cm)' id='height'>
                  <input className="input input-question" placeholder='E.g. 180' onInput={(e) => onInputHandler(e, setHeight)} />
               </Block>
               {/* //s End Weight block */}

               {/* //s Start Drink-strength block */}
               <Block title='Drink strength' id='drink-strength'>
                  {/* <Input placeholder='E.g. Jägermeister' onInput={(e) => onInputHandler(e, setKindOfDrink)} />
                  <Checkbox name='custom-drink-strength' id='custom-drink-strength-1' text='Select custom strength' /> */}
                  <input className="input input-question" placeholder='1-99%' onInput={(e) => onInputHandler(e, setDrinkStrength)} />
               </Block>
               {/* //s end Kind-of-drink block */}

               {/* //s Start Snacks block */}
               <Block title='Snacks' id='snacks'>
                  <RadioButton name='snacks' id='snacks-no' text='No' onChange={(e) => onChangeHandler(e, setSnacksCoefficient)} />
                  <RadioButton name='snacks' id='snacks-cold' text='Cold snacks' onChange={(e) => onChangeHandler(e, setSnacksCoefficient)} />
                  <RadioButton name='snacks' id='snacks-hot' text='Hot snacks' onChange={(e) => onChangeHandler(e, setSnacksCoefficient)} />
               </Block>
               {/* //s End Snacks block */}

               {/* //s Start Place-of-bender block */}
               <Block title='Where will you drink?' id='place-of-bender'>
                  <RadioButton name='place-of-bender' id='place-of-bender-at-home' text='At home' onChange={(e) => onChangeHandler(e, setPlaceOfBenderCoefficient)} />
                  <RadioButton name='place-of-bender' id='place-of-bender-in-a-bar' text='In a bar' onChange={(e) => onChangeHandler(e, setPlaceOfBenderCoefficient)} />
                  <RadioButton name='place-of-bender' id='place-of-bender-outdoors' text='Outdoors' onChange={(e) => onChangeHandler(e, setPlaceOfBenderCoefficient)} />
               </Block>
               {/* //s End Place-of-bender block */}

               {/* //s Start Drinking-buddies block */}
               <Block title='Who wil you drink with?' id='drinking-buddies'>
                  <RadioButton name='drinking-buddies' id='drinking-buddies-alone' text='Alone' onChange={(e) => onChangeHandler(e, setDrinkingBuddiesCoefficient)} />
                  <RadioButton name='drinking-buddies' id='drinking-buddies-with-friends' text='With friends' onChange={(e) => onChangeHandler(e, setDrinkingBuddiesCoefficient)} />
               </Block>
               {/* //s End Place-of-bender block */}

               {/* //s Start Drinker-level block */}
               <Block title='Your level' id='drinker-level'>
                  <RadioButton name='drinker-level' id='drinker-level-novice' text='Novice' onChange={(e) => onChangeHandler(e, setDrinkerLevelCoefficient)} />
                  <RadioButton name='drinker-level' id='drinker-level-advanced-beginner' text='Advanced beginner' onChange={(e) => onChangeHandler(e, setDrinkerLevelCoefficient)} />
                  <RadioButton name='drinker-level' id='drinker-level-competence' text='Competence' onChange={(e) => onChangeHandler(e, setDrinkerLevelCoefficient)} />
                  <RadioButton name='drinker-level' id='drinker-level-specialist' text='Specialist' onChange={(e) => onChangeHandler(e, setDrinkerLevelCoefficient)} />
                  <RadioButton name='drinker-level' id='drinker-level-expert' text='Expert' onChange={(e) => onChangeHandler(e, setDrinkerLevelCoefficient)} />
                  <RadioButton name='drinker-level' id='drinker-level-master' text='Master' onChange={(e) => onChangeHandler(e, setDrinkerLevelCoefficient)} />
               </Block>
               {/* //s End Drinker-level block */}

               {/* //s Start Hangover-frequency block */}
               <Block title='How often do you have hangover?' id='hangover-frequency'>
                  <RadioButton name='hangover-frequency' id='hangover-frequency-never' text='Never' onChange={(e) => onChangeHandler(e, setHangoverFrequencyCoefficient)} />
                  <RadioButton name='hangover-frequency' id='hangover-frequency-hardly-ever' text='Hardly ever' onChange={(e) => onChangeHandler(e, setHangoverFrequencyCoefficient)} />
                  <RadioButton name='hangover-frequency' id='hangover-frequency-rarely' text='Rarely' onChange={(e) => onChangeHandler(e, setHangoverFrequencyCoefficient)} />
                  <RadioButton name='hangover-frequency' id='hangover-frequency-often' text='Often' onChange={(e) => onChangeHandler(e, setHangoverFrequencyCoefficient)} />
                  <RadioButton name='hangover-frequency' id='hangover-frequency-almost-always' text='Almost always' onChange={(e) => onChangeHandler(e, setHangoverFrequencyCoefficient)} />
               </Block>
               {/* //s End Drinker-level block */}

               {/* //s Start Physical-activity block */}
               <Block title='Will you have any physical activity?' id='physical-activity'>
                  <RadioButton name='physical-activity' id='physical-activity-yes' text='Yes' onChange={(e) => onChangeHandler(e, setPhysicalActivityCoefficient)} />
                  <RadioButton name='physical-activity' id='physical-activity-no' text='No' onChange={(e) => onChangeHandler(e, setPhysicalActivityCoefficient)} />
               </Block>
               {/* //s End Physical-activity block */}

               {/* //s Start Smoking block */}
               <Block title='Do you smoke?' id='smoking'>
                  <RadioButton name='smoking' id='smoking-yes' text='Yes' onChange={(e) => onChangeHandler(e, setSmokingCoefficient)} />
                  <RadioButton name='smoking' id='smoking-no' text='No' onChange={(e) => onChangeHandler(e, setSmokingCoefficient)} />
               </Block>
               {/* //s End Smoking block */}

               {/* //s Start Goal block */}
               <Block title='The goal of the bender' id='goal'>
                  <RadioButton name='goal' id='goal-relax-a-bit' text='Relax a bit' onChange={(e) => onChangeHandler(e, setGoalCoefficient)} />
                  <RadioButton name='goal' id='goal-relax' text='Relax' onChange={(e) => onChangeHandler(e, setGoalCoefficient)} />
                  <RadioButton name='goal' id='goal-have-fun' text='Have fun' onChange={(e) => onChangeHandler(e, setGoalCoefficient)} />
                  <RadioButton name='goal' id='goal-get-drunk' text='Get drunk' onChange={(e) => onChangeHandler(e, setGoalCoefficient)} />
                  <RadioButton name='goal' id='goal-get-drunk-as-hell' text='Get drunk as hell' onChange={(e) => onChangeHandler(e, setGoalCoefficient)} />
               </Block>
               {/* //s End Smoking block */}

               <div className="align-center">
                  <button type='submit' className='button button_submit' onClick={calculateResults}>
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