/**
 *  Thunks, that add data in store.
 *
 *  Have to use "storeThunks", because it is imposible to use common dispatch from createAsyncThunk.
 *  So every time, when we needed to dipatch something from API, we have to use createAsyncThunk and extraReducers
 */

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
