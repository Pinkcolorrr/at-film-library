/** Have to use "storeThunks",
 *  because with redux-toolkit imposible to use common dispatch from createAsyncThunk.
 *  So every time, when you want to dipatch something from API, you have to use createAsyncThunk and extraReducers
 */
import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { Character } from '../../../models/Character';

/** Set information about is there any data left on the server in store */
export const setIsHaveMoreCharacters: AsyncThunk<boolean, boolean, Record<string, never>> = createAsyncThunk(
  'characters/setIsHaveMoreCharacters',
  async (ishaveMoreData: boolean): Promise<boolean> => ishaveMoreData,
);

/** Push characters data is store */
export const pushCharactersInStore: AsyncThunk<Character[], Character[], Record<string, never>> = createAsyncThunk(
  'characters/pushCharactersInStore',
  async (character: Character[]): Promise<Character[]> => character,
);

/** Replace characters in store */
export const setCharactersInStore: AsyncThunk<Character[], Character[], Record<string, never>> = createAsyncThunk(
  'characters/setCharactersInStore',
  async (character: Character[]): Promise<Character[]> => character,
);

/** Remove characters from store */
export const removeCharactersFromStore: AsyncThunk<Character[], Character[], Record<string, never>> = createAsyncThunk(
  'characters/removeCharactersFromStore',
  async (character: Character[]): Promise<Character[]> => character,
);

/** Set last character ID in store */
export const setLastCharacterId: AsyncThunk<string, string, Record<string, never>> = createAsyncThunk(
  'characters/setLastCharacterId',
  async (id: string): Promise<string> => id,
);
