import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './api/firebase-config';
import { Provider } from 'react-redux';
import { store } from './store/store';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,

  document.getElementById('root')
);
