import { Maybe } from 'yup/lib/types';
import { Character } from '../../models/Characters';
import { Film } from '../../models/Film';
import { Planet } from '../../models/Planet';
import { RootState } from '../rootReducer';

export const selectCurrentFilm = (state: RootState): Maybe<Film> => state.films.currentFilm.filmInfo;

export const selectFilms = (state: RootState): Film[] => state.films.filmsList;

export const selectRelatedPlanets = (state: RootState): Planet[] => state.films.currentFilm.relatedData.planets;

export const selectRelatedCharacters = (state: RootState): Character[] =>
  state.films.currentFilm.relatedData.characters;
