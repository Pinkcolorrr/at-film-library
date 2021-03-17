import { Theme, makeStyles } from '@material-ui/core';

export const filmFormStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: '700px',
    padding: theme.spacing(5, 10),
  },
  formGroup: {
    marginBottom: '30px',
  },
  buttons: {
    marginTop: '20px',
    display: 'flex',
  },
  link: {
    width: '100%',
    textDecoration: 'none',
  },
}));
