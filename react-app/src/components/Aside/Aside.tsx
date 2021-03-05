import React from 'react';
import { Drawer, Tab } from '@material-ui/core';
import { Divider, Tabs } from '@material-ui/core';
import { NavLink, Route, Switch, useLocation } from 'react-router-dom';
import { Characters } from '../Characters/Characters';
import { FilmsList } from '../Films/FilmsList';
import { Planets } from '../Planets/Planests';
import { getStringSecondPart } from '../../utils/utils';
import { wrapperStyles } from '../Wrapper/Wrapper';

export function Aside(props: wrapperStyles): JSX.Element {
  const location = useLocation();
  const pathname = getStringSecondPart(location.pathname, '/');

  return (
    <Drawer
      className={props.classes.aside}
      variant="permanent"
      classes={{
        paper: props.classes.asidePaper,
      }}
      anchor="left"
    >
      <div className={props.classes.toolbar} />
      <Divider />
      <Tabs variant="fullWidth" value={pathname} aria-label="nav tabs example">
        <Tab label="films" component={NavLink} to="/films" value={'films'} />
        <Tab
          label="planets"
          component={NavLink}
          to="/planets"
          value={'planets'}
        />
        <Tab
          label="characters"
          component={NavLink}
          to="/characters"
          value={'characters'}
        />
      </Tabs>

      <Divider />
      <Switch>
        <Route path={`/films`} component={FilmsList} />
        <Route path={`/planets`} component={Planets} />
        <Route path={`/characters`} component={Characters} />
      </Switch>
    </Drawer>
  );
}
