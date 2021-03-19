/**
 * Thunks, that add data to the store from API functions, that can return a value after fulfilled promise.
 */

import { AsyncThunk, createAsyncThunk, Unsubscribe } from '@reduxjs/toolkit';
import { FilmMapper } from '../../../api/mappers/FilmMapper';
import { FilmAPI } from '../../../api/services/FilmAPI';
import { Film } from '../../../models/Film';

/** Get all film from API */
export const getAllFilms: AsyncThunk<Unsubscribe, void, Record<string, never>> = createAsyncThunk(
  'films/getAllFilms',
  async (_: void, thunkAPI): Promise<Unsubscribe> => FilmAPI.getAllFilms(thunkAPI.dispatch),
);

/** Get film by ID */
export const getFilmById: AsyncThunk<Film, string, Record<string, never>> = createAsyncThunk(
  'films/getFilmById',
  async (id: string): Promise<Film> => FilmAPI.getFilmById(id),
);

/** Add new film in db */
export const addFilmInDb: AsyncThunk<any, Film, Record<string, never>> = createAsyncThunk(
  'films/addFilmInDb',
  async (film: Film): Promise<any> => FilmAPI.addFilm(FilmMapper.transformRequset(film)),
);

/** Edit existed film in db */
export const editFilmIdDb: AsyncThunk<void, Film, Record<string, never>> = createAsyncThunk(
  'films/editFilmIdDb',
  async (film: Film): Promise<void> => FilmAPI.editFilm(FilmMapper.transformRequset(film), film.id),
);

/** Remove film from db */
export const removeFilmFromDb: AsyncThunk<void, string, Record<string, never>> = createAsyncThunk(
  'films/removeFilmFromDb',
  async (id: string): Promise<void> => FilmAPI.removeFilm(id),
);
