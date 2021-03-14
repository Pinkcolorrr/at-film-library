import { combineReducers } from '@reduxjs/toolkit';
import { currentContentReducer } from './CurrentContent';
import { filmsReducer } from './Films/filmsSlice';
import { planetsReducer } from './Planets';
import { userReducer } from './User';

export const rootReducer = combineReducers({
  user: userReducer,
  films: filmsReducer,
  planets: planetsReducer,
  currentContent: currentContentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
