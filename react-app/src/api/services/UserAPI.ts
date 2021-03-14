import { ThunkDispatch } from '@reduxjs/toolkit';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AnyAction, Unsubscribe } from 'redux';
import { UserAuthData } from '../../models/UserAuthData';
import { addUserInStore, removeUserFromStore } from '../../store/User/userThunks';
import { UserMapper } from '../mappers/userMapper';

const userMapper = new UserMapper();

export const UserApi = {
  async signInByEmailAndPassword(user: UserAuthData): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
  },

  async registerByEmailAndPassword(user: UserAuthData): Promise<firebase.auth.UserCredential> {
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
  },

  async signOut(): Promise<void> {
    return firebase.auth().signOut();
  },

  observeUser(dispatch: ThunkDispatch<unknown, unknown, AnyAction>): Unsubscribe {
    return firebase.auth().onAuthStateChanged((user: firebase.User | null): void => {
      if (user) {
        dispatch(addUserInStore(userMapper.transformResponse(user)));
      } else {
        dispatch(removeUserFromStore());
      }
    });
  },
};
