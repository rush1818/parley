import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import configureStore from './store/store.js';
import Root from './components/root.jsx';
import * as SessionAPI from './util/session_api_util.js';

  document.addEventListener('DOMContentLoaded', ()=>{
  const rootEl = document.getElementById('root');
  Modal.setAppElement(document.body);
  let store;
  if(window.currentUser){
    const preloadedState = {session: {currentUser: window.currentUser, errors:[]}};
    store = window.store = configureStore(preloadedState);
  } else {
    store = window.store = configureStore();
  }

  ReactDOM.render(<Root store={store}/>, rootEl);
});
