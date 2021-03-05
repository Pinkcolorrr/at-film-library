import { Button, Divider, makeStyles } from '@material-ui/core';
import { ListItem, ListItemText } from '@material-ui/core';
import List from '@material-ui/core/List';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useRouteMatch } from 'react-router-dom';
import { Film } from '../../models/Film';
import { selectFilm, selectFilms } from '../../store/Films/filmsSlice';
import { getAllFilms } from '../../store/Films/filmsThunks';
import { useThunkDispatch } from '../../store/store';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
  },

  filmsList: {
    overflowY: 'scroll',
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
  },
  activeLink: {
    backgroundColor: theme.palette.grey[300],
    textAlign: 'center',
  },
  transparentColor: {
    color: 'transparent',
  },

  processingButtons: {
    display: 'flex',
    width: '100%',
    padding: theme.spacing(2, 4),
    justifyContent: 'space-between',
  },

  saveButtons: {
    display: 'flex',

    '&>:first-child': {
      marginRight: '10px',
    },
  },
}));

export function FilmsList(): JSX.Element {
  const classes = useStyles();
  const dispatch = useThunkDispatch();
  const films = useSelector(selectFilms);
  const { url } = useRouteMatch();
  const film = useSelector(selectFilm);

  const filmsList = films.map((film: Film) => (
    <ListItem
      key={film.id}
      button
      component={NavLink}
      to={`${url}/${film.id}/details`}
    >
      <ListItemText primary={film.title} />
    </ListItem>
  ));

  // TODO resolve type problems!!!
  useEffect(() => {
    let unsubscribe: any;

    dispatch(getAllFilms()).then(({ payload }) => {
      unsubscribe = payload;
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <div className={classes.filmsList}>
        <List>
          <ListItem className={classes.activeLink}>
            <ListItemText
              primary={
                film ? (
                  film.title
                ) : (
                  <span className={classes.transparentColor}>text</span>
                )
              }
            />
          </ListItem>
          {filmsList}
        </List>
      </div>
      <Divider />

      {film ? (
        <div className={classes.processingButtons}>
          <Button variant="contained" color="secondary">
            Remove film
          </Button>

          <div className={classes.saveButtons}>
            <Link to={`/films/${film.id}/edit`} className={classes.link}>
              <Button variant="contained" color="primary">
                Edit film
              </Button>
            </Link>

            <Link to="/films/add" className={classes.link}>
              <Button variant="contained" color="primary">
                Add film
              </Button>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
