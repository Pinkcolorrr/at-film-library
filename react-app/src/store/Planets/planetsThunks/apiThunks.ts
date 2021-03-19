/**
 * Thunks, that call API functions, that can't return value right after the calling.
 * For example, this thunks call observers functions.
 *
 * 'API' and 'combined' thunks was divided to avoid cyclic dependencies.
 */

import { AsyncThunk, createAsyncThunk, Unsubscribe } from '@reduxjs/toolkit';
import { PlanetAPI } from '../../../api/services/PlanetAPI';
import { RequestOptions } from '../../../models/RequestOptions';
import { RequestOptionsMapper } from '../../../api/mappers/RequestOptionsMapper';
import { setIsHaveMorePlanets } from './storeThunks';
import { RootState } from '../../rootReducer';

/** Get initial planets from API */
export const getInitialPlanets: AsyncThunk<Unsubscribe, RequestOptions, Record<string, never>> = createAsyncThunk(
  'planets/getInitialPlanets',
  async (options: RequestOptions, thunkAPI): Promise<Unsubscribe> => {
    thunkAPI.dispatch(setIsHaveMorePlanets(true));
    return PlanetAPI.getInitialPlanets(RequestOptionsMapper.transofrmRequest(options), thunkAPI.dispatch);
  },
);

/** Get next portions of planets from API */
export const getNextPlanets: AsyncThunk<
  Unsubscribe,
  RequestOptions,
  {
    state: RootState;
  }
> = createAsyncThunk(
  'planets/getNextPlanets',
  async (options: RequestOptions, thunkAPI): Promise<Unsubscribe> =>
    PlanetAPI.getNextPlanets(
      RequestOptionsMapper.transofrmRequest(options),
      thunkAPI.dispatch,
      thunkAPI.getState().planets.lastDocId,
    ),
);
