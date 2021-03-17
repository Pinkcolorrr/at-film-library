import { makeStyles } from '@material-ui/core';

export const processingButtonsStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    padding: theme.spacing(2, 4),
    justifyContent: 'space-between',

    button: {
      marginRight: '10px',
    },
  },
  link: {
    width: '100%',
    textDecoration: 'none',
  },
}));
