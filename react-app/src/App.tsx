import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import React, { useEffect } from 'react';
import styles from './App.module.css';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { Wrapper } from './components/Wrapper/Wrapper';
import { useDispatch, useSelector } from 'react-redux';
import { observeUser } from './store/User/userThunks';
import { selectAuthState, selectIsUserPending } from './store/User/userSlice';
import { GuardRoute } from './routers/GuardRouter';

export function App(): JSX.Element {
  const authState = useSelector(selectAuthState);
  const isPending = useSelector(selectIsUserPending);
  const dispatch = useDispatch();

  useEffect((): void => {
    dispatch(observeUser());
  }, [dispatch]);

  return (
    <Router>
      {isPending ? null : (
        <div className={styles.root}>
          <div className={styles.wrapper}>
            <Switch>
              <Redirect exact from="/" to="/films"></Redirect>
              <GuardRoute
                path="/login"
                component={Login}
                canActivate={!authState}
                to="/"
              />
              <GuardRoute
                path="/register"
                component={Register}
                canActivate={!authState}
                to="/"
              />
              <GuardRoute
                path="/"
                component={Wrapper}
                canActivate={authState}
                to="/login"
              />
            </Switch>
          </div>
        </div>
      )}
    </Router>
  );
}
