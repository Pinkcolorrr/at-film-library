/* no-param-reassign was disabled, beacuse redux-toolkit use immer and don't mutate state */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Maybe } from 'yup/lib/types';
import { Character } from '../../models/Characters';
import { Film } from '../../models/Film';
import { Planet } from '../../models/Planet';
import { getFilmById } from './filmsThunks/apiThunks';
import { addFilmsInStore } from './filmsThunks/storeThunks';
import { getPlanetsByPk } from '../Planets/planetsThunks/apiThunks';
import { getCharactersByPk } from '../Characters/charactersThunks/apiThunks';

export type films = {
  /** List of all loaded films */
  filmsList: Film[];
  currentFilm: {
    /** Information about planet */
    filmInfo: Maybe<Film>;
    /** Msg if failed to get movie */
    rejectedMsg: string;
    /** Data, that relate with film */
    relatedData: {
      /** Array with related planets */
      planets: Planet[];
      /** Array with related characters */
      characters: Character[];
    };
  };
};

const initialState: films = {
  filmsList: [],
  currentFilm: {
    filmInfo: null,
    rejectedMsg: '',
    relatedData: {
      planets: [],
      characters: [],
    },
  },
};

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {},
  /** Extra reducers for proccesing thunks results */
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
      })
      .addCase(getFilmById.rejected, (state) => {
        state.currentFilm.rejectedMsg = 'Failed to get movie';
      });
  },
});

export const filmsReducer = filmsSlice.reducer;
