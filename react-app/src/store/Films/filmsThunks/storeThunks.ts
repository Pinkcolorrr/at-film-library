import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { Film } from '../../../models/Film';

export const addFilmsInStore: AsyncThunk<Film[], Film[], Record<string, never>> = createAsyncThunk(
  'films/addFilmsInStore',
  async (FilmItem: Film[]): Promise<Film[]> => FilmItem,
);
