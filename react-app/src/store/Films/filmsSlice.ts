import { createSlice } from '@reduxjs/toolkit';
import { Maybe } from 'yup/lib/types';
import { Character } from '../../models/Characters';
import { Film } from '../../models/Film';
import { Planet } from '../../models/Planet';
import { getPlanetsByPk } from '../Planets/planetsThunks';
import { RootState } from '../rootReducer';
import { addFilmsInStore, getCharactersByPk, getFilmById } from './filmsThunks';

export type films = {
  filmsList: Film[];
  currentFilm: {
    filmInfo: Maybe<Film>;
    relatedData: {
      planets: Planet[];
      characters: Character[];
    };
  };
};

const initialState: films = {
  filmsList: [],
  currentFilm: {
    filmInfo: null,
    relatedData: {
      planets: [],
      characters: [],
    },
  },
};

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    clearSelectedFilm(state) {
      state.currentFilm.filmInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFilmsInStore.fulfilled, (state, action) => {
        state.filmsList = action.payload;
      })
      .addCase(getFilmById.fulfilled, (state, action) => {
        state.currentFilm.filmInfo = action.payload;
      })
      .addCase(getPlanetsByPk.fulfilled, (state, action) => {
        state.currentFilm.relatedData.planets = action.payload;
      })
      .addCase(getCharactersByPk.fulfilled, (state, action) => {
        state.currentFilm.relatedData.characters = action.payload;
      });
  },
});

export const { clearSelectedFilm } = filmsSlice.actions;

export const selectCurrentFilm = (state: RootState): Maybe<Film> =>
  state.films.currentFilm.filmInfo;

export const selectFilms = (state: RootState): Film[] => state.films.filmsList;

export const selectRelatedPlanets = (state: RootState): Planet[] =>
  state.films.currentFilm.relatedData.planets;

export const selectRelatedCharacters = (state: RootState): Character[] =>
  state.films.currentFilm.relatedData.characters;

export const filmsReducer = filmsSlice.reducer;
