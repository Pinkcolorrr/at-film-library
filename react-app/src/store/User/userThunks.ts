import { AsyncThunk, createAsyncThunk, Unsubscribe } from '@reduxjs/toolkit';
import { UserApi } from '../../api/services/UserAPI';
import { UserAuthData } from '../../models/UserAuthData';
import { UserInfo } from '../../models/UserInfo';

/* Thunks for requsets to API */

export const signInByEmailAndPassword: AsyncThunk<
  void,
  UserAuthData,
  Record<string, never>
> = createAsyncThunk(
  'user/signInByEmailAndPassword',
  async (userAuthData: UserAuthData): Promise<void> => {
    await UserApi.signInByEmailAndPassword(userAuthData);
    return;
  }
);

export const registerByEmailAndPassword: AsyncThunk<
  void,
  UserAuthData,
  Record<string, never>
> = createAsyncThunk(
  'user/registerByEmailAndPassword',
  async (userAuthData: UserAuthData): Promise<void> => {
    await UserApi.registerByEmailAndPassword(userAuthData);
    return;
  }
);

export const signOut: AsyncThunk<
  void,
  void,
  Record<string, never>
> = createAsyncThunk(
  'user/signOut',
  async (): Promise<void> => {
    await UserApi.signOut();
    return;
  }
);

export const observeUser: AsyncThunk<
  Unsubscribe,
  void,
  Record<string, never>
> = createAsyncThunk(
  'user/observeUser',
  async (_: void, thunkAPI): Promise<Unsubscribe> => {
    return UserApi.observeUser(thunkAPI.dispatch);
  }
);

/* Thunks for changing store data */

export const addUserInStore: AsyncThunk<
  UserInfo,
  UserInfo,
  Record<string, never>
> = createAsyncThunk(
  'user/addUserInStore',
  async (user: UserInfo): Promise<UserInfo> => {
    return user;
  }
);

export const removeUserFromStore: AsyncThunk<
  void,
  void,
  Record<string, never>
> = createAsyncThunk(
  'user/removeUserFromStore',
  async (): Promise<void> => {
    return;
  }
);
