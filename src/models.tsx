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

export interface IValidation {
   status: boolean, 
   error?: string,
};


export interface IDrink {
   drinkName: string
   drinkStrength: number
};