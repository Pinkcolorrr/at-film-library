import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
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
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Maybe } from 'yup/lib/types';
import { Character } from '../../models/Characters';
import { Film } from '../../models/Film';
import { Planet } from '../../models/Planet';
import { tableRows } from '../../models/TableRows';
import { clearAdditionalContent, setAdditionalContent } from '../../store/CurrentContent/currentContentSlice';
import {
  clearSelectedFilm,
  selectCurrentFilm,
  selectRelatedCharacters,
  selectRelatedPlanets,
} from '../../store/Films/filmsSlice';
import { getCharactersByPk, getFilmById } from '../../store/Films/filmsThunks';
import { getPlanetsByPk } from '../../store/Planets/planetsThunks';
import { useThunkDispatch } from '../../store/store';

type props = {
  match: { params: { id: string } };
};

const useStyles = makeStyles((theme) => ({
  table: {
    tableLayout: 'fixed',
  },
  tableHeaer: {
    backgroundColor: theme.palette.grey[300],
  },
  tableHeaderCell: {
    fontWeight: 'bold',
  },
  circularProgress: {
    marginTop: '20px',
    textAlign: 'center',
  },
  fullWidth: {
    width: '100%',
  },
}));

export function FilmDetails(props: props): JSX.Element {
  const classes = useStyles();
  const id = props.match.params.id;
  const dispatch = useThunkDispatch();
  const film: Maybe<Film> = useSelector(selectCurrentFilm);
  const planets: Planet[] = useSelector(selectRelatedPlanets);
  const characters: Character[] = useSelector(selectRelatedCharacters);

  useEffect(() => {
    dispatch(getFilmById(id));

    return () => {
      dispatch(clearSelectedFilm());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (film) {
      dispatch(getCharactersByPk(film.charactersPk));
      dispatch(getPlanetsByPk(film.planetsPk));
      dispatch(setAdditionalContent(film.title));
    }
    return () => {
      dispatch(clearAdditionalContent());
    };
  }, [dispatch, film]);

  return film ? (
    (() => {
      const rows: tableRows[] = [
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
          value: String(film.releaseDate),
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
      ];

      const relatedRows = [
        {
          key: 'Planets',
          value: (
            <Accordion>
              <AccordionSummary aria-controls="planets-content" id="planets-header">
                Planets
              </AccordionSummary>
              <AccordionDetails>
                <List component="nav" aria-label="main mailbox folders" className={classes.fullWidth}>
                  {planets.map((planet) => (
                    <ListItem
                      className={classes.fullWidth}
                      key={planet.pk}
                      button
                      component={NavLink}
                      to={`/planets/${planet.id}/details`}
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
                <List component="nav" aria-label="main mailbox folders" className={classes.fullWidth}>
                  {characters.map((character) => (
                    <ListItem className={classes.fullWidth} key={character.pk}>
                      <ListItemText primary={character.name} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ),
        },
      ];

      return (
        <TableContainer component={Paper} elevation={0}>
          <Table aria-label="film table" className={classes.table}>
            <TableHead className={classes.tableHeaer}>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>Key</TableCell>
                <TableCell className={classes.tableHeaderCell}>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((film) => (
                <TableRow key={film.key}>
                  <TableCell>{film.key}</TableCell>
                  <TableCell>{film.value}</TableCell>
                </TableRow>
              ))}
              {relatedRows.map((film) => (
                <TableRow key={film.key}>
                  <TableCell>{film.key}</TableCell>
                  <TableCell>{film.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    })()
  ) : (
    <CircularProgress />
  );
}
