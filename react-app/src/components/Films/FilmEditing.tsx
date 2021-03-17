import React, { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectCurrentFilm } from '../../store/Films/filmSelectors';
import { getFilmById } from '../../store/Films/filmsThunks/apiThunks';
import { useThunkDispatch } from '../../store/store';
import { FilmForm } from './FilmForm';
import { setAdditionalContent, setRootContent } from '../../store/CurrentContent';

type props = {
  match: { params: { id: string } };
};

export function FilmEditing(props: props): JSX.Element {
  const { id } = props.match.params;
  const film = useSelector(selectCurrentFilm);
  const dispatch = useThunkDispatch();

  useEffect(() => {
    dispatch(getFilmById(id));
    if (film) {
      dispatch(setRootContent('edit film'));
      dispatch(setAdditionalContent(film.title));
    }
  }, []);

  return film ? (
    <FilmForm
      filmId={film.id}
      formType="edit"
      initData={{
        title: film.title,
        episodeId: String(film.episodeId),
        releaseDate: film.releaseDate,
        director: film.director,
        producer: film.producer,
        openingCrawl: film.openingCrawl,
      }}
      selectedCharactersPk={film.charactersPk}
      selectedPlanetsPk={film.planetsPk}
    />
  ) : (
    <CircularProgress />
  );
}
