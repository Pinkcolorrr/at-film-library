import React, { useEffect } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import moment from 'moment';
import { TableRows } from '../../models/TableRows';
import { getCharactersByPk } from '../../store/Characters/charactersThunks/apiThunks';
import {
  clearAdditionalContent,
  setAdditionalContent,
  setRootContent,
} from '../../store/CurrentContent/currentContentSlice';
import {
  selectCurrentFilm,
  selectRelatedPlanets,
  selectRelatedCharacters,
  selectRejectedFilmMsg,
} from '../../store/Films/filmSelectors';
import { getFilmById } from '../../store/Films/filmsThunks/apiThunks';
import { getPlanetsByPk } from '../../store/Planets/planetsThunks/apiThunks';
import { useThunkDispatch } from '../../store/store';
import { detailsPageClasses } from '../../styles/DetailPageStyles';

/** Displaying table with film information */
export function FilmDetails(): JSX.Element {
  const classes = detailsPageClasses();
  const { id } = useParams<{ id: string }>();
  const dispatch = useThunkDispatch();
  const film = useSelector(selectCurrentFilm);
  const planets = useSelector(selectRelatedPlanets);
  const characters = useSelector(selectRelatedCharacters);
  const rejectedMsg = useSelector(selectRejectedFilmMsg);

  /** Get film  */
  useEffect(() => {
    dispatch(getFilmById(id));
  }, [id]);

  /**
   * Set content for aside title
   * Get related data, when film loaded
   */
  useEffect(() => {
    if (film) {
      dispatch(getCharactersByPk(film.charactersPk));
      dispatch(getPlanetsByPk(film.planetsPk));
      dispatch(setAdditionalContent(film.title));
      dispatch(setRootContent('films list'));
    }
    return () => {
      dispatch(clearAdditionalContent());
    };
  }, [film]);

  const rows: TableRows[] = film
    ? [
        {
          key: 'Title',
          value: film.title,
        },
        {
          key: 'Episode Id',
          value: String(film.episodeId),
        },
        {
          key: 'Release date',
          value: moment(film.releaseDate).format('YYYY-MM-DD'),
        },
        {
          key: 'Director',
          value: film.director,
        },
        {
          key: 'Producer',
          value: film.producer,
        },
        {
          key: 'Opening crawl',
          value: film.openingCrawl,
        },
      ]
    : [];

  const relatedRows = [
    {
      key: 'Planets',
      value: (
        <Accordion>
          <AccordionSummary aria-controls="planets-content" id="planets-header">
            Planets
          </AccordionSummary>
          <AccordionDetails>
            <List className={classes.fullWidth}>
              {planets.map((planet) => (
                <ListItem
                  key={planet.pk}
                  className={classes.fullWidth}
                  component={NavLink}
                  to={`/planets/${planet.id}/details`}
                  button
                >
                  <ListItemText primary={planet.name} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ),
    },
    {
      key: 'Characters',
      value: (
        <Accordion>
          <AccordionSummary aria-controls="characters-content" id="characters-header">
            Characters
          </AccordionSummary>
          <AccordionDetails>
            <List className={classes.fullWidth}>
              {characters.map((character) => (
                <ListItem
                  key={character.pk}
                  className={classes.fullWidth}
                  component={NavLink}
                  to={`/characters/${character.id}/details`}
                  button
                >
                  <ListItemText primary={character.name} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ),
    },
  ];

  return film && film.id === id ? (
    <TableContainer component={Paper} elevation={0}>
      <Table aria-label="film table" className={classes.table}>
        <TableHead className={classes.tableHeaer}>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Key</TableCell>
            <TableCell className={classes.tableHeaderCell}>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((item) => (
            <TableRow key={item.key}>
              <TableCell>{item.key}</TableCell>
              <TableCell>{item.value}</TableCell>
            </TableRow>
          ))}
          {relatedRows.map((item) => (
            <TableRow key={item.key}>
              <TableCell>{item.key}</TableCell>
              <TableCell>{item.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <div>{rejectedMsg || <CircularProgress />}</div>
  );
}
