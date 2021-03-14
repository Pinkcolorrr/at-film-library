import { AsyncThunk, createAsyncThunk, Unsubscribe } from '@reduxjs/toolkit';
import { Planet } from '../../models/Planet';
import { PlanetAPI } from '../../api/services/PlanetAPI';
import { RequsetOptions } from '../../models/RequsetOptions';

export const setIsHaveMoreData: AsyncThunk<boolean, boolean, Record<string, never>> = createAsyncThunk(
  'planets/setIsHaveMoreData',
  async (ishaveMoreData: boolean): Promise<boolean> => ishaveMoreData,
);

export const getInitialPlanets: AsyncThunk<Unsubscribe, RequsetOptions, Record<string, never>> = createAsyncThunk(
  'planets/getInitialPlanets',
  async (options: RequsetOptions, thunkAPI): Promise<Unsubscribe> => {
    thunkAPI.dispatch(setIsHaveMoreData(true));
    return PlanetAPI.getInitialPlanets(options.chunkSize, thunkAPI.dispatch, options.sortTarget);
  },
);

export const getNextPlanets: AsyncThunk<Unsubscribe, number, Record<string, never>> = createAsyncThunk(
  'planets/getNextPlanets',
  async (chunkSize: number, thunkAPI): Promise<Unsubscribe> => PlanetAPI.getNextPlanets(chunkSize, thunkAPI.dispatch),
);

export const getPlanetByName: AsyncThunk<Planet, string, Record<string, never>> = createAsyncThunk(
  'planets/getPlanetByName',
  async (name: string): Promise<Planet> => PlanetAPI.getPlanetByName(name),
);

export const pushPlanetsInStore: AsyncThunk<Planet[], Planet[], Record<string, never>> = createAsyncThunk(
  'planets/pushPlanetsInStore',
  async (planets: Planet[]): Promise<Planet[]> => planets,
);

export const setPlanetsInStore: AsyncThunk<Planet[], Planet[], Record<string, never>> = createAsyncThunk(
  'planets/setPlanetsInStore',
  async (planets: Planet[]): Promise<Planet[]> => planets,
);

export const removePlanetsFromStore: AsyncThunk<Planet[], Planet[], Record<string, never>> = createAsyncThunk(
  'planets/removePlanetsFromStore',
  async (planets: Planet[]): Promise<Planet[]> => planets,
);

export const clearPlanetsList: AsyncThunk<void, void, Record<string, never>> = createAsyncThunk(
  'planets/clearPlanetsList',
  async (): Promise<void> => {},
);

export const getPlanetById: AsyncThunk<Planet, string, Record<string, never>> = createAsyncThunk(
  'planets/getPlanetById',
  async (id: string): Promise<Planet> => PlanetAPI.getPlanetById(id),
);

export const getPlanetsByPk: AsyncThunk<Planet[], string[], Record<string, never>> = createAsyncThunk(
  'films/getPlanetsByPk',
  async (pkArray: string[]): Promise<Planet[]> => PlanetAPI.getPlanetsByPk(pkArray.map((pk) => Number(pk) || pk)),
);
