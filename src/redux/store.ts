import { configureStore } from '@reduxjs/toolkit';
import validationReducer from './slices/validationSlice';

export const store = configureStore({
   reducer: {
      validationReducer,
   }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;