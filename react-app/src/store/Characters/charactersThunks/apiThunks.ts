/**
 * Thunks, that call API functions, that can't return value right after the calling.
 * For example, this thunks call observers functions.
 *
 * 'API' and 'combined' thunks was divided to avoid cyclic dependencies.
 */

import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { Unsubscribe } from 'redux';
import { RequestOptionsMapper } from '../../../api/mappers/RequestOptionsMapper';
import { RequestOptions } from '../../../models/RequestOptions';
import { setIsHaveMoreCharacters } from './storeThunks';
import { CharacterAPI } from '../../../api/services/CharacterAPI';
import { RootState } from '../../rootReducer';

/** Get initial characters from API */
export const getInitialCharacters: AsyncThunk<Unsubscribe, RequestOptions, Record<string, never>> = createAsyncThunk(
  'characters/getInitialCharacters',
  async (options: RequestOptions, thunkAPI): Promise<Unsubscribe> => {
    thunkAPI.dispatch(setIsHaveMoreCharacters(true));
    return CharacterAPI.getCharacters(RequestOptionsMapper.transofrmRequest(options), thunkAPI.dispatch);
  },
);

/** Get next portions of characters from API */
export const getNextCharacters: AsyncThunk<
  Unsubscribe,
  RequestOptions,
  {
    state: RootState;
  }
> = createAsyncThunk(
  'characters/getNextCharacters',
  async (options: RequestOptions, thunkAPI): Promise<Unsubscribe> =>
    CharacterAPI.getCharacters(
      RequestOptionsMapper.transofrmRequest(options),
      thunkAPI.dispatch,
      thunkAPI.getState().characters.lastDocId,
    ),
);
