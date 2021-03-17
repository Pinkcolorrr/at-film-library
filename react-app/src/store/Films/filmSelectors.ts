import { Maybe } from 'yup/lib/types';
import { Character } from '../../models/Characters';
import { Film } from '../../models/Film';
import { Planet } from '../../models/Planet';
import { RootState } from '../rootReducer';

/** Select current film */
export const selectCurrentFilm = (state: RootState): Maybe<Film> => state.films.currentFilm.filmInfo;

/** Select all loaded films */
export const selectAllFilms = (state: RootState): Film[] => state.films.filmsList;

/** Select planets, that related with film */
export const selectRelatedPlanets = (state: RootState): Planet[] => state.films.currentFilm.relatedData.planets;

/** Select characters, that related with film */
export const selectRelatedCharacters = (state: RootState): Character[] =>
  state.films.currentFilm.relatedData.characters;

/** Select message if failed to get a movie */
export const selectRejectedFilmMsg = (state: RootState): string => state.films.currentFilm.rejectedMsg;
