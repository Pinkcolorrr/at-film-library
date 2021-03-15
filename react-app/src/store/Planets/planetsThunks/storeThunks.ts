import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { Planet } from '../../../models/Planet';

export const setIsHaveMoreData: AsyncThunk<boolean, boolean, Record<string, never>> = createAsyncThunk(
  'planets/setIsHaveMoreData',
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
