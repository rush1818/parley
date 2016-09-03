import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import HomePage from './home_page/home_page.jsx';
import NavBarContainer from './navbar/navbar_container.jsx';
import Content from './content/content.jsx';
import App from './app.jsx';
import MessageIndexContainer from '../components/message/message_index_container.jsx';
import ChannelDetailContainer from '../components/channel/channel_detail_container.jsx';

import {FETCH_CONDITIONS, requestAllMessages, createMessage, removeMessage, removeMessageFromStore} from '../actions/message_actions.js';


const AppRouter = (props, context) => {
  const _redirectIfLoggedIn = (nextState, replace) => {
    if(context.store.getState().session.currentUser){
      replace('/channels/general?1');
    }
  };

  const _ensureLoggedIn = (nextState, replace) =>{
    if(!context.store.getState().session.currentUser){
      replace('/');
    }
  };
  const _checkRoute = (nextState, replace) =>{

  };

  const _fetchMessages =(nextState, replace) => {
    let channelId = nextState.location.search.slice(1);
    context.store.dispatch(requestAllMessages(FETCH_CONDITIONS.FIRST_FETCH, channelId));
  };

  return (
    <Router history={ hashHistory }>
      <Route path="/" component={ App }>
        <IndexRoute component={ HomePage } onEnter={_redirectIfLoggedIn}/>
        <Route path='/channels' component={Content} onEnter={_ensureLoggedIn}>
        <Route path="/channels/:channel_name" component={ChannelDetailContainer} onEnter={_fetchMessages}/>
        </Route>
      </Route>
      <Route path="/messages" component={MessageIndexContainer} />
    </Router>
);
};

AppRouter.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default AppRouter;
