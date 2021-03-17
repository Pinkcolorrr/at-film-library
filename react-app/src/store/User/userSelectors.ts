import { Maybe } from 'yup/lib/types';
import { RootState } from '../rootReducer';

/**
 * Select user state
 * True, if user is authorisated
 * False, if user is not authorisated
 */
export const selectAuthState = (state: RootState): boolean => state.user.logged;

/** Select error msg from server */
export const selectErrorMsg = (state: RootState): Maybe<string> => state.user.errorMsg;

/** Select user email */
export const selectUserEmail = (state: RootState): Maybe<string> => state.user.info?.email;

/** Select is pending state */
export const selectIsUserPending = (state: RootState): boolean => state.user.isPending;
