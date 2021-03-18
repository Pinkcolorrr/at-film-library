import React, { useEffect } from 'react';
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
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { TableRows } from '../../models/TableRows';
import {
  setAdditionalContent,
  clearAdditionalContent,
  setRootContent,
} from '../../store/CurrentContent/currentContentSlice';
import { selectCurrentPlanet, selectRejectedPlentMsg } from '../../store/Planets/planetSelectors';
import { getPlanetById } from '../../store/Planets/planetsThunks/apiThunks';
import { useThunkDispatch } from '../../store/store';
import { detailsPageClasses } from '../../styles/DetailPageStyles';

/** Displaying table with planet information */
export function PlanetDetails(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const classes = detailsPageClasses();
  const dispatch = useThunkDispatch();
  const planet = useSelector(selectCurrentPlanet);
  const rejectedMsg = useSelector(selectRejectedPlentMsg);

  /** Get planet if it isn't in the store or store have different planet */
  useEffect(() => {
    if (!planet || id !== planet.id) {
      dispatch(getPlanetById(id));
    }
  }, [id]);

  /** Set content for aside title */
  useEffect(() => {
    if (planet) {
      dispatch(setAdditionalContent(planet.name));
      dispatch(setRootContent('planets list'));
    }
    return () => {
      dispatch(clearAdditionalContent());
    };
  }, [planet]);

  const rows: TableRows[] = planet
    ? [
        {
          key: 'Name',
          value: planet.name,
        },
        {
          key: 'Climate',
          value: planet.climate,
        },
        {
          key: 'Surface water',
          value: planet.surfaceWater,
        },
        {
          key: 'Terrain',
          value: planet.terrain,
        },
        {
          key: 'Gravity',
          value: planet.gravity,
        },
        {
          key: 'Diameter',
          value: String(planet.diameter || 'Unknown'),
        },
        {
          key: 'Orbital period',
          value: String(planet.orbitalPeriod || 'Unknown'),
        },
        {
          key: 'Rotation period',
          value: String(planet.rotationPeriod || 'Unknown'),
        },
        {
          key: 'Population',
          value: String(planet.population || 'Unknown'),
        },
      ]
    : [];

  return planet && planet.id === id ? (
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
  ) : (
    <div>{rejectedMsg || <CircularProgress />}</div>
  );
}
