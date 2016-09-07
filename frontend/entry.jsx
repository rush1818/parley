import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import configureStore from './store/store.js';
import Root from './components/root.jsx';


  document.addEventListener('DOMContentLoaded', ()=>{
  const rootEl = document.getElementById('root');
  Modal.setAppElement(document.body);
  let store;
  if(window.currentUser){
    const preloadedState = {session: {currentUser: window.currentUser, errors:[]}};
    store = configureStore(preloadedState);
  } else {
    store = configureStore();
  }

  ReactDOM.render(<Root store={store}/>, rootEl);

});
