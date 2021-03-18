import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface GuardRoute {
  /** Component, that relate with route */
  component: React.ElementType;
  /** Route, that will be guarded */
  path: string;
  /** Check, if can activate this route */
  canActivate: boolean;
  /** Redirect, if impossible to activate component */
  redirectPath: string;
}

export const GuardRoute = ({ component: Component, canActivate, redirectPath, ...rest }: GuardRoute): JSX.Element => (
  <Route {...rest} render={(props) => (canActivate ? <Component {...props} /> : <Redirect to={redirectPath} />)} />
);
