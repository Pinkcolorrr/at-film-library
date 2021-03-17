import { makeStyles } from '@material-ui/core';

export const detailsPageClasses = makeStyles((theme) => ({
  table: {
    tableLayout: 'fixed',
  },
  tableHeaer: {
    backgroundColor: theme.palette.grey[300],
  },
  tableHeaderCell: {
    fontWeight: 'bold',
  },
  circularProgress: {
    marginTop: '20px',
    textAlign: 'center',
  },
  fullWidth: {
    width: '100%',
  },
}));
