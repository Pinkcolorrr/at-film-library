import { AsyncThunk, createAsyncThunk, Unsubscribe } from '@reduxjs/toolkit';
import { FilmMapper } from '../../../api/mappers/FilmMapper';
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

export const addFilmInDb: AsyncThunk<any, Film, Record<string, never>> = createAsyncThunk(
  'films/addFilmInDb',
  async (film: Film): Promise<any> => FilmAPI.addFilm(FilmMapper.transformRequset(film)),
);

export const editFilmIdDb: AsyncThunk<void, Film, Record<string, never>> = createAsyncThunk(
  'films/editFilmIdDb',
  async (film: Film): Promise<void> => FilmAPI.editFilm(FilmMapper.transformRequset(film), film.id),
);

export const removeFilmFromDb: AsyncThunk<void, string, Record<string, never>> = createAsyncThunk(
  'films/removeFilmFromDb',
  async (id: string): Promise<void> => FilmAPI.removeFilm(id),
);
