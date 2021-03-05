import { ThunkDispatch } from '@reduxjs/toolkit';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AnyAction, Unsubscribe } from 'redux';
import { UserAuthData } from '../../models/UserAuthData';
import {
  addUserInStore,
  removeUserFromStore,
} from '../../store/User/userThunks';
import { UserMapper } from '../mappers/userMapper';

const userMapper = new UserMapper();

export namespace UserApi {
  export async function signInByEmailAndPassword(
    user: UserAuthData
  ): Promise<firebase.auth.UserCredential> {
    return firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password);
  }

  export async function registerByEmailAndPassword(
    user: UserAuthData
  ): Promise<firebase.auth.UserCredential> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);
  }

  export function signOut(): Promise<void> {
    return firebase.auth().signOut();
  }

  export function observeUser(
    dispatch: ThunkDispatch<unknown, unknown, AnyAction>
  ): Unsubscribe {
    return firebase
      .auth()
      .onAuthStateChanged((user: firebase.User | null): void => {
        if (user) {
          dispatch(addUserInStore(userMapper.transformResponse(user)));
        } else {
          dispatch(removeUserFromStore());
        }
      });
  }
}
