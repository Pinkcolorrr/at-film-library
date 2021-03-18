import { PossiblyNull } from '../../utils/types';
import { RootState } from '../rootReducer';

/**
 * Select user state
 * True, if user is authorisated
 * False, if user is not authorisated
 */
export const selectAuthState = (state: RootState): boolean => state.user.logged;

/** Select error msg from server */
export const selectErrorMsg = (state: RootState): PossiblyNull<string> | undefined => state.user.errorMsg;

/** Select user email */
export const selectUserEmail = (state: RootState): PossiblyNull<string> | undefined => state.user.info?.email;

/** Select is pending state */
export const selectIsUserPending = (state: RootState): boolean => state.user.isPending;
