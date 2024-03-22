import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQuestions, IValidationState } from "../../models";
import { RootState } from "../store";

type questionType = 'gender' | 'weight' | 'height' | 'drink-strength' | 'snacks' | 'place-of-bender' | 'drinking-buddies' | 'drinker-level' | 'hangover-frequency' | 'physical-activity' | 'smoking' | 'goal';

//? define initial object key names
const questionNames = ['gender', 'weight', 'height', 'drink-strength', 'snacks', 'place-of-bender', 'drinking-buddies', 'drinker-level', 'hangover-frequency', 'physical-activity', 'smoking', 'goal'];

//? reduce the questionNames array to form an object with same initial objects inside it, which fits the IQuestions interface
const questions: IQuestions = questionNames.reduce((acc, key) => (
   {
      ...acc,
      [key]: {
         status: false,
         error: 'This field must be filled.',
      } as IValidationState,
   }
), {} as IQuestions); //i Tell TypeScript to treat the empty object as having shape defined by IQuestions

//? set initial state
const initialState: IQuestions = questions;

//? create validation slice
export const validationSlice = createSlice({
   name: 'validation',
   initialState,
   reducers: {
      notFilled: (state, action: PayloadAction<questionType>) => {
         return {
            ...state,
            [action.payload]: {
               status: false,
               error: 'This field must be filled.',
            },
         };
      },
      notValid: (state, action: PayloadAction<questionType>) => {
         return {
            ...state,
            [action.payload]: {
               status: false,
               error: 'Enter a valid value.',
            },
         };
      },
      notNumber: (state, action: PayloadAction<questionType>) => {
         return {
            ...state,
            [action.payload]: {
               status: false,
               error: 'Enter a number.',
            },
         };
      },
      validated: (state, action: PayloadAction<questionType>) => {
         return {
            ...state,
            [action.payload]: {
               status: true,
               error: '',
            },
         };
      },
   },
});

export const { notFilled, notValid, notNumber, validated } = validationSlice.actions;

export const selectValidation = (state: RootState) => state.validationReducer;

export default validationSlice.reducer;