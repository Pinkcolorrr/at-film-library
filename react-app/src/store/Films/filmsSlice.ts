/* no-param-reassign was disabled, beacuse redux-toolkit use immer and don't mutate state */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Film } from '../../models/Film';
import { getFilmById } from './filmsThunks/combinedThunks';
import { addFilmsInStore } from './filmsThunks/storeThunks';

interface FilmsState {
  /** List of all loaded films */
  filmsList: Film[];
  currentFilm: {
    /** Information about planet */
    filmInfo: Film | null;
    /** Check, if failed to get film */
    isRejected: boolean;
    /** Data, that relate with film */
  };
}

const initialState: FilmsState = {
  filmsList: [],
  currentFilm: {
    filmInfo: null,
    isRejected: false,
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
        state.currentFilm.isRejected = false;
      })
      .addCase(getFilmById.rejected, (state) => {
        state.currentFilm.isRejected = true;
      });
  },
});

export const filmsReducer = filmsSlice.reducer;
