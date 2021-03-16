import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { UserInfo } from '../../../models/UserInfo';

export const addUserInStore: AsyncThunk<UserInfo, UserInfo, Record<string, never>> = createAsyncThunk(
  'user/addUserInStore',
  async (user: UserInfo): Promise<UserInfo> => user,
);

export const removeUserFromStore: AsyncThunk<void, void, Record<string, never>> = createAsyncThunk(
  'user/removeUserFromStore',
  async (): Promise<void> => {},
);
