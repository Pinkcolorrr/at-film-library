/**
 * Thunks, that add data to the store from API functions, that can return a value after fulfilled promise.
 *
 * 'API' and 'combined' thunks was divided to avoid cyclic dependencies.
 */

import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { CharacterAPI } from '../../../api/services/CharacterAPI';
import { Character } from '../../../models/Character';

/** Get character by name from API */
export const getCharacterByName: AsyncThunk<Character, string, Record<string, never>> = createAsyncThunk(
  'characters/getCharacterByName',
  async (name: string): Promise<Character> => CharacterAPI.getCharacterByName(name),
);

/** Get character by ID from API */
export const getCharacterById: AsyncThunk<Character, string, Record<string, never>> = createAsyncThunk(
  'characters/getCharacterById',
  async (id: string): Promise<Character> => CharacterAPI.getCharacterById(id),
);

/** Get all characters from API */
export const getAllCharacters: AsyncThunk<Character[], void, Record<string, never>> = createAsyncThunk(
  'characters/getAllCharacters',
  async (): Promise<Character[]> => CharacterAPI.getAllCharacters(),
);

/** Get character by PK from API */
export const getCharactersByPk: AsyncThunk<Character[], string[], Record<string, never>> = createAsyncThunk(
  'films/getCharactersByPk',
  async (pkArray: string[]): Promise<Character[]> =>
    CharacterAPI.getCharactersByPk(pkArray.map((pk) => Number(pk) || pk)),
);
