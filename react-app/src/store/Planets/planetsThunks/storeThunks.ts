import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { Planet } from '../../../models/Planet';

export const setIsHaveMorePlanets: AsyncThunk<boolean, boolean, Record<string, never>> = createAsyncThunk(
  'planets/setIsHaveMorePlanets',
  async (ishaveMoreData: boolean): Promise<boolean> => ishaveMoreData,
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

export const setLastPlanetId: AsyncThunk<string, string, Record<string, never>> = createAsyncThunk(
  'planets/setLastDocId',
  async (id: string): Promise<string> => id,
);
