import { CssBaseline } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { Aside } from '../Aside/Aside';
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';

const drawerWidth = 500;

export type wrapperStyles = {
  classes: Record<'root' | 'content' | 'toolbar' | 'header' | 'aside' | 'asidePaper', string>;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  header: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  aside: {
    width: drawerWidth,
    flexShrink: 0,
  },
  asidePaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(5),
  },
}));

export function Wrapper(): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header classes={classes}></Header>
      <Aside classes={classes}></Aside>
      <Main classes={classes}></Main>
    </div>
  );
}
