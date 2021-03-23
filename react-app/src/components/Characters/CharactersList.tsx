import React, { useEffect, useRef, useState } from 'react';
import { List, ListItem, ListItemText, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Redirect, useRouteMatch } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Unsubscribe } from 'redux';
import { withSubscription } from '../../hocs/withSubscription';
import { Character } from '../../models/Character';
import { clearCharactersList, setCharactersSortTarget } from '../../store/Characters';
import {
  selectAllCharacters,
  selectCharactersRequestOptions,
  selectCurrentCharacter,
  selectIsHaveMoreCharacters,
} from '../../store/Characters/characterSelectors';
import { getCharacterByName } from '../../store/Characters/charactersThunks/combinedThunks';
import { getInitialCharacters, getNextCharacters } from '../../store/Characters/charactersThunks/apiThunks';
import { clearRootContent, setRootContent } from '../../store/CurrentContent';
import { useThunkDispatch } from '../../store/store';
import { asideListClasses } from '../../styles/AsideListStyles';
import { SearchForm } from '../SearchForm/SearchForm';
import { SortMenu } from '../SortMenu/SortMenu';
import { sortTargets } from '../../utils/types';

interface Props {
  /** Push unsubscribe function in array */
  pushUnsubscriber(unsubscribe: Unsubscribe): void;
  /** Call all unsubscribe functions */
  unsubscribeAll(): void;
  /** Clear unsubscribe array */
  clearUnsubscribers(): void;
}

/** List of characters */
function CharactersListWithSubscription(props: Props): JSX.Element {
  const dispatch = useThunkDispatch();
  const classes = asideListClasses();
  const { url } = useRouteMatch();

  const characters = useSelector(selectAllCharacters);
  const isHaveMoreData = useSelector(selectIsHaveMoreCharacters);
  const requestOptions = useSelector(selectCharactersRequestOptions);
  const currentCharacter = useSelector(selectCurrentCharacter);

  const scroll = useRef<HTMLDivElement>(null);
  const [isScrollEnd, setIsScrollEnd] = useState(false);
  const sortOptions: sortTargets[] = ['Default', 'Name'];

  /** Get initial list of characters */
  const initialCharactersRequset = () => {
    dispatch(clearCharactersList());
    props.unsubscribeAll();
    props.clearUnsubscribers();
    dispatch(getInitialCharacters(requestOptions)).then(({ payload }) => {
      props.pushUnsubscriber(payload as Unsubscribe);
    });
    dispatch(setRootContent('characters list'));
  };

  /** Set sort state and get initial sorted list of characters */
  const sortBySelectedOption = (selected: number) => {
    dispatch(setCharactersSortTarget(sortOptions[selected]));
  };

  /** Get character by name from input */
  const getCharacterBySearch = (name: string): void => {
    dispatch(getCharacterByName(name));
  };

  /** Get initial list of characters after component loading */
  useEffect(() => {
    initialCharactersRequset();

    /** Unsubscribe from snapshots */
    return () => {
      props.unsubscribeAll();
      props.clearUnsubscribers();

      dispatch(clearRootContent());
    };
  }, [requestOptions.sortTarget]);

  /** Get next part of characters when scroll scroll at the bottom */
  useEffect(() => {
    if (isScrollEnd && isHaveMoreData) {
      dispatch(getNextCharacters(requestOptions)).then(({ payload }) => {
        props.pushUnsubscriber(payload as Unsubscribe);
      });
    }
  }, [isScrollEnd]);

  /** Listen for scroll state */
  const scrollHandler = () => {
    if (
      Math.ceil((scroll.current?.offsetHeight as number) + (scroll.current?.scrollTop as number)) >=
      (scroll.current?.scrollHeight as number)
    ) {
      setIsScrollEnd(true);
    } else {
      setIsScrollEnd(false);
    }
  };

  return (
    <div ref={scroll} className={classes.list} onScroll={scrollHandler}>
      <SearchForm getInitialItems={initialCharactersRequset} getItemByName={getCharacterBySearch} />
      <SortMenu
        index={sortOptions.indexOf(requestOptions.sortTarget)}
        options={sortOptions}
        sortBySelectedOption={sortBySelectedOption}
      />

      <List>
        {characters.map((character: Character) => (
          <ListItem key={character.pk} component={NavLink} to={`${url}/${character.id}/details`} button>
            <ListItemText primary={character.name} />
          </ListItem>
        ))}
        <ListItem className={classes.circularProgress}>
          {isHaveMoreData ? <CircularProgress /> : <ListItemText primary="You hit the bottom" />}
        </ListItem>
      </List>
      {currentCharacter ? <Redirect from="/characters" to={`/characters/${currentCharacter.id}/details`} /> : null}
    </div>
  );
}

export const CharactersList = withSubscription(CharactersListWithSubscription);
