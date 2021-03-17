/** Have to use "storeThunks",
 *  because it is imposible to use common dispatch from createAsyncThunk.
 *  So every time, when you want to dipatch something from API, you have to use createAsyncThunk and extraReducers
 */

import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { Planet } from '../../../models/Planet';

/** Set information about is there any data left on the server in store */
export const setIsHaveMorePlanets: AsyncThunk<boolean, boolean, Record<string, never>> = createAsyncThunk(
  'planets/setIsHaveMorePlanets',
  async (ishaveMoreData: boolean): Promise<boolean> => ishaveMoreData,
);

/** Push planets data is store */
export const pushPlanetsInStore: AsyncThunk<Planet[], Planet[], Record<string, never>> = createAsyncThunk(
  'planets/pushPlanetsInStore',
  async (planets: Planet[]): Promise<Planet[]> => planets,
);

/** Replace planets in store */
export const setPlanetsInStore: AsyncThunk<Planet[], Planet[], Record<string, never>> = createAsyncThunk(
  'planets/setPlanetsInStore',
  async (planets: Planet[]): Promise<Planet[]> => planets,
);

/** Remove planets from store */
export const removePlanetsFromStore: AsyncThunk<Planet[], Planet[], Record<string, never>> = createAsyncThunk(
  'planets/removePlanetsFromStore',
  async (planets: Planet[]): Promise<Planet[]> => planets,
);

/** Set last planet ID in store */
export const setLastPlanetId: AsyncThunk<string, string, Record<string, never>> = createAsyncThunk(
  'planets/setLastDocId',
  async (id: string): Promise<string> => id,
);
