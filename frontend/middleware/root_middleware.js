import { applyMiddleware } from 'redux';
import SessionMiddleware from './session_middleware';
import MessageMiddleware from './message_middleware.js';
import UserMiddleware from './user_middlware.js';
import ChannelMiddleware from './channel_middleware.js';

const RootMiddleware = applyMiddleware(
    SessionMiddleware,
    MessageMiddleware,
    UserMiddleware,
    ChannelMiddleware
);

export default RootMiddleware;
