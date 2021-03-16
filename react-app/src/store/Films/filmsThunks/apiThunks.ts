import { AsyncThunk, createAsyncThunk, Unsubscribe } from '@reduxjs/toolkit';
import { FilmAPI } from '../../../api/services/FilmAPI';
import { Film } from '../../../models/Film';

export const getAllFilms: AsyncThunk<Unsubscribe, void, Record<string, never>> = createAsyncThunk(
  'films/getAllFilms',
  async (_: void, thunkAPI): Promise<Unsubscribe> => FilmAPI.getAllFilms(thunkAPI.dispatch),
);

export const getFilmById: AsyncThunk<Film, string, Record<string, never>> = createAsyncThunk(
  'films/getFilmById',
  async (id: string): Promise<Film> => FilmAPI.getFilmById(id),
);
