import React, { useEffect, useState } from 'react';
import { Paper, Theme, makeStyles, FormGroup, TextField, Button } from '@material-ui/core';
import { Formik, Form, Field, FieldProps } from 'formik';
import { Prompt, Redirect } from 'react-router';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Film } from '../../models/Film';
import { Planet } from '../../models/Planet';
import { getNamesByPk } from '../../utils/utils';
import { Character } from '../../models/Characters';
import { useThunkDispatch } from '../../store/store';
import { selectAllPlanets } from '../../store/Planets/planetSelectors';
import { getAllPlanets } from '../../store/Planets/planetsThunks/apiThunks';
import { AccordionCheckList } from '../AccordionCheckList/AccordionCheckList';
import { selectAllCharacters } from '../../store/Characters/characterSelectors';
import { getAllCharacters } from '../../store/Characters/charactersThunks/apiThunks';
import { addFilmInDb, editFilmIdDb } from '../../store/Films/filmsThunks/apiThunks';

type props = {
  initData: {
    title: string;
    episodeId: string;
    releaseDate: string;
    director: string;
    producer: string;
    openingCrawl: string;
  };
  filmId?: string;
  formType: 'add' | 'edit';
  selectedPlanetsPk: string[];
  selectedCharactersPk: string[];
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: '700px',
    padding: theme.spacing(5, 10),
  },
  formGroup: {
    marginBottom: '30px',
  },
  buttons: {
    marginTop: '20px',
    display: 'flex',
  },
  link: {
    width: '100%',
    textDecoration: 'none',
  },
}));

const filmSchema = yup.object({
  title: yup.string().required('title is required'),
  episodeId: yup.string().required('episodeId is required'),
  releaseDate: yup.string().required('releaseDate is required'),
});

export function FilmForm(props: props): JSX.Element {
  const classes = useStyles();
  const dispatch = useThunkDispatch();
  const [canDeactivate, setCanDeactivate] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const planetsList = useSelector(selectAllPlanets);
  const charactersList = useSelector(selectAllCharacters);
  let checkedPlanetsPk: string[] = [];
  let checkedCharactersPk: string[] = [];

  useEffect(() => {
    dispatch(getAllPlanets());
    dispatch(getAllCharacters());
  }, []);

  const getCheckedPlanets = (value: string[]) => {
    checkedPlanetsPk = [];
    planetsList.forEach((planet) => {
      value.forEach((item) => {
        if (planet.name === item) {
          checkedPlanetsPk.push(planet.pk);
        }
      });
    });
  };

  const getCheckedCharacters = (value: string[]) => {
    checkedCharactersPk = [];
    charactersList.forEach((character) => {
      value.forEach((item) => {
        if (character.name === item) {
          checkedCharactersPk.push(character.pk);
        }
      });
    });
  };

  const setDirty = () => {
    setCanDeactivate(false);
  };

  return (
    <Paper className={classes.root} elevation={0}>
      <Formik
        initialValues={props.initData}
        onSubmit={(values) => {
          const film: Film = {
            title: values.title,
            releaseDate: values.releaseDate,
            episodeId: Number(values.episodeId),
            director: values.director,
            producer: values.producer,
            openingCrawl: values.openingCrawl,
            created: new Date(),
            planetsPk: checkedPlanetsPk,
            charactersPk: checkedCharactersPk,
            speciesPk: [],
            starshipsPk: [],
            vehiclesPk: [],
            pk: uuidv4(),
            id: props.filmId || '',
          };
          dispatch(props.formType === 'add' ? addFilmInDb(film) : editFilmIdDb(film)).then(() => {
            setCanDeactivate(true);
            setRedirect(true);
          });
        }}
        validationSchema={filmSchema}
      >
        <Form
          onChange={() => {
            setCanDeactivate(false);
          }}
        >
          <FormGroup className={classes.formGroup}>
            <Field name="title">
              {({ field, meta }: FieldProps) => (
                <TextField
                  label="Film title"
                  type="text"
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error}
                />
              )}
            </Field>
          </FormGroup>
          <FormGroup className={classes.formGroup}>
            <Field name="episodeId">
              {({ field, meta }: FieldProps) => (
                <TextField
                  label="Episode id"
                  type="number"
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error}
                />
              )}
            </Field>
          </FormGroup>

          <FormGroup className={classes.formGroup}>
            <Field name="releaseDate">
              {({ field, meta }: FieldProps) => (
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Release date"
                  type="date"
                  variant="outlined"
                  {...field}
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error}
                />
              )}
            </Field>
          </FormGroup>

          <FormGroup className={classes.formGroup}>
            <Field name="director">
              {({ field }: FieldProps) => (
                <TextField label="Director" type="text" variant="outlined" fullWidth {...field} />
              )}
            </Field>
          </FormGroup>

          <FormGroup className={classes.formGroup}>
            <Field name="producer">
              {({ field }: FieldProps) => (
                <TextField label="Producer" type="text" variant="outlined" fullWidth {...field} />
              )}
            </Field>
          </FormGroup>
          <FormGroup className={classes.formGroup}>
            <Field name="openingCrawl">
              {({ field }: FieldProps) => (
                <TextField label="Opening crawl" rows={5} variant="outlined" multiline {...field} />
              )}
            </Field>
          </FormGroup>
          <AccordionCheckList
            array={planetsList.map((planet) => planet.name)}
            getCheckedValues={getCheckedPlanets}
            selected={getNamesByPk<Planet>(planetsList, props.selectedPlanetsPk)}
            setDirty={setDirty}
            title="Planets"
          />
          <AccordionCheckList
            array={charactersList.map((character) => character.name)}
            getCheckedValues={getCheckedCharacters}
            selected={getNamesByPk<Character>(charactersList, props.selectedCharactersPk)}
            setDirty={setDirty}
            title="Characters"
          />

          <div className={classes.buttons}>
            <Link className={classes.link} to="/films">
              <Button color="secondary" variant="contained" fullWidth>
                Cancel
              </Button>
            </Link>

            <Button color="primary" type="submit" variant="contained" fullWidth>
              Save
            </Button>
          </div>
        </Form>
      </Formik>

      <Prompt message="You have unsaved changes, are you sure you want to leave?" when={!canDeactivate} />
      {redirect ? <Redirect to={props.filmId ? `/films/${props.filmId}/details` : '/films'} /> : null}
    </Paper>
  );
}

FilmForm.defaultProps = {
  initData: {
    title: '',
    episodeId: '',
    releaseDate: '',
    director: '',
    producer: '',
    openingCrawl: '',
  },
  selectedPlanetsPk: [],
  selectedCharactersPk: [],
};
