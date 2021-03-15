import { AsyncThunk, createAsyncThunk, Unsubscribe } from '@reduxjs/toolkit';
import { CharacterAPI } from '../../../api/services/CharacterAPI';
import { FilmAPI } from '../../../api/services/FilmAPI';
import { Character } from '../../../models/Characters';
import { Film } from '../../../models/Film';

export const getAllFilms: AsyncThunk<Unsubscribe, void, Record<string, never>> = createAsyncThunk(
  'films/getAllFilms',
  async (_: void, thunkAPI): Promise<Unsubscribe> => FilmAPI.getAllFilms(thunkAPI.dispatch),
);

export const getFilmById: AsyncThunk<Film, string, Record<string, never>> = createAsyncThunk(
  'films/getFilmById',
  async (id: string): Promise<Film> => FilmAPI.getFilmById(id),
);

export const getCharactersByPk: AsyncThunk<Character[], string[], Record<string, never>> = createAsyncThunk(
  'films/getCharactersByPk',
  async (pkArray: string[]): Promise<Character[]> =>
    CharacterAPI.getCharactersByPk(pkArray.map((pk) => Number(pk) || pk)),
);
