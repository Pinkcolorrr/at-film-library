import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { Aside } from '../Aside/Aside';
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { wrapperClasses } from '../../styles/WrapperStyles';

/** Wrapper for whole app */
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
