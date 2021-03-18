import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAdditionalContent, selectRootContent } from '../../store/CurrentContent/currentContentSelectors';
import { selectCurrentFilm } from '../../store/Films/filmSelectors';
import { processingButtonsStyles } from './ProcessingButtonsStyles';
import { useThunkDispatch } from '../../store/store';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import { removeFilmFromDb } from '../../store/Films/filmsThunks/apiThunks';

/** Buttons for control navigation under films processing pages  */
export function ProcessingButtons(): JSX.Element {
  const classes = processingButtonsStyles();

  const [redirect, setRedirect] = useState(false);

  const additionalContent = useSelector(selectAdditionalContent);
  const rootContent = useSelector(selectRootContent);
  const film = useSelector(selectCurrentFilm);
  const dispatch = useThunkDispatch();

  /** Remove film after dialog confirm  */
  const removeFilm = () => {
    if (film) {
      dispatch(removeFilmFromDb(film.id));
      setRedirect(true);
    }
  };

  return (
    <div className={classes.root}>
      {rootContent === 'films list' && additionalContent && (
        <>
          <ConfirmDialog
            buttonText="Remove film"
            dialogText={`Are you sure you want to remove ${film?.title}`}
            dialogTitle="Remove film?"
            onAgreeAction={removeFilm}
          />

          <Link className={classes.link} to={`/films/${film?.id}/edit`}>
            <Button color="primary" variant="contained" fullWidth>
              Edit film
            </Button>
          </Link>
        </>
      )}
      {rootContent === 'films list' && (
        <Link className={classes.link} to="/films/add">
          <Button color="primary" variant="contained" fullWidth>
            Add film
          </Button>
        </Link>
      )}
      {redirect ? <Redirect to="/films" exact /> : null}
    </div>
  );
}
