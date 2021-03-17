import { makeStyles } from '@material-ui/core';

export const asideClasses = makeStyles(() => ({
  asideContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  tabs: {
    height: '100%',
    alignItems: 'center',
  },
}));

export const asideTitleClasses = makeStyles((theme) => ({
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: theme.palette.grey[300],
    fontSize: '17px',
    padding: '15px 0',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
}));
