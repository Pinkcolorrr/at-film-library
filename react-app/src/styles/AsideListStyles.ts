import { makeStyles } from '@material-ui/core';

export const asideListClasses = makeStyles((theme) => ({
  list: {
    height: '500px',
    overflowY: 'scroll',
    flexGrow: 1,
  },

  searchForm: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
  },

  circularProgress: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
}));
