export interface IQuestions {
   'gender'?: any
   'weight'?: any
   'height'?: any,
   'drink-strength'?: any
   'snacks': any
   'place-of-bender': any
   'drinking-buddies': any
   'drinker-level': any
   'hangover-frequency': any
   'physical-activity': any 
   'smoking': any
   'goal': any
};

export interface IValidationState {
   status: boolean, 
   error?: string,
};

export type ValidationStatusTypes = 'NOT_VALID' | 'NOT_NUMBER' | 'NOT_FILLED' | 'VALIDATED';

export enum ValidationStatuses {
   NOT_FILLED = 'NOT_FILLED',
   NOT_VALID = 'NOT_VALID', 
   NOT_NUMBER = 'NOT_NUMBER',
   VALIDATED = 'VALIDATED',
};

export interface IDrink {
   drinkName: string
   drinkStrength: number
};