import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Header.module.css';
import { signOut } from '../../store/User/userThunks/apiThunks';
import { selectUserEmail } from '../../store/User/userSelectors';
import { wrapperStyles } from '../Wrapper/wrapperStyles';

export function Header(props: wrapperStyles): JSX.Element {
  const userEmail = useSelector(selectUserEmail);
  const dispatch = useDispatch();

  return (
    <AppBar className={props.classes.header} position="fixed">
      <Toolbar>
        <Typography className={styles.title} variant="h6">
          <Link className={styles.authButtons} to="/">
            STAR WARS
          </Link>
        </Typography>

        <div>
          <span>{userEmail}</span>
          <Button
            className={styles.authButtons}
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
