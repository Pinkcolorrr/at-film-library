import { AsyncThunk, createAsyncThunk, Unsubscribe } from '@reduxjs/toolkit';
import { CharacterAPI } from '../../api/services/CharacterAPI';
import { FilmAPI } from '../../api/services/FilmAPI';
import { Character } from '../../models/Characters';
import { Film } from '../../models/Film';

export const getAllFilms: AsyncThunk<Unsubscribe, void, Record<string, never>> = createAsyncThunk(
  'films/getAllFilms',
  async (_: void, thunkAPI): Promise<Unsubscribe> => await FilmAPI.getAllFilms(thunkAPI.dispatch),
);

export const addFilmsInStore: AsyncThunk<Film[], Film[], Record<string, never>> = createAsyncThunk(
  'films/addFilmsInStore',
  async (Film: Film[]): Promise<Film[]> => await Film,
);

export const getFilmById: AsyncThunk<Film, string, Record<string, never>> = createAsyncThunk(
  'films/getFilmById',
  async (id: string): Promise<Film> => await FilmAPI.getFilmById(id),
);

export const getCharactersByPk: AsyncThunk<Character[], string[], Record<string, never>> = createAsyncThunk(
  'films/getCharactersByPk',
  async (pkArray: string[]): Promise<Character[]> =>
    await CharacterAPI.getCharactersByPk(pkArray.map((pk) => Number(pk) || pk)),
);
