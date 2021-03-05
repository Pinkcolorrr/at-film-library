import React from 'react';
import { Route } from 'react-router';
import { FilmAdding } from '../Films/FilmAdding';
import { FilmDetails } from '../Films/FilmDetails';
import { wrapperStyles } from '../Wrapper/Wrapper';

export function Main(props: wrapperStyles): JSX.Element {
  return (
    <div className={props.classes.content}>
      <div className={props.classes.toolbar} />

      <Route path="/films/add" component={FilmAdding} />
      <Route path="/films/:id/details" component={FilmDetails} />
    </div>
  );
}
