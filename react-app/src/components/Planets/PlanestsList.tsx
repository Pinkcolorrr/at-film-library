import React, { useEffect, useRef, useState } from 'react';
import { CircularProgress, List, ListItem, ListItemText } from '@material-ui/core';
import { Unsubscribe } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { NavLink, Redirect, useRouteMatch } from 'react-router-dom';
import { Planet } from '../../models/Planet';
import { setRootContent, clearRootContent } from '../../store/CurrentContent/currentContentSlice';
import { clearPlanetsList, setPlanetsSortTarget } from '../../store/Planets/planetsSlice';
import { getInitialPlanets, getNextPlanets } from '../../store/Planets/planetsThunks/apiThunks';
import { getPlanetByName } from '../../store/Planets/planetsThunks/combinedThunks';
import { useThunkDispatch } from '../../store/store';
import { withSubscription } from '../../hocs/withSubscription';
import { SortMenu } from '../SortMenu/SortMenu';
import { SearchForm } from '../SearchForm/SearchForm';
import {
  selectAllPlanets,
  selectCurrentPlanet,
  selectIsHaveMorePlanets,
  selectPlanetsRequestOptions,
} from '../../store/Planets/planetSelectors';
import { asideListClasses } from '../../styles/AsideListStyles';
import { sortTargets } from '../../utils/types';

interface Props {
  pushUnsubscriber(unsubscribe: Unsubscribe): void;
  unsubscribeAll(): void;
  clearUnsubscribers(): void;
}

/** List of planets */
function PlanetsListWithSubscription(props: Props): JSX.Element {
  const dispatch = useThunkDispatch();
  const classes = asideListClasses();
  const { url } = useRouteMatch();

  const currentPlanet = useSelector(selectCurrentPlanet);
  const planets = useSelector(selectAllPlanets);
  const isHaveMoreData = useSelector(selectIsHaveMorePlanets);
  const requestOptions = useSelector(selectPlanetsRequestOptions);

  const scroll = useRef<HTMLDivElement>(null);
  const [isScrollEnd, setIsScrollEnd] = useState(false);
  const sortOptions: sortTargets[] = ['Default', 'Name'];

  /** Get initial list of planets */
  const planetsRequset = () => {
    dispatch(clearPlanetsList());
    props.unsubscribeAll();
    props.clearUnsubscribers();
    dispatch(getInitialPlanets(requestOptions)).then(({ payload }) => {
      props.pushUnsubscriber(payload as Unsubscribe);
    });
    dispatch(setRootContent('planets list'));
  };

  /** Set sort state and get initial sorted list of planets */
  const sortBySelectedOption = (selected: number) => {
    dispatch(setPlanetsSortTarget(sortOptions[selected]));
  };

  /** Get planet by name from input */
  const getPlanetBySearch = (name: string): void => {
    dispatch(getPlanetByName(name));
  };

  /** Get initial list of planets after component loading */
  useEffect(() => {
    planetsRequset();

    /** Unsubscribe from snapshots */
    return () => {
      props.unsubscribeAll();
      props.clearUnsubscribers();

      dispatch(clearRootContent());
    };
  }, [dispatch, requestOptions.sortTarget]);

  /** Get next part of planets when scroll scroll at the bottom */
  useEffect(() => {
    if (isScrollEnd && isHaveMoreData) {
      dispatch(getNextPlanets(requestOptions)).then(({ payload }) => {
        props.pushUnsubscriber(payload as Unsubscribe);
      });
    }
  }, [dispatch, isScrollEnd]);

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
      <SearchForm getInitialItems={planetsRequset} getItemByName={getPlanetBySearch} />
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
          {isHaveMoreData ? <CircularProgress /> : <ListItemText primary="You hit the bottom" />}
        </ListItem>
      </List>
      {currentPlanet ? <Redirect from="/planets" to={`/planets/${currentPlanet.id}/details`} exact /> : null}
    </div>
  );
}

export const PlanetsList = withSubscription(PlanetsListWithSubscription);
