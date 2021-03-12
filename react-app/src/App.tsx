import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './App.module.css';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { Wrapper } from './components/Wrapper/Wrapper';
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
              <Redirect from="/" to="/films" exact />
              <GuardRoute canActivate={!authState} component={Login} path="/login" to="/" />
              <GuardRoute canActivate={!authState} component={Register} path="/register" to="/" />
              <GuardRoute canActivate={authState} component={Wrapper} path="/" to="/login" />
            </Switch>
          </div>
        </div>
      )}
    </Router>
  );
}
