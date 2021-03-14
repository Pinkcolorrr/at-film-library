import React, { useEffect, useRef, useState } from 'react';
import { CircularProgress, IconButton, List, ListItem, ListItemText, makeStyles, TextField } from '@material-ui/core';
import { Unsubscribe } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { SearchOutlined } from '@material-ui/icons';
import { Planet } from '../../models/Planet';
import { setRootContent, clearRootContent } from '../../store/CurrentContent/currentContentSlice';
import { selectEndDataMsg, selectIsHaveMoreData, selectPlanets } from '../../store/Planets/planetsSlice';
import {
  clearPlanetsList,
  getInitialPlanets,
  getNextPlanets,
  getPlanetByName,
} from '../../store/Planets/planetsThunks';
import { useThunkDispatch } from '../../store/store';
import { withSubscription } from '../../hocs/withSubscription';
import { RequsetOptions } from '../../models/RequsetOptions';

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
  const classes = useStyles();
  const dispatch = useThunkDispatch();
  const scroll = useRef<HTMLDivElement>(null);
  const planets = useSelector(selectPlanets);
  const isHaveMoreData = useSelector(selectIsHaveMoreData);
  const endDataMsg = useSelector(selectEndDataMsg);
  const { url } = useRouteMatch();
  const [searchValue, setSearchValue] = useState('');
  const [isScrollEnd, setIsScrollEnd] = useState(false);

  const requsetOptions: RequsetOptions = {
    chunkSize: 20,
    sortTarget: 'pk',
  };

  const planetsList = planets.map((planet: Planet) => (
    <ListItem key={planet.pk} component={NavLink} to={`${url}/${planet.id}/details`} button>
      <ListItemText primary={planet.name} />
    </ListItem>
  ));

  useEffect(() => {
    dispatch(getInitialPlanets(requsetOptions)).then(({ payload }) => {
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
    if (isScrollEnd && isHaveMoreData) {
      dispatch(getNextPlanets(20)).then(({ payload }) => {
        props.pushUnsubscriber(payload as Unsubscribe);
      });
    }
  }, [isScrollEnd]);

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
      <form
        className={classes.searchForm}
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          if (searchValue) {
            dispatch(getPlanetByName(searchValue));
          } else {
            dispatch(clearPlanetsList());
            dispatch(getInitialPlanets(requsetOptions));
          }
        }}
      >
        <TextField
          label="Search"
          onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchValue(event.target.value);
          }}
          size="small"
          value={searchValue}
          variant="outlined"
          fullWidth
        />
        <IconButton type="submit">
          <SearchOutlined />
        </IconButton>
      </form>
      <List>
        {planetsList}
        <ListItem className={classes.circularProgress}>
          {isHaveMoreData ? <CircularProgress /> : <ListItemText primary={endDataMsg} />}
        </ListItem>
      </List>
    </div>
  );
}

export const PlanetsList = withSubscription(PlanetsListWithSubscription);
