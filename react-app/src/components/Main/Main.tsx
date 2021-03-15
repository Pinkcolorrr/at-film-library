import React from 'react';
import { Route, Switch } from 'react-router';
import { FilmAdding } from '../Films/FilmAdding';
import { FilmDetails } from '../Films/FilmDetails';
import { PlanetDetails } from '../Planets/PlanetDetails';
import { wrapperStyles } from '../../styles/wrapperStyles';
import { CharacterDetails } from '../Characters/CharacterDetails';

export function Main(props: wrapperStyles): JSX.Element {
  return (
    <div className={props.classes.content}>
      <div className={props.classes.toolbar} />

      <Switch>
        <Route component={FilmAdding} path="/films/add" />
        <Route component={FilmDetails} path="/films/:id/details" />
        <Route component={PlanetDetails} path="/planets/:id/details" />
        <Route component={CharacterDetails} path="/characters/:id/details" />
      </Switch>
    </div>
  );
}
