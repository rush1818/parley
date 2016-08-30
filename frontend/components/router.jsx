import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import HomePage from './home_page/home_page.jsx';
import NavBarContainer from './navbar/navbar_container.jsx';
import Content from './content/content.jsx';

const _ensureLoggedIn = (store) => (nextState, replace) =>{
  console.log('not logged in');
  if(!store.getState().session.currentUser){
    replace('/');
  }
};

const _redirectIfLoggedIn =(store) => (nextState, replace) => {
  console.log('login redirect');
  if(store.getState().session.currentUser){
    replace('/channels');
  }
};

const AppRouter = (props, context) => {
  return (
    <Router history={ hashHistory }>
      <Route path="/" component={ HomePage }
          onEnter={_redirectIfLoggedIn(context.store)}>

        <IndexRoute component={ NavBarContainer } />
        </Route>
        <Route path='/channels' component={Content}
        >
      </Route>
    </Router>
);
};

AppRouter.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default AppRouter;
