import { Film } from '../../models/Film';
import { RootState } from '../rootReducer';

/** Select current film */
export const selectCurrentFilm = (state: RootState): Film | null => state.films.currentFilm.filmInfo;

/** Select all loaded films */
export const selectAllFilms = (state: RootState): Film[] => state.films.filmsList;

/** Select message if failed to get a movie */
export const selectIsFilmRejected = (state: RootState): boolean => state.films.currentFilm.isRejected;
