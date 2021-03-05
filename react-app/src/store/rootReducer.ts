import { combineReducers } from '@reduxjs/toolkit';
import { filmsReducer } from './Films/filmsSlice';
import { userReducer } from './User/userSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  films: filmsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
