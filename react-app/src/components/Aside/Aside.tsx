import React from 'react';
import { Drawer, makeStyles, Tab, Divider, Tabs } from '@material-ui/core';

import { NavLink, Route, Switch, useLocation } from 'react-router-dom';
import { CharactersList } from '../Characters/CharactersList';
import { FilmsList } from '../Films/FilmsList';
import { PlanetsList } from '../Planets/PlanestsList';
import { getStringSecondPart } from '../../utils/utils';
import { AsideTitle } from './AsideTitle';
import { wrapperStyles } from '../../styles/wrapperStyles';

const useStyles = makeStyles(() => ({
  asideContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  tabs: {
    height: '100%',
    alignItems: 'center',
  },
  tab: {},
}));

export function Aside(props: wrapperStyles): JSX.Element {
  const classes = useStyles();
  const location = useLocation();
  const pathname = getStringSecondPart(location.pathname, '/');

  return (
    <Drawer
      anchor="left"
      classes={{
        paper: props.classes.asidePaper,
      }}
      className={props.classes.aside}
      variant="permanent"
    >
      <div className={props.classes.toolbar}>
        <Tabs className={classes.tabs} value={pathname} variant="fullWidth">
          <Tab className={classes.tab} component={NavLink} label="films" to="/films" value="films" />
          <Tab component={NavLink} label="planets" to="/planets" value="planets" />
          <Tab component={NavLink} label="characters" to="/characters" value="characters" />
        </Tabs>
      </div>
      <Divider />

      <AsideTitle />

      <div className={classes.asideContent}>
        <Switch>
          <Route component={FilmsList} path="/films" />
          <Route path="/planets" render={() => <PlanetsList />} />
          <Route path="/characters" render={() => <CharactersList />} />
        </Switch>
        <Divider />
      </div>
    </Drawer>
  );
}
