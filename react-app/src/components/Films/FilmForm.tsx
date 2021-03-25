import React, { useEffect, useState } from 'react';
import { Paper, FormGroup, Button } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { Prompt, Redirect } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { Film } from '../../models/Film';
import { Planet } from '../../models/Planet';
import { getNamesByPk, getPkByNames } from '../../utils/utils';
import { Character } from '../../models/Character';
import { useThunkDispatch } from '../../store/store';
import { selectAllPlanets } from '../../store/Planets/planetSelectors';
import { AccordionCheckList } from '../AccordionCheckList/AccordionCheckList';
import { selectAllCharacters } from '../../store/Characters/characterSelectors';
import { addFilmInDb, editFilmIdDb } from '../../store/Films/filmsThunks/combinedThunks';
import { filmFormStyles } from './FilmFormStyles';
import { getAllCharacters } from '../../store/Characters/charactersThunks/combinedThunks';
import { getAllPlanets } from '../../store/Planets/planetsThunks/combinedThunks';
import { CustomFormField } from '../CustomFormField/CustomFormField';

/** Validate schema for film form */
const filmSchema = yup.object({
  title: yup.string().required('title is required'),
  episodeId: yup.string().required('episodeId is required'),
  releaseDate: yup.string().required('releaseDate is required'),
});

interface FormData {
  title: string;
  episodeId: string;
  releaseDate: string;
  director: string;
  producer: string;
  openingCrawl: string;
}

interface Props {
  /** Initial form data */
  initData: FormData;
  /** Film id, if forType is edit */
  filmId?: string;
  /** Type of form */
  formType: 'add' | 'edit';
  /** List of related planets keys */
  selectedPlanetsPk: string[];
  /** List of related characters keys */
  selectedCharactersPk: string[];
}

/** Form for proccesing film */
export function FilmForm(props: Props): JSX.Element {
  const classes = filmFormStyles();
  const dispatch = useThunkDispatch();

  const [redirect, setRedirect] = useState(false);
  const [canDeactivate, setCanDeactivate] = useState(true);

  const planetsList = useSelector(selectAllPlanets);
  const charactersList = useSelector(selectAllCharacters);

  let checkedPlanetsPk: string[] = [];
  let checkedCharactersPk: string[] = [];

  /** Get related film data */
  useEffect(() => {
    dispatch(getAllPlanets());
    dispatch(getAllCharacters());
  }, []);

  /** Set checked planets PK in array */
  const getCheckedPlanets = (values: string[]) => {
    checkedPlanetsPk = getPkByNames<Planet>(planetsList, values);
  };

  /** Set checked charactgers PK in array */
  const getCheckedCharacters = (values: string[]) => {
    checkedCharactersPk = getPkByNames<Character>(charactersList, values);
  };

  /** Set dirty, if check list was touched */
  const setDirty = () => {
    setCanDeactivate(false);
  };

  const handleSubmit = (values: FormData) => {
    const film: Film = {
      title: values.title,
      releaseDate: new Date(values.releaseDate),
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
  };

  return (
    <Paper className={classes.root} elevation={0}>
      <Formik initialValues={props.initData} onSubmit={handleSubmit} validationSchema={filmSchema}>
        <Form
          onChange={() => {
            setCanDeactivate(false);
          }}
        >
          <FormGroup className={classes.formGroup}>
            <CustomFormField autoComplete="true" label="Film title" name="title" type="text" variant="outlined" />
          </FormGroup>
          <FormGroup className={classes.formGroup}>
            <CustomFormField label="Episode id" name="episodeId" type="number" variant="outlined" />
          </FormGroup>

          <FormGroup className={classes.formGroup}>
            <CustomFormField
              InputLabelProps={{
                shrink: true,
              }}
              label="Release date"
              name="releaseDate"
              type="date"
              variant="outlined"
            />
          </FormGroup>

          <FormGroup className={classes.formGroup}>
            <CustomFormField label="Director" name="director" type="text" variant="outlined" />
          </FormGroup>

          <FormGroup className={classes.formGroup}>
            <CustomFormField label="Producer" name="producer" type="text" variant="outlined" />
          </FormGroup>
          <FormGroup className={classes.formGroup}>
            <CustomFormField
              label="Opening crawl"
              name="openingCrawl"
              rows={5}
              type="text"
              variant="outlined"
              multiline
            />
          </FormGroup>
          <AccordionCheckList
            getCheckedValues={getCheckedPlanets}
            listOptions={planetsList.map((planet) => planet.name)}
            selected={getNamesByPk<Planet>(planetsList, props.selectedPlanetsPk)}
            setDirty={setDirty}
            title="Planets"
          />
          <AccordionCheckList
            getCheckedValues={getCheckedCharacters}
            listOptions={charactersList.map((character) => character.name)}
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
