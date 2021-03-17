import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './App.module.css';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { Wrapper } from './components/Wrapper/Wrapper';
import { observeUser } from './store/User/userThunks/apiThunks';
import { GuardRoute } from './routers/GuardRouter';
import { selectAuthState, selectIsUserPending } from './store/User/userSelectors';

/** Entry point to the application */
export function App(): JSX.Element {
  const authState = useSelector(selectAuthState);
  const isPending = useSelector(selectIsUserPending);
  const dispatch = useDispatch();

  /** Start tracking user state */
  useEffect((): void => {
    dispatch(observeUser());
  }, []);

  return (
    <Router>
      {isPending ? null : (
        <div className={styles.root}>
          <div className={styles.wrapper}>
            <Switch>
              <Redirect from="/" to="/films" exact />
              <GuardRoute canActivate={!authState} component={Login} path="/login" redirectPath="/" />
              <GuardRoute canActivate={!authState} component={Register} path="/register" redirectPath="/" />
              <GuardRoute canActivate={authState} component={Wrapper} path="/" redirectPath="/login" />
            </Switch>
          </div>
        </div>
      )}
    </Router>
  );
}
