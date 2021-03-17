import React from 'react';
import { Route, Redirect } from 'react-router-dom';

type guardRoute = {
  /** Component, that relate with route */
  component: React.ElementType;
  /** Route, that will be guarded */
  path: string;
  /** Check, if can activate this route */
  canActivate: boolean;
  /** Redirect, if impossible to activate component */
  redirectPath: string;
};

export const GuardRoute = ({ component: Component, canActivate, redirectPath, ...rest }: guardRoute): JSX.Element => (
  <Route {...rest} render={(props) => (canActivate ? <Component {...props} /> : <Redirect to={redirectPath} />)} />
);
