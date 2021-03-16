import React from 'react';
import { Route, Redirect } from 'react-router-dom';

type guardRoute = {
  component: React.ElementType;
  path: string;
  canActivate: boolean;
  to: string;
};

export function GuardRoute({
  component: Component,
  canActivate,
  to,
  ...rest
}: guardRoute): JSX.Element {
  return (
    <Route
      {...rest}
      render={(props) =>
        canActivate ? <Component {...props} /> : <Redirect to={to} />
      }
    />
  );
}
