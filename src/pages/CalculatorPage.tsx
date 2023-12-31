﻿import React, { useEffect, useRef, useState } from 'react';
import { Header } from '../components/header';
import { Block } from '../components/block';
import { RadioButton } from '../components/radioBatton';
import { Checkbox } from '../components/checkbox';
import { useNavigate } from 'react-router-dom';
import { IQuestions, IValidation } from '../models';
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

   //? use results context
   const results = useResults();

   //? validation state
   const [validation, setvalidation] = useState<IQuestions>({
      'gender': {
         status: false,
         error: 'This field must be filled.',
      },
      'weight': {
         status: false,
         error: 'This field must be filled.',
      },
      'height': {
         status: false,
         error: 'This field must be filled.',
      },
      'drink-strength': {
         status: false,
         error: 'This field must be filled.',
      },
      'snacks': {
         status: false,
         error: 'This field must be filled.',
      },
      'place-of-bender': {
         status: false,
         error: 'This field must be filled.',
      },
      'drinking-buddies': {
         status: false,
         error: 'This field must be filled.',
      },
      'drinker-level': {
         status: false,
         error: 'This field must be filled.',
      },
      'hangover-frequency': {
         status: false,
         error: 'This field must be filled.',
      },
      'physical-activity': {
         status: false,
         error: 'This field must be filled.',
      },
      'smoking': {
         status: false,
         error: 'This field must be filled.',
      },
      'goal': {
         status: false,
         error: 'This field must be filled.',
      },
   });

   //? State variable to track form submission
   const [submitted, setSubmitted] = useState(false);

   //? onChange handler
   function onChangeHandler(e: any, setState: (value: React.SetStateAction<any>) => void): void {
      const blockName = e.target.closest('.block').id
      const value = (coefficients as any)[blockName][e.target.id.replace(e.target.name + '-', '')]
      //* start validation
      if ((validation as any)[blockName]['status'] === false) setvalidation((prevStatus) => ({
         ...prevStatus, [blockName]: {
            status: true,
            error: '',
         }
      }))
      //* end validation
      setState(value)
   }

   //? onInput handler

   const timeoutsRef = useRef<{ [key: string]: any }>({})

   function onInputHandler(e: any, setState: (value: React.SetStateAction<any>) => void, validationCondition?: (e?: any) => IValidation): void {
      const blockName = e.target.closest('.block').id;
      const value = e.target.value;
      //* Clear the existing timeout associated with the current input
      clearTimeout(timeoutsRef.current[blockName])
      //* Start a new timeout for the current input
      timeoutsRef.current[blockName] = setTimeout(() => {
         setState(value);
         //* start validation
         var inputValidation: IValidation;
         if (validationCondition) {
            inputValidation = validationCondition(value);
         } else {
            inputValidation = {
               status: true,
               error: '',
            };
         }
         if (value === '') {
            setvalidation((prevStatus) => ({
               ...prevStatus, [blockName]: {
                  status: false,
                  error: 'This field must be filled.',
               }
            }))
         } else {
            setvalidation((prevStatus) => ({ ...prevStatus, [blockName]: inputValidation }))
         }
         //* end validation
      }, 1000)
   }

   //i Start calculation logic
   const navigate = useNavigate();

   function calculateResults() {
      //? Set form as submitted
      setSubmitted(true);

      //? validate the form
      const isValid = Object.values(validation).every(({ status }) => status);
      if (!isValid) {
         const firstInvalidBlock = Object.keys(validation).find((block) => !(validation as any)[block].status);
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
               <Block validation={submitted && validation} title='Gender' id='gender'>
                  <RadioButton name='gender' id='gender-male' text='Male' onChange={(e) => onChangeHandler(e, setGender)} />
                  <RadioButton name='gender' id='gender-female' text='Female' onChange={(e) => onChangeHandler(e, setGender)} />
               </Block>
               {/* //s End Gender block */}

               {/* //s Start Weight block */}
               <Block validation={submitted && validation} title='Weight (kg)' id='weight'>
                  <input className="input input-question" placeholder='40-250' onInput={(e) => onInputHandler(e, setWeight, (value) => {
                     if (!isNaN(value) && !isNaN(parseFloat(value)) && (+value > 250 || +value < 40)) return {
                        status: false,
                        error: 'Enter a valid value.'
                     }
                     if (!isNaN(value) && !isNaN(parseFloat(value))) return {
                        status: true,
                     }
                     return {
                        status: false,
                        error: 'Enter a number.'
                     }
                  })} />
               </Block>
               {/* //s End Weight block */}

               {/* //s Start Height block */}
               <Block validation={submitted && validation} title='Height (cm)' id='height'>
                  <input className="input input-question" placeholder='140-220' onInput={(e) => onInputHandler(e, setHeight, (value) => {
                     if (!isNaN(value) && !isNaN(parseFloat(value)) && (+value < 140 || +value > 220)) return {
                        status: false,
                        error: 'Enter a valid value.'
                     }
                     if (!isNaN(value) && !isNaN(parseFloat(value))) return {
                        status: true,
                     }
                     return {
                        status: false,
                        error: 'Enter a number.'
                     }
                  })} />
               </Block>
               {/* //s End Height block */}

               {/* //s Start Drink-strength block */}
               <Block validation={submitted && validation} title='Drink strength (%)' id='drink-strength'>
                  {/* <Input placeholder='E.g. Jägermeister' onInput={(e) => onInputHandler(e, setKindOfDrink)} />
                  <Checkbox name='custom-drink-strength' id='custom-drink-strength-1' text='Select custom strength' /> */}
                  <input className="input input-question" placeholder='1-99' onInput={(e) => onInputHandler(e, setDrinkStrength, (value) => {
                     if (!isNaN(value) && !isNaN(parseFloat(value)) && (+value < 1 || value > 99)) return {
                        status: false,
                        error: 'Enter a valid value.'
                     }
                     if (!isNaN(value) && !isNaN(parseFloat(value)) && +value > 0) return {
                        status: true,
                     }
                     return {
                        status: false,
                        error: 'Enter a number.'
                     }
                  })} />
               </Block>
               {/* //s end Kind-of-drink block */}

               {/* //s Start Snacks block */}
               <Block validation={submitted && validation} title='Snacks' id='snacks'>
                  <RadioButton name='snacks' id='snacks-no' text='No' onChange={(e) => onChangeHandler(e, setSnacksCoefficient)} />
                  <RadioButton name='snacks' id='snacks-cold' text='Cold snacks' onChange={(e) => onChangeHandler(e, setSnacksCoefficient)} />
                  <RadioButton name='snacks' id='snacks-hot' text='Hot snacks' onChange={(e) => onChangeHandler(e, setSnacksCoefficient)} />
               </Block>
               {/* //s End Snacks block */}

               {/* //s Start Place-of-bender block */}
               <Block validation={submitted && validation} title='Where will you drink?' id='place-of-bender'>
                  <RadioButton name='place-of-bender' id='place-of-bender-at-home' text='At home' onChange={(e) => onChangeHandler(e, setPlaceOfBenderCoefficient)} />
                  <RadioButton name='place-of-bender' id='place-of-bender-in-a-bar' text='In a bar' onChange={(e) => onChangeHandler(e, setPlaceOfBenderCoefficient)} />
                  <RadioButton name='place-of-bender' id='place-of-bender-outdoors' text='Outdoors' onChange={(e) => onChangeHandler(e, setPlaceOfBenderCoefficient)} />
               </Block>
               {/* //s End Place-of-bender block */}

               {/* //s Start Drinking-buddies block */}
               <Block validation={submitted && validation} title='Who wil you drink with?' id='drinking-buddies'>
                  <RadioButton name='drinking-buddies' id='drinking-buddies-alone' text='Alone' onChange={(e) => onChangeHandler(e, setDrinkingBuddiesCoefficient)} />
                  <RadioButton name='drinking-buddies' id='drinking-buddies-with-friends' text='With friends' onChange={(e) => onChangeHandler(e, setDrinkingBuddiesCoefficient)} />
               </Block>
               {/* //s End Place-of-bender block */}

               {/* //s Start Drinker-level block */}
               <Block validation={submitted && validation} title='Your level' id='drinker-level'>
                  <RadioButton name='drinker-level' id='drinker-level-novice' text='Novice' onChange={(e) => onChangeHandler(e, setDrinkerLevelCoefficient)} />
                  <RadioButton name='drinker-level' id='drinker-level-advanced-beginner' text='Advanced beginner' onChange={(e) => onChangeHandler(e, setDrinkerLevelCoefficient)} />
                  <RadioButton name='drinker-level' id='drinker-level-competence' text='Competence' onChange={(e) => onChangeHandler(e, setDrinkerLevelCoefficient)} />
                  <RadioButton name='drinker-level' id='drinker-level-specialist' text='Specialist' onChange={(e) => onChangeHandler(e, setDrinkerLevelCoefficient)} />
                  <RadioButton name='drinker-level' id='drinker-level-expert' text='Expert' onChange={(e) => onChangeHandler(e, setDrinkerLevelCoefficient)} />
                  <RadioButton name='drinker-level' id='drinker-level-master' text='Master' onChange={(e) => onChangeHandler(e, setDrinkerLevelCoefficient)} />
               </Block>
               {/* //s End Drinker-level block */}

               {/* //s Start Hangover-frequency block */}
               <Block validation={submitted && validation} title='How often do you have hangover?' id='hangover-frequency'>
                  <RadioButton name='hangover-frequency' id='hangover-frequency-never' text='Never' onChange={(e) => onChangeHandler(e, setHangoverFrequencyCoefficient)} />
                  <RadioButton name='hangover-frequency' id='hangover-frequency-hardly-ever' text='Hardly ever' onChange={(e) => onChangeHandler(e, setHangoverFrequencyCoefficient)} />
                  <RadioButton name='hangover-frequency' id='hangover-frequency-rarely' text='Rarely' onChange={(e) => onChangeHandler(e, setHangoverFrequencyCoefficient)} />
                  <RadioButton name='hangover-frequency' id='hangover-frequency-often' text='Often' onChange={(e) => onChangeHandler(e, setHangoverFrequencyCoefficient)} />
                  <RadioButton name='hangover-frequency' id='hangover-frequency-almost-always' text='Almost always' onChange={(e) => onChangeHandler(e, setHangoverFrequencyCoefficient)} />
               </Block>
               {/* //s End Drinker-level block */}

               {/* //s Start Physical-activity block */}
               <Block validation={submitted && validation} title='Will you have any physical activity?' id='physical-activity'>
                  <RadioButton name='physical-activity' id='physical-activity-yes' text='Yes' onChange={(e) => onChangeHandler(e, setPhysicalActivityCoefficient)} />
                  <RadioButton name='physical-activity' id='physical-activity-no' text='No' onChange={(e) => onChangeHandler(e, setPhysicalActivityCoefficient)} />
               </Block>
               {/* //s End Physical-activity block */}

               {/* //s Start Smoking block */}
               <Block validation={submitted && validation} title='Do you smoke?' id='smoking'>
                  <RadioButton name='smoking' id='smoking-yes' text='Yes' onChange={(e) => onChangeHandler(e, setSmokingCoefficient)} />
                  <RadioButton name='smoking' id='smoking-no' text='No' onChange={(e) => onChangeHandler(e, setSmokingCoefficient)} />
               </Block>
               {/* //s End Smoking block */}

               {/* //s Start Goal block */}
               <Block validation={submitted && validation} title='The goal of the bender' id='goal'>
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