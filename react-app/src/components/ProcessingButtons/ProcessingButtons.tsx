import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAdditionalContent, selectRootContent } from '../../store/CurrentContent/currentContentSelectors';
import { selectCurrentFilm } from '../../store/Films/filmSelectors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    padding: theme.spacing(2, 4),
    justifyContent: 'space-between',

    button: {
      marginRight: '10px',
    },
  },
  link: {
    width: '100%',
    textDecoration: 'none',
  },
}));

export function ProcessingButtons(): JSX.Element {
  const classes = useStyles();
  const additionalContent = useSelector(selectAdditionalContent);
  const rootContent = useSelector(selectRootContent);
  const film = useSelector(selectCurrentFilm);

  return (
    <div className={classes.root}>
      {rootContent === 'films list' && additionalContent ? (
        <>
          <Button color="secondary" variant="contained" fullWidth>
            Remove film
          </Button>
          <Link className={classes.link} to={`/films/${film?.id}/edit`}>
            <Button color="primary" variant="contained" fullWidth>
              Edit film
            </Button>
          </Link>
        </>
      ) : null}

      {rootContent === 'films list' ? (
        <Link className={classes.link} to="/films/add">
          <Button color="primary" variant="contained" fullWidth>
            Add film
          </Button>
        </Link>
      ) : null}
    </div>
  );
}
