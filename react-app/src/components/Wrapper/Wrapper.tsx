import { CssBaseline } from '@material-ui/core';

import React from 'react';
import { Aside } from '../Aside/Aside';
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { wrapperClasses } from './wrapperStyles';

export function Wrapper(): JSX.Element {
  const classes = wrapperClasses();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header classes={classes} />
      <Aside classes={classes} />
      <Main classes={classes} />
    </div>
  );
}
