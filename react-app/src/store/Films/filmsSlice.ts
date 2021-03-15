/* no-param-reassign was disabled, beacuse redux-toolkit use immer and don't mutate state */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Maybe } from 'yup/lib/types';
import { Character } from '../../models/Characters';
import { Film } from '../../models/Film';
import { Planet } from '../../models/Planet';
import { getPlanetsByPk } from '../Planets/planetsThunks/apiThunks';
import { getFilmById, getCharactersByPk } from './filmsThunks/apiThunks';
import { addFilmsInStore } from './filmsThunks/storeThunks';

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

export const filmsReducer = filmsSlice.reducer;
