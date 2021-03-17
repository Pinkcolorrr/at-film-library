/** Have to use "storeThunks",
 *  because with redux-toolkit imposible to use common dispatch from createAsyncThunk.
 *  So every time, when you want to dipatch something from API, you have to use createAsyncThunk and extraReducers
 */
import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { Film } from '../../../models/Film';

/** Add loaded films in store */
export const addFilmsInStore: AsyncThunk<Film[], Film[], Record<string, never>> = createAsyncThunk(
  'films/addFilmsInStore',
  async (FilmItem: Film[]): Promise<Film[]> => FilmItem,
);
