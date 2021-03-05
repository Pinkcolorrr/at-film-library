import { AsyncThunk, createAsyncThunk, Unsubscribe } from '@reduxjs/toolkit';
import { CharacterAPI } from '../../api/services/CharacterAPI';
import { FilmAPI } from '../../api/services/FilmAPI';
import { PlanetAPI } from '../../api/services/PlanetsAPI';
import { Character } from '../../models/Characters';
import { Film } from '../../models/Film';
import { Planet } from '../../models/Planet';

export const getAllFilms: AsyncThunk<
  Unsubscribe,
  void,
  Record<string, never>
> = createAsyncThunk(
  'films/getAllFilms',
  async (_: void, thunkAPI): Promise<Unsubscribe> => {
    return FilmAPI.getAllFilms(thunkAPI.dispatch);
  }
);

export const addFilmsInStore: AsyncThunk<
  Film[],
  Film[],
  Record<string, never>
> = createAsyncThunk(
  'films/addFilmsInStore',
  async (Film: Film[]): Promise<Film[]> => {
    return Film;
  }
);

export const getFilmById: AsyncThunk<
  Film,
  string,
  Record<string, never>
> = createAsyncThunk(
  'films/getFilmById',
  async (id: string): Promise<Film> => {
    return await FilmAPI.getFilmById(id);
  }
);

export const getPlanetsByPk: AsyncThunk<
  Planet[],
  string[],
  Record<string, never>
> = createAsyncThunk(
  'films/getPlanetsByPk',
  async (pkArray: string[]): Promise<Planet[]> => {
    return await PlanetAPI.getPlanetsByPk(
      pkArray.map((pk) => Number(pk) || pk)
    );
  }
);

export const getCharactersByPk: AsyncThunk<
  Character[],
  string[],
  Record<string, never>
> = createAsyncThunk(
  'films/getCharactersByPk',
  async (pkArray: string[]): Promise<Character[]> => {
    return await CharacterAPI.getCharactersByPk(
      pkArray.map((pk) => Number(pk) || pk)
    );
  }
);
