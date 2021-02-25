import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './User/userSlice';

export const rootReducer = combineReducers({
  user: userReducer,
});
