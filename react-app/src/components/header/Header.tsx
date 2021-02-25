import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './Header.module.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { selectAuthState, selectUserEmail } from '../../store/User/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/User/userThunks';

export function Header() {
  const authState = useSelector(selectAuthState);
  const userEmail = useSelector(selectUserEmail);
  const dispatch = useDispatch();

  return (
    <div className={styles.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={styles.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon></MenuIcon>
          </IconButton>
          <Typography variant="h6" className={styles.title}>
            <Link to="/home" className={styles.authButtons}>
              STAR WARS
            </Link>
          </Typography>

          {authState ? (
            <div>
              <span>{userEmail}</span>
              <Button
                className={styles.authButtons}
                color="inherit"
                onClick={() => {
                  dispatch(logoutUser());
                }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <Link to="/login" className={styles.authButtons}>
                <Button color="inherit">Login</Button>
              </Link>
              <Link to="/register" className={styles.authButtons}>
                <Button color="inherit">Register</Button>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
