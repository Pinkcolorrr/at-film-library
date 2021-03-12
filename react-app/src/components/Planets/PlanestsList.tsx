import React, { useEffect, useRef, useState } from 'react';
import { List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import { Unsubscribe } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { Planet } from '../../models/Planet';
import { setRootContent, clearRootContent } from '../../store/CurrentContent/currentContentSlice';
import { selectPlanets } from '../../store/Planets/planetsSlice';
import { clearPlanetsList, getInitialPlanets, getNextPlanets } from '../../store/Planets/planetsThunks';
import { useThunkDispatch } from '../../store/store';
import { withSubscription } from '../../hocs/withSubscription';

type props = {
  pushUnsubscriber(unsubscribe: Unsubscribe): void;
  unsubscribeAll(): void;
  clearUnsubscribers(): void;
};

const useStyles = makeStyles(() => ({
  list: {
    height: '500px',
    overflowY: 'scroll',
    flexGrow: 1,
  },
}));

function PlanetsListWithSubscription(props: props): JSX.Element {
  const classes = useStyles();
  const dispatch = useThunkDispatch();
  const planets = useSelector(selectPlanets);
  const { url } = useRouteMatch();
  const scroll = useRef<HTMLDivElement>(null);
  const [isScrollEnd, setIsScrollEnd] = useState(false);

  const planetsList = planets.map((planet: Planet, index: number) => (
    <ListItem key={planet.pk} component={NavLink} to={`${url}/${planet.id}/details`} button>
      <ListItemText primary={index + 1 + '. ' + planet.name} />
    </ListItem>
  ));

  useEffect(() => {
    dispatch(getInitialPlanets(20)).then(({ payload }) => {
      props.pushUnsubscriber(payload as Unsubscribe);
    });

    dispatch(setRootContent('Planets list'));

    return () => {
      props.unsubscribeAll();
      props.clearUnsubscribers();

      dispatch(clearPlanetsList());
      dispatch(clearRootContent());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isScrollEnd) {
      dispatch(getNextPlanets(20)).then(({ payload }) => {
        props.pushUnsubscriber(payload as Unsubscribe);
      });
    }
  }, [isScrollEnd]);

  const onScroll = () => {
    Math.ceil((scroll.current?.offsetHeight as number) + (scroll.current?.scrollTop as number)) >=
    (scroll.current?.scrollHeight as number)
      ? setIsScrollEnd(true)
      : setIsScrollEnd(false);
  };

  return (
    <div ref={scroll} className={classes.list} onScroll={onScroll}>
      <List>{planetsList}</List>
    </div>
  );
}

export const PlanetsList = withSubscription(PlanetsListWithSubscription);
