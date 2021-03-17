import { makeStyles } from '@material-ui/core';

export const authFormStyles = makeStyles((theme) => ({
  root: {
    padding: '50px',
    width: '250px',
    boxShadow: '0 0 12px 4px rgba(34, 60, 80, 0.2)',
  },
  emailGroup: {
    marginBottom: '20px',
  },
  passwordGroup: {
    marginBottom: '60px',
  },

  formLabel: {
    textAlign: 'center',
    marginBottom: '40px',
    fontSize: '30px',
    textTransform: 'uppercase',
  },

  errorMsg: {
    marginTop: '20px',
  },

  registerText: {
    marginTop: '10px',
    textAlign: 'center',
    color: theme.palette.common.black,
  },
}));
