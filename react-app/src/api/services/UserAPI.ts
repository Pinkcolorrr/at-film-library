import { ThunkDispatch } from '@reduxjs/toolkit';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AnyAction, Unsubscribe } from 'redux';
import { UserAuthData } from '../../models/UserAuthData';
import { addUserInStore, removeUserFromStore } from '../../store/User/userThunks/storeThunks';
import { auth } from '../firebase-config';
import { UserMapper } from '../mappers/userMapper';

/** Object for work with user API */
export const UserApi = {
  /** Sign in user by email and password */
  async signInByEmailAndPassword(user: UserAuthData): Promise<firebase.auth.UserCredential> {
    return auth.signInWithEmailAndPassword(user.email, user.password);
  },

  /** Register user by email and password */
  async registerByEmailAndPassword(user: UserAuthData): Promise<firebase.auth.UserCredential> {
    return auth.createUserWithEmailAndPassword(user.email, user.password);
  },

  /** Sign out user */
  async signOut(): Promise<void> {
    return auth.signOut();
  },

  /** Observe user state and dispatch it in store, if state change */
  observeUser(dispatch: ThunkDispatch<unknown, unknown, AnyAction>): Unsubscribe {
    return auth.onAuthStateChanged((user: firebase.User | null): void => {
      if (user) {
        /** If have user, save it in store */
        dispatch(addUserInStore(UserMapper.transformResponse(user)));
      } else {
        /** If have't got user, remove it from store */
        dispatch(removeUserFromStore());
      }
    });
  },
};
