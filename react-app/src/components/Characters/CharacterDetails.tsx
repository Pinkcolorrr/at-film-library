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
import { Character } from '../../models/Characters';
import { tableRows } from '../../models/TableRows';
import { selectCurrentCharacter } from '../../store/Characters/characterSelectors';
import { getCharacterById } from '../../store/Characters/charactersThunks/apiThunks';
import { setAdditionalContent, clearAdditionalContent } from '../../store/CurrentContent';
import { useThunkDispatch } from '../../store/store';
import { detailsPageClasses } from '../../styles/DetailPage';

type props = {
  match: { params: { id: string } };
};

export function CharacterDetails(props: props): JSX.Element {
  const classes = detailsPageClasses();
  const { id } = props.match.params;
  const dispatch = useThunkDispatch();
  const character: Maybe<Character> = useSelector(selectCurrentCharacter);

  useEffect(() => {
    if (!character || character.id !== id) {
      dispatch(getCharacterById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (character) {
      dispatch(setAdditionalContent(character.name));
    }
    return () => {
      dispatch(clearAdditionalContent());
    };
  }, [dispatch, character]);

  return character && character.id === id ? (
    (() => {
      const rows: tableRows[] = [
        {
          key: 'Name',
          value: character.name,
        },
        {
          key: 'Gender',
          value: character.gender,
        },
        {
          key: 'Birth year',
          value: character.birthYear,
        },
        {
          key: 'Eye color',
          value: character.eyeColor,
        },

        {
          key: 'Hair color',
          value: character.hairColor,
        },
        {
          key: 'Height',
          value: character.height,
        },
        {
          key: 'Mass',
          value: character.mass,
        },
        {
          key: 'Skin color',
          value: character.skinColor,
        },
      ];
      return (
        <TableContainer component={Paper} elevation={0}>
          <Table className={classes.table}>
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
