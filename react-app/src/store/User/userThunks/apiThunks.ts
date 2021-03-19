/**
 * Thunks, that call API functions, that can't return value right after the calling.
 * For example, this thunks call observers functions.
 *
 * 'API' and 'combined' thunks was divided to avoid cyclic dependencies.
 */

import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { Unsubscribe } from 'redux';
import { UserApi } from '../../../api/services/UserAPI';
import { UserAuthData } from '../../../models/UserAuthData';

/**
 * Subscribe for user update
 * If user is logged in, API will call "addUserInStore" thunk
 * If user is logged out, API will call "removeUserFromStore" thunk
 */
export const observeUser: AsyncThunk<Unsubscribe, void, Record<string, never>> = createAsyncThunk(
  'user/observeUser',
  async (_: void, thunkAPI): Promise<Unsubscribe> => UserApi.observeUser(thunkAPI.dispatch),
);

/** Thunk for login user in system */
export const signInByEmailAndPassword: AsyncThunk<void, UserAuthData, Record<string, never>> = createAsyncThunk(
  'user/signInByEmailAndPassword',
  async (userAuthData: UserAuthData): Promise<void> => {
    await UserApi.signInByEmailAndPassword(userAuthData);
  },
);

/** Thunk for register user */
export const registerByEmailAndPassword: AsyncThunk<void, UserAuthData, Record<string, never>> = createAsyncThunk(
  'user/registerByEmailAndPassword',
  async (userAuthData: UserAuthData): Promise<void> => {
    await UserApi.registerByEmailAndPassword(userAuthData);
  },
);

/** Thunk for sing out user */
export const signOut: AsyncThunk<void, void, Record<string, never>> = createAsyncThunk(
  'user/signOut',
  async (): Promise<void> => {
    await UserApi.signOut();
  },
);
