import { AsyncThunk, createAsyncThunk, Unsubscribe } from '@reduxjs/toolkit';
import {
  signIn,
  signOut,
  observeUser,
  register,
} from '../../api/services/UserAPI';
import { UserAuthData } from '../../models/UserAuthData';

export const loginUser: AsyncThunk<void, UserAuthData, {}> = createAsyncThunk(
  'user/loginUser',
  async (userAuthData: UserAuthData): Promise<void> => {
    await signIn(userAuthData);
    return;
  }
);

export const registerUser: AsyncThunk<
  void,
  UserAuthData,
  {}
> = createAsyncThunk(
  'user/registerUser',
  async (userAuthData: UserAuthData): Promise<void> => {
    await register(userAuthData);
    return;
  }
);

export const logoutUser: AsyncThunk<void, void, {}> = createAsyncThunk(
  'user/logoutUser',
  async (): Promise<void> => {
    return await signOut();
  }
);

export const observeUserState: AsyncThunk<
  Unsubscribe,
  void,
  {}
> = createAsyncThunk(
  'user/loginUserOnLoad',
  async (item, thunkAPI): Promise<Unsubscribe> => {
    return observeUser(thunkAPI.dispatch);
  }
);
