import React, { useEffect, useRef, useState } from 'react';
import { List, ListItem, ListItemText, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Redirect, useLocation, useRouteMatch } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Unsubscribe } from 'redux';
import { withSubscription } from '../../hocs/withSubscription';
import { Character } from '../../models/Characters';
import { clearCharactersList, setCharactersSortTarget } from '../../store/Characters';
import {
  selectAllCharacters,
  selectCharactersRequestOptions,
  selectCurrentCharacter,
  selectIsHaveMoreCharacters,
  selectLastCharactersMsg,
} from '../../store/Characters/characterSelectors';
import {
  getCharacterByName,
  getInitialCharacters,
  getNextCharacters,
} from '../../store/Characters/charactersThunks/apiThunks';
import { clearRootContent, setRootContent } from '../../store/CurrentContent';
import { useThunkDispatch } from '../../store/store';
import { asideListClasses } from '../../styles/AsideList';
import { SearchForm } from '../SearchForm/SearchForm';
import { SortMenu } from '../SortMenu/SortMenu';

type props = {
  pushUnsubscriber(unsubscribe: Unsubscribe): void;
  unsubscribeAll(): void;
  clearUnsubscribers(): void;
};

function CharactersListWithSubscription(props: props): JSX.Element {
  const dispatch = useThunkDispatch();
  const classes = asideListClasses();
  const { url } = useRouteMatch();
  const location = useLocation();

  const characters = useSelector(selectAllCharacters);
  const isHaveMoreData = useSelector(selectIsHaveMoreCharacters);
  const endDataMsg = useSelector(selectLastCharactersMsg);
  const requestOptions = useSelector(selectCharactersRequestOptions);
  const currentCharacter = useSelector(selectCurrentCharacter);

  const scroll = useRef<HTMLDivElement>(null);
  const [isScrollEnd, setIsScrollEnd] = useState(false);
  const sortOptions = ['Default', 'Name'];

  const charactersRequset = () => {
    dispatch(clearCharactersList());
    props.unsubscribeAll();
    props.clearUnsubscribers();
    dispatch(getInitialCharacters(requestOptions)).then(({ payload }) => {
      props.pushUnsubscriber(payload as Unsubscribe);
    });
    dispatch(setRootContent('Characters list'));
  };

  const sortBySelectedOption = (selected: number) => {
    dispatch(setCharactersSortTarget(sortOptions[selected]));
  };

  const getCharacterBySearch = (name: string): void => {
    dispatch(getCharacterByName(name));
  };

  useEffect(() => {
    charactersRequset();

    return () => {
      props.unsubscribeAll();
      props.clearUnsubscribers();

      dispatch(clearRootContent());
    };
  }, [dispatch, requestOptions.sortTarget]);

  useEffect(() => {
    if (isScrollEnd && isHaveMoreData) {
      dispatch(getNextCharacters(requestOptions)).then(({ payload }) => {
        props.pushUnsubscriber(payload as Unsubscribe);
      });
    }
  }, [dispatch, isScrollEnd]);

  const onScroll = () => {
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
    <div ref={scroll} className={classes.list} onScroll={onScroll}>
      <SearchForm getInitialPlanets={charactersRequset} getPlanetByName={getCharacterBySearch} />
      <SortMenu
        index={sortOptions.indexOf(requestOptions.sortTarget)}
        options={sortOptions}
        sortBySelectedOption={sortBySelectedOption}
      />

      <List>
        {characters.map((planet: Character) => (
          <ListItem key={planet.pk} component={NavLink} to={`${url}/${planet.id}/details`} button>
            <ListItemText primary={planet.name} />
          </ListItem>
        ))}
        <ListItem className={classes.circularProgress}>
          {isHaveMoreData ? <CircularProgress /> : <ListItemText primary={endDataMsg} />}
        </ListItem>
      </List>
      {currentCharacter && !location.pathname.includes('details') ? (
        <Redirect from="/characters" to={`/characters/${currentCharacter.id}/details`} />
      ) : null}
    </div>
  );
}

export const CharactersList = withSubscription(CharactersListWithSubscription);
