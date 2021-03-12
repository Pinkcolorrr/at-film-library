import { createSlice } from '@reduxjs/toolkit';
import { Maybe } from 'yup/lib/types';
import { UserInfo } from '../../models/UserInfo';
import { RootState } from '../rootReducer';
import {
  addUserInStore,
  signInByEmailAndPassword,
  registerByEmailAndPassword,
  removeUserFromStore,
} from './userThunks';

export type user = {
  readonly info: Maybe<UserInfo>;
  readonly errorMsg: Maybe<string>;
  readonly logged: boolean;
  readonly isPending: boolean;
};

const initialState: user = {
  info: null,
  errorMsg: null,
  logged: false,
  isPending: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeErrorMsg(state) {
      state.errorMsg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUserInStore.fulfilled, (state, action) => {
        state.isPending = false;
        state.logged = true;
        state.info = action.payload;
      })
      .addCase(removeUserFromStore.fulfilled, (state) => {
        state.isPending = false;
        state.logged = false;
        state.info = null;
      })
      .addCase(signInByEmailAndPassword.rejected, (state, action) => {
        state.errorMsg = action.error.message;
      })
      .addCase(registerByEmailAndPassword.rejected, (state, action) => {
        state.errorMsg = action.error.message;
      });
  },
});

export const { removeErrorMsg } = userSlice.actions;

export const selectAuthState = (state: RootState): boolean => state.user.logged;

export const selectErrorMsg = (state: RootState): Maybe<string> => state.user.errorMsg;

export const selectUserEmail = (state: RootState): Maybe<string> => state.user.info?.email;

export const selectIsUserPending = (state: RootState): boolean => state.user.isPending;

export const userReducer = userSlice.reducer;
