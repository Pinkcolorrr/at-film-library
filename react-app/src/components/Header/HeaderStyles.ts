import { makeStyles } from '@material-ui/core';

export const headerClasses = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },

  logoButton: {
    color: theme.palette.common.white,
    textDecoration: 'none',
  },
}));
