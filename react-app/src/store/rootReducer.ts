import { combineReducers } from '@reduxjs/toolkit';
import { currentContentReducer } from './CurrentContent/currentContentSlice';
import { filmsReducer } from './Films/filmsSlice';
import { planetsReducer } from './Planets/planetsSlice';
import { userReducer } from './User/userSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  films: filmsReducer,
  planets: planetsReducer,
  currentContent: currentContentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
