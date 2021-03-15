import React, { useEffect } from 'react';
import { Unsubscribe } from 'redux';
import { useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import { NavLink, Redirect, useLocation, useRouteMatch } from 'react-router-dom';
import { ListItem, ListItemText } from '@material-ui/core';
import { Film } from '../../models/Film';
import { useThunkDispatch } from '../../store/store';
import { selectCurrentFilm, selectFilms } from '../../store/Films/filmSelectors';
import { getAllFilms } from '../../store/Films/filmsThunks/apiThunks';
import { clearRootContent, setRootContent } from '../../store/CurrentContent/currentContentSlice';

export function FilmsList(): JSX.Element {
  const location = useLocation();
  const dispatch = useThunkDispatch();
  const { url } = useRouteMatch();

  const currentFilm = useSelector(selectCurrentFilm);
  const films = useSelector(selectFilms);

  const filmsList = films.map((film: Film) => (
    <ListItem key={film.id} component={NavLink} to={`${url}/${film.id}/details`} button>
      <ListItemText primary={film.title} />
    </ListItem>
  ));

  useEffect(() => {
    let unsubscribe: Unsubscribe;

    dispatch(getAllFilms()).then(({ payload }) => {
      unsubscribe = payload as Unsubscribe;
    });

    dispatch(setRootContent('Films list'));

    return () => {
      dispatch(clearRootContent());
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div>
      <List>{filmsList}</List>
      {currentFilm && !location.pathname.includes('details') ? (
        <Redirect from="/films" to={`/films/${currentFilm.id}/details`} />
      ) : null}
    </div>
  );
}
