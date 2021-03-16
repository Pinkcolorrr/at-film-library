import { AsyncThunk, createAsyncThunk, Unsubscribe } from '@reduxjs/toolkit';
import { UserApi } from '../../../api/services/UserAPI';
import { UserAuthData } from '../../../models/UserAuthData';

export const signInByEmailAndPassword: AsyncThunk<void, UserAuthData, Record<string, never>> = createAsyncThunk(
  'user/signInByEmailAndPassword',
  async (userAuthData: UserAuthData): Promise<void> => {
    await UserApi.signInByEmailAndPassword(userAuthData);
  },
);

export const registerByEmailAndPassword: AsyncThunk<void, UserAuthData, Record<string, never>> = createAsyncThunk(
  'user/registerByEmailAndPassword',
  async (userAuthData: UserAuthData): Promise<void> => {
    await UserApi.registerByEmailAndPassword(userAuthData);
  },
);

export const signOut: AsyncThunk<void, void, Record<string, never>> = createAsyncThunk(
  'user/signOut',
  async (): Promise<void> => {
    await UserApi.signOut();
  },
);

export const observeUser: AsyncThunk<Unsubscribe, void, Record<string, never>> = createAsyncThunk(
  'user/observeUser',
  async (_: void, thunkAPI): Promise<Unsubscribe> => UserApi.observeUser(thunkAPI.dispatch),
);
