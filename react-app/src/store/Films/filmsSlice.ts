import { createSlice } from '@reduxjs/toolkit';
import { Maybe } from 'yup/lib/types';
import { Character } from '../../models/Characters';
import { Film } from '../../models/Film';
import { Planet } from '../../models/Planet';
import { RootState } from '../rootReducer';
import {
  addFilmsInStore,
  getCharactersByPk,
  getFilmById,
  getPlanetsByPk,
} from './filmsThunks';

export type films = {
  filmsList: Film[];
  relatedData: {
    planets: Planet[];
    characters: Character[];
  };
  selectedFilm: Maybe<Film>;
};

const initialState: films = {
  filmsList: [],
  relatedData: {
    planets: [],
    characters: [],
  },
  selectedFilm: null,
};

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    clearSelectedFilm(state) {
      state.selectedFilm = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFilmsInStore.fulfilled, (state, action) => {
        state.filmsList = action.payload;
      })
      .addCase(getFilmById.fulfilled, (state, action) => {
        state.selectedFilm = action.payload;
      })
      .addCase(getPlanetsByPk.fulfilled, (state, action) => {
        state.relatedData.planets = action.payload;
      })
      .addCase(getCharactersByPk.fulfilled, (state, action) => {
        state.relatedData.characters = action.payload;
      });
  },
});

export const { clearSelectedFilm } = filmsSlice.actions;

export const selectFilm = (state: RootState): Maybe<Film> =>
  state.films.selectedFilm;

export const selectFilms = (state: RootState): Film[] => state.films.filmsList;

export const selectRelatedPlanets = (state: RootState): Planet[] =>
  state.films.relatedData.planets;

export const selectRelatedCharacters = (state: RootState): Character[] =>
  state.films.relatedData.characters;

export const filmsReducer = filmsSlice.reducer;
