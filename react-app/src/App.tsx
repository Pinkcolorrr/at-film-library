import { BrowserRouter as Router, Switch } from 'react-router-dom';
import React, { useEffect } from 'react';
import styles from './App.module.css';
import { Header } from './components/header/Header';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { MainContent } from './components/MainContent/MainContent';
import { useDispatch, useSelector } from 'react-redux';
import { observeUserState } from './store/User/userThunks';
import { selectAuthState } from './store/User/userSlice';
import { GuardRoute } from './routers/GuardRouter';

export function App() {
  const dispatch = useDispatch();
  const authState = useSelector(selectAuthState);

  useEffect(() => {
    dispatch(observeUserState());
  });

  return (
    <Router>
      <div className={styles.root}>
        <Header></Header>
        <div className={styles.wrapper}>
          <Switch>
            <GuardRoute
              path="/login"
              component={Login}
              canActivate={!authState}
              to="home"
            />
            <GuardRoute
              path="/register"
              component={Register}
              canActivate={!authState}
              to="home"
            />
            <GuardRoute
              path="/home"
              component={MainContent}
              canActivate={authState}
              to="login"
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
