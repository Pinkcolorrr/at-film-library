import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../store/User/userThunks/apiThunks';
import { selectUserEmail } from '../../store/User/userSelectors';
import { wrapperStyles } from '../../styles/WrapperStyles';
import { headerClasses } from './HeaderStyles';

/** App header bar */
export function Header(props: wrapperStyles): JSX.Element {
  const userEmail = useSelector(selectUserEmail);
  const dispatch = useDispatch();
  const classes = headerClasses();

  return (
    <AppBar className={props.classes.header} position="fixed">
      <Toolbar>
        <Typography className={classes.title} variant="h6">
          <Link className={classes.logoButton} to="/">
            STAR WARS
          </Link>
        </Typography>

        <div>
          <span>{userEmail}</span>
          <Button
            color="inherit"
            onClick={() => {
              dispatch(signOut());
            }}
          >
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
