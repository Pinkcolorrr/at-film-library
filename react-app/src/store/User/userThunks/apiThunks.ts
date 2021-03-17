import { AsyncThunk, createAsyncThunk, Unsubscribe } from '@reduxjs/toolkit';
import { UserApi } from '../../../api/services/UserAPI';
import { UserAuthData } from '../../../models/UserAuthData';

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

/**
 * Subscribe for user update
 * If user is logged in, API will call "addUserInStore" thunk
 * If user is logged out, API will call "removeUserFromStore" thunk
 */
export const observeUser: AsyncThunk<Unsubscribe, void, Record<string, never>> = createAsyncThunk(
  'user/observeUser',
  async (_: void, thunkAPI): Promise<Unsubscribe> => UserApi.observeUser(thunkAPI.dispatch),
);
