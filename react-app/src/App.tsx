import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useEffect } from 'react';
import styles from './App.module.css';
import { Header } from './components/header/Header';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { MainContent } from './components/MainContent/MainContent';
import { useDispatch } from 'react-redux';
import { loginUserOnLoad } from './store/User/userThunks';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginUserOnLoad());
  });

  return (
    <Router>
      <div className={styles.root}>
        <Header></Header>
        <div className={styles.wrapper}>
          <Switch>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/register">
              <Register></Register>
            </Route>
            <Route path="/home">
              <MainContent></MainContent>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
