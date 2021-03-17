import React from 'react';
import { Drawer, Tab, Divider, Tabs } from '@material-ui/core';

import { NavLink, Route, Switch, useLocation } from 'react-router-dom';
import { CharactersList } from '../Characters/CharactersList';
import { FilmsList } from '../Films/FilmsList';
import { PlanetsList } from '../Planets/PlanestsList';
import { getStringSecondPart } from '../../utils/utils';
import { AsideTitle } from './AsideTitle';
import { wrapperStyles } from '../../styles/WrapperStyles';
import { ProcessingButtons } from '../ProcessingButtons/ProcessingButtons';
import { asideClasses } from './AsideStyles';

/** Aside bar */
export function Aside(props: wrapperStyles): JSX.Element {
  const classes = asideClasses();
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
          <Tab component={NavLink} label="films" to="/films" value="films" />
          <Tab component={NavLink} label="planets" to="/planets" value="planets" />
          <Tab component={NavLink} label="characters" to="/characters" value="characters" />
        </Tabs>
      </div>
      <Divider />

      <AsideTitle />

      <div className={classes.asideContent}>
        <Switch>
          <Route path="/films" render={() => <FilmsList />} />
          <Route path="/planets" render={() => <PlanetsList />} />
          <Route path="/characters" render={() => <CharactersList />} />
        </Switch>
        <Divider />
        <ProcessingButtons />
      </div>
    </Drawer>
  );
}
