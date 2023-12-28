import { IQuestions } from "../models"

export const app_title:string = 'Alcolator'

export const coefficients: IQuestions = {
   'gender': {
      'male': 'male',
      'female': 'female',
   },
   'snacks': {
      no: 1, 
      cold: 1.43,
      hot: 1.575,
   },
   'place-of-bender': {
      'at-home': 1,
      'in-a-bar': 0.93,
      'outdoors': 1.09,
   },
   'drinking-buddies': {
      'alone': 1,
      'with-friends': 1.133,
   },
   'drinker-level': {
      'novice': 0.866,
      'advanced-beginner': 1,
      'competence': 1.266, 
      'specialist': 1.541, 
      'expert': 1.741, 
      'master': 1.875, 
   },
   'hangover-frequency': {
      'never': 1,
      'hardly-ever': 0.95,
      'rarely': 0.933,
      'often': 0.8,
      'almost-always': 0.733,
   },
   'physical-activity': {
      'yes': 1.066,
      'no': 1,
   },
   'smoking': {
      'yes': 0.98,
      'no': 1,
   },
   'goal': {
      'relax-a-bit': 0.3,
      'relax': 0.6,
      'have-fun': 0.9,
      'get-drunk': 1.2,
      'get-drunk-as-hell': 1.7,
   },
}