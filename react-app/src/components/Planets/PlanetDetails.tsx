import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Maybe } from 'yup/lib/types';
import { Planet } from '../../models/Planet';
import { tableRows } from '../../models/TableRows';
import { setAdditionalContent, clearAdditionalContent } from '../../store/CurrentContent/currentContentSlice';
import { selectCurrentPlanet } from '../../store/Planets/planetSelectors';
import { getPlanetById } from '../../store/Planets/planetsThunks/apiThunks';
import { useThunkDispatch } from '../../store/store';
import { detailsPageClasses } from '../../styles/DetailPage';

type props = {
  match: { params: { id: string } };
};

export function PlanetDetails(props: props): JSX.Element {
  const classes = detailsPageClasses();
  const dispatch = useThunkDispatch();
  const planet: Maybe<Planet> = useSelector(selectCurrentPlanet);
  const { id } = props.match.params;

  useEffect(() => {
    if (!planet || id !== planet.id) {
      dispatch(getPlanetById(id));
    }

    return () => {};
  }, [dispatch, id]);

  useEffect(() => {
    if (planet) {
      dispatch(setAdditionalContent(planet.name));
    }
    return () => {
      dispatch(clearAdditionalContent());
    };
  }, [dispatch, planet]);

  return planet && planet.id === id ? (
    (() => {
      const rows: tableRows[] = [
        {
          key: 'Name',
          value: planet.name,
        },
        {
          key: 'Climate',
          value: planet.climate,
        },
        {
          key: 'Diameter',
          value: planet.diameter,
        },
        {
          key: 'Gravity',
          value: planet.gravity,
        },
        {
          key: 'Orbital period',
          value: planet.orbitalPeriod,
        },
        {
          key: 'Rotation period',
          value: planet.rotationPeriod,
        },
        {
          key: 'Population',
          value: planet.population,
        },

        {
          key: 'Surface water',
          value: planet.surfaceWater,
        },
        {
          key: 'Terrain',
          value: planet.terrain,
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
              {rows.map((item) => (
                <TableRow key={item.key}>
                  <TableCell>{item.key}</TableCell>
                  <TableCell>{item.value}</TableCell>
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
