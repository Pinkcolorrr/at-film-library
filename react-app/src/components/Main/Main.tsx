import React from 'react';
import { Route, Switch } from 'react-router';
import { FilmAdding } from '../Films/FilmAdding';
import { FilmDetails } from '../Films/FilmDetails';
import { PlanetDetails } from '../Planets/PlanetDetails';
import { wrapperStyles } from '../../styles/WrapperStyles';
import { CharacterDetails } from '../Characters/CharacterDetails';
import { FilmEditing } from '../Films/FilmEditing';

/** Component for displaing app content */
export function Main(props: wrapperStyles): JSX.Element {
  return (
    <main className={props.classes.content}>
      <div className={props.classes.toolbar} />

      <Switch>
        <Route component={FilmAdding} path="/films/add" />
        <Route component={FilmDetails} path="/films/:id/details" />
        <Route component={FilmEditing} path="/films/:id/edit" />
        <Route component={PlanetDetails} path="/planets/:id/details" />
        <Route component={CharacterDetails} path="/characters/:id/details" />
      </Switch>
    </main>
  );
}
