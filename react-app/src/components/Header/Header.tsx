import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import styles from './Header.module.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { selectUserEmail } from '../../store/User/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../store/User/userThunks';
import { wrapperStyles } from '../Wrapper/Wrapper';

export function Header(props: wrapperStyles): JSX.Element {
  const userEmail = useSelector(selectUserEmail);
  const dispatch = useDispatch();

  return (
    <AppBar position="fixed" className={props.classes.header}>
      <Toolbar>
        <Typography variant="h6" className={styles.title}>
          <Link to="/" className={styles.authButtons}>
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
