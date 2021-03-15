import { Maybe } from 'yup/lib/types';
import { RootState } from '../rootReducer';

export const selectAuthState = (state: RootState): boolean => state.user.logged;

export const selectErrorMsg = (state: RootState): Maybe<string> => state.user.errorMsg;

export const selectUserEmail = (state: RootState): Maybe<string> => state.user.info?.email;

export const selectIsUserPending = (state: RootState): boolean => state.user.isPending;
