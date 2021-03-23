/**
 * Thunks, that add data to the store from API functions, that can return a value after fulfilled promise.
 *
 * 'API' and 'combined' thunks was divided to avoid cyclic dependencies.
 */

import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { PlanetAPI } from '../../../api/services/PlanetAPI';
import { Planet } from '../../../models/Planet';

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
  'planets/getPlanetsByPk',
  async (pkArray: string[]): Promise<Planet[]> => PlanetAPI.getPlanetsByPk(pkArray.map((pk) => Number(pk) || pk)),
);
