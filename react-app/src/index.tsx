import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import firebase from 'firebase/app';
import { Provider } from 'react-redux';
import { App } from './App';
import 'firebase/auth';
import { firebaseConfig } from './api/firebase-config';
import { store } from './store/store';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
