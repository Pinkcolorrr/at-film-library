import { AsyncThunk, createAsyncThunk, Unsubscribe } from '@reduxjs/toolkit';
import { Planet } from '../../models/Planet';
import { PlanetAPI } from '../../api/services/PlanetAPI';

export const getInitialPlanets: AsyncThunk<Unsubscribe, number, Record<string, never>> = createAsyncThunk(
  'planets/getInitialPlanets',
  async (chunkSize: number, thunkAPI): Promise<Unsubscribe> =>
    PlanetAPI.getInitialPlanets(chunkSize, thunkAPI.dispatch),
);

export const getNextPlanets: AsyncThunk<Unsubscribe, number, Record<string, never>> = createAsyncThunk(
  'planets/getNextPlanets',
  async (chunkSize: number, thunkAPI): Promise<Unsubscribe> => PlanetAPI.getNextPlanets(chunkSize, thunkAPI.dispatch),
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
  async (): Promise<void> => {
    return;
  },
);

export const getPlanetById: AsyncThunk<Planet, string, Record<string, never>> = createAsyncThunk(
  'planets/getPlanetById',
  async (id: string): Promise<Planet> => PlanetAPI.getPlanetById(id),
);

export const getPlanetsByPk: AsyncThunk<Planet[], string[], Record<string, never>> = createAsyncThunk(
  'films/getPlanetsByPk',
  async (pkArray: string[]): Promise<Planet[]> => PlanetAPI.getPlanetsByPk(pkArray.map((pk) => Number(pk) || pk)),
);
