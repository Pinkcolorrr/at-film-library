import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { Character } from '../../../models/Characters';

export const setIsHaveMoreCharacters: AsyncThunk<boolean, boolean, Record<string, never>> = createAsyncThunk(
  'characters/setIsHaveMoreCharacters',
  async (ishaveMoreData: boolean): Promise<boolean> => ishaveMoreData,
);

export const pushCharactersInStore: AsyncThunk<Character[], Character[], Record<string, never>> = createAsyncThunk(
  'characters/pushCharactersInStore',
  async (character: Character[]): Promise<Character[]> => character,
);

export const setCharactersInStore: AsyncThunk<Character[], Character[], Record<string, never>> = createAsyncThunk(
  'characters/setCharactersInStore',
  async (character: Character[]): Promise<Character[]> => character,
);

export const removeCharactersFromStore: AsyncThunk<Character[], Character[], Record<string, never>> = createAsyncThunk(
  'characters/removeCharactersFromStore',
  async (character: Character[]): Promise<Character[]> => character,
);

export const setLastCharacterId: AsyncThunk<string, string, Record<string, never>> = createAsyncThunk(
  'characters/setLastCharacterId',
  async (id: string): Promise<string> => id,
);
