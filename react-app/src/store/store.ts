import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { rootReducer } from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

/**
 * AppDispatch type is necessary for correct typing of dispatch
 * Without it imposible to use then after dispatch
 */
export type AppDispatch = typeof store.dispatch;
export const useThunkDispatch = (): AppDispatch => useDispatch<AppDispatch>();
