import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import HomePage from './home_page/home_page.jsx';
import NavBar from './navbar/navbar.jsx';

const _ensureLoggedIn = (store) => (nextState, replace) =>{
  if(!store.getState().session.currentUser){
    replace('/login');
  }
};

const AppRouter = (props, context) => {
  return (
    <Router history={ hashHistory }>
      <Route path="/" component={ HomePage }>
        <IndexRoute component={ NavBar } />
      </Route>
    </Router>
);
};

AppRouter.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default AppRouter;
