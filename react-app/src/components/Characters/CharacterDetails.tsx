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
import { Maybe } from 'yup/lib/types';
import { RouteComponentProps } from 'react-router';
import { Character } from '../../models/Characters';
import { tableRows } from '../../models/TableRows';
import { selectCurrentCharacter, selectRejectedCharacterMsg } from '../../store/Characters/characterSelectors';
import { getCharacterById } from '../../store/Characters/charactersThunks/apiThunks';
import { setAdditionalContent, clearAdditionalContent, setRootContent } from '../../store/CurrentContent';
import { useThunkDispatch } from '../../store/store';
import { detailsPageClasses } from '../../styles/DetailPageStyles';

type props = {
  /** Character ID */
  id: string;
};

/** Displaying table with character information */
export function CharacterDetails(props: RouteComponentProps<props>): JSX.Element {
  const { id } = props.match.params;
  const classes = detailsPageClasses();
  const dispatch = useThunkDispatch();
  const character: Maybe<Character> = useSelector(selectCurrentCharacter);
  const rejectedMsg = useSelector(selectRejectedCharacterMsg);

  /** Get character if it isn't in the store or store have different character */
  useEffect(() => {
    if (!character || character.id !== id) {
      dispatch(getCharacterById(id));
    }
  }, [id]);

  /** Set content for aside title */
  useEffect(() => {
    if (character) {
      dispatch(setAdditionalContent(character.name));
      dispatch(setRootContent('characters list'));
    }
    return () => {
      dispatch(clearAdditionalContent());
    };
  }, [character]);

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
    <div>{rejectedMsg || <CircularProgress />}</div>
  );
}
