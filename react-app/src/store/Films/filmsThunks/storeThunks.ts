/**
 *  Thunks, that add data in store.
 *
 *  Have to use "storeThunks", because it is imposible to use common dispatch from createAsyncThunk.
 *  So every time, when we needed to dipatch something from API, we have to use createAsyncThunk and extraReducers
 */

import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { Film } from '../../../models/Film';

/** Add loaded films in store */
export const addFilmsInStore: AsyncThunk<Film[], Film[], Record<string, never>> = createAsyncThunk(
  'films/addFilmsInStore',
  async (FilmItem: Film[]): Promise<Film[]> => FilmItem,
);
