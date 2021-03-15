import React, { useEffect, useRef, useState } from 'react';
import { CircularProgress, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import { Unsubscribe } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { Planet } from '../../models/Planet';
import { setRootContent, clearRootContent } from '../../store/CurrentContent/currentContentSlice';
import { clearPlanetsList, setSortTarget } from '../../store/Planets/planetsSlice';
import { getInitialPlanets, getNextPlanets, getPlanetByName } from '../../store/Planets/planetsThunks/apiThunks';
import { useThunkDispatch } from '../../store/store';
import { withSubscription } from '../../hocs/withSubscription';
import { SortMenu } from '../SortMenu/SortMenu';
import { SearchForm } from '../SearchForm/SearchForm';
import {
  selectPlanets,
  selectIsHaveMoreData,
  selectEndDataMsg,
  selectRequestOptions,
} from '../../store/Planets/planetSelectors';

type props = {
  pushUnsubscriber(unsubscribe: Unsubscribe): void;
  unsubscribeAll(): void;
  clearUnsubscribers(): void;
};

const useStyles = makeStyles((theme) => ({
  list: {
    height: '500px',
    overflowY: 'scroll',
    flexGrow: 1,
  },

  searchForm: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
  },

  circularProgress: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
}));

function PlanetsListWithSubscription(props: props): JSX.Element {
  const dispatch = useThunkDispatch();
  const classes = useStyles();
  const { url } = useRouteMatch();

  const planets = useSelector(selectPlanets);
  const isHaveMoreData = useSelector(selectIsHaveMoreData);
  const endDataMsg = useSelector(selectEndDataMsg);
  const requestOptions = useSelector(selectRequestOptions);

  const scroll = useRef<HTMLDivElement>(null);
  const [isScrollEnd, setIsScrollEnd] = useState(false);
  const sortOptions = ['Default', 'Name'];

  const planetsRequset = () => {
    dispatch(clearPlanetsList());
    props.unsubscribeAll();
    props.clearUnsubscribers();
    dispatch(getInitialPlanets(requestOptions)).then(({ payload }) => {
      props.pushUnsubscriber(payload as Unsubscribe);
    });
    dispatch(setRootContent('Planets list'));
  };

  const sortBySelectedOption = (selected: number) => {
    dispatch(setSortTarget(sortOptions[selected]));
  };

  const getPlanetBySearch = (name: string): void => {
    dispatch(getPlanetByName(name));
  };

  useEffect(() => {
    planetsRequset();

    return () => {
      props.unsubscribeAll();
      props.clearUnsubscribers();

      dispatch(clearRootContent());
    };
  }, [dispatch, requestOptions.sortTarget]);

  useEffect(() => {
    if (isScrollEnd && isHaveMoreData) {
      dispatch(getNextPlanets(requestOptions)).then(({ payload }) => {
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
      <SearchForm getInitialPlanets={planetsRequset} getPlanetByName={getPlanetBySearch} />
      <SortMenu
        index={sortOptions.indexOf(requestOptions.sortTarget)}
        options={sortOptions}
        sortBySelectedOption={sortBySelectedOption}
      />

      <List>
        {planets.map((planet: Planet) => (
          <ListItem key={planet.pk} component={NavLink} to={`${url}/${planet.id}/details`} button>
            <ListItemText primary={planet.name} />
          </ListItem>
        ))}
        <ListItem className={classes.circularProgress}>
          {isHaveMoreData ? <CircularProgress /> : <ListItemText primary={endDataMsg} />}
        </ListItem>
      </List>
    </div>
  );
}

export const PlanetsList = withSubscription(PlanetsListWithSubscription);
