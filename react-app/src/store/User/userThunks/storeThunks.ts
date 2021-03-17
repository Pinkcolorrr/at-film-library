import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { UserInfo } from '../../../models/UserInfo';

/** Add user in store */
export const addUserInStore: AsyncThunk<UserInfo, UserInfo, Record<string, never>> = createAsyncThunk(
  'user/addUserInStore',
  async (user: UserInfo): Promise<UserInfo> => user,
);

/** Remove user from store */
export const removeUserFromStore: AsyncThunk<void, void, Record<string, never>> = createAsyncThunk(
  'user/removeUserFromStore',
  async (): Promise<void> => {},
);
