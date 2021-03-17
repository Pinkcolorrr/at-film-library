import React, { useEffect } from 'react';
import { Unsubscribe } from 'redux';
import { useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import { NavLink, Redirect, useRouteMatch } from 'react-router-dom';
import { CircularProgress, ListItem, ListItemText } from '@material-ui/core';
import { Film } from '../../models/Film';
import { useThunkDispatch } from '../../store/store';
import { selectCurrentFilm, selectAllFilms } from '../../store/Films/filmSelectors';
import { getAllFilms } from '../../store/Films/filmsThunks/apiThunks';
import { clearRootContent, setRootContent } from '../../store/CurrentContent/currentContentSlice';
import { asideListClasses } from '../../styles/AsideListStyles';

/** List of films */
export function FilmsList(): JSX.Element {
  const classes = asideListClasses();
  const dispatch = useThunkDispatch();
  const { url } = useRouteMatch();

  const currentFilm = useSelector(selectCurrentFilm);
  const films = useSelector(selectAllFilms);

  /**
   * Get films list
   * Save unsubscribe function
   * Set root contnet
   */
  useEffect(() => {
    let unsubscribe: Unsubscribe;

    dispatch(getAllFilms()).then(({ payload }) => {
      unsubscribe = payload as Unsubscribe;
    });

    dispatch(setRootContent('films list'));

    /** Clear content and call unsubscribe */
    return () => {
      dispatch(clearRootContent());
      unsubscribe();
    };
  }, []);

  const filmsList = films.map((film: Film) => (
    <ListItem key={film.id} component={NavLink} to={`${url}/${film.id}/details`} button>
      <ListItemText primary={film.title} />
    </ListItem>
  ));

  return (
    <div className={classes.list}>
      <List>
        {films.length ? (
          filmsList
        ) : (
          <ListItem className={classes.circularProgress}>
            <CircularProgress />
          </ListItem>
        )}
      </List>
      {currentFilm ? <Redirect from="/films" to={`/films/${currentFilm.id}/details`} exact /> : null}
    </div>
  );
}
