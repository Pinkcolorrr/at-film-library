import { ThunkDispatch } from '@reduxjs/toolkit';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AnyAction, Unsubscribe } from 'redux';
import { UserAuthData } from '../../models/UserAuthData';
import { loginIn, logout } from '../../store/User/userSlice';
import { userMapper } from '../mappers/userMapper';

export function signIn(user: UserAuthData) {
  return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
}

export function register(user: UserAuthData) {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password);
}

export function signOut() {
  return firebase.auth().signOut();
}

export function observeUser(
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>
): Unsubscribe {
  return firebase
    .auth()
    .onAuthStateChanged((user: firebase.User | null): void => {
      if (user) {
        dispatch(loginIn(userMapper(user)));
      } else {
        dispatch(logout());
      }
    });
}
