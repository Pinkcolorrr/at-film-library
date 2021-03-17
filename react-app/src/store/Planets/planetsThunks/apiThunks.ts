import { AsyncThunk, createAsyncThunk, Unsubscribe } from '@reduxjs/toolkit';
import { Planet } from '../../../models/Planet';
import { PlanetAPI } from '../../../api/services/PlanetAPI';
import { RequestOptions } from '../../../models/RequestOptions';
import { RequestOptionsMapper } from '../../../api/mappers/RequestOptionsMapper';
import { setIsHaveMorePlanets } from './storeThunks';
import { AppDispatch } from '../../store';
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
    dispatch: AppDispatch;
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

/** Get planet by name from API */
export const getPlanetByName: AsyncThunk<Planet, string, Record<string, never>> = createAsyncThunk(
  'planets/getPlanetByName',
  async (name: string): Promise<Planet> => PlanetAPI.getPlanetByName(name),
);

/** Get planet by ID from API */
export const getPlanetById: AsyncThunk<Planet, string, Record<string, never>> = createAsyncThunk(
  'planets/getPlanetById',
  async (id: string): Promise<Planet> => PlanetAPI.getPlanetById(id),
);

/** Get all planets from API */
export const getAllPlanets: AsyncThunk<Planet[], void, Record<string, never>> = createAsyncThunk(
  'planets/getAllPlanets',
  async (): Promise<Planet[]> => PlanetAPI.getAllPlanets(),
);

/** Get planet by PK from API */
export const getPlanetsByPk: AsyncThunk<Planet[], string[], Record<string, never>> = createAsyncThunk(
  'films/getPlanetsByPk',
  async (pkArray: string[]): Promise<Planet[]> => PlanetAPI.getPlanetsByPk(pkArray.map((pk) => Number(pk) || pk)),
);
