import { ListItem, ListItemText } from '@material-ui/core';
import List from '@material-ui/core/List';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { Unsubscribe } from 'redux';
import { Film } from '../../models/Film';
import { clearRootContent, setRootContent } from '../../store/CurrentContent/currentContentSlice';
import { selectFilms } from '../../store/Films/filmSelectors';
import { getAllFilms } from '../../store/Films/filmsThunks/apiThunks';
import { useThunkDispatch } from '../../store/store';

export function FilmsList(): JSX.Element {
  const dispatch = useThunkDispatch();
  const films = useSelector(selectFilms);
  const { url } = useRouteMatch();

  const filmsList = films.map((film: Film) => (
    <ListItem key={film.id} component={NavLink} to={`${url}/${film.id}/details`}>
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
    </div>
  );
}
