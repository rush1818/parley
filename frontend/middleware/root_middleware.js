import { applyMiddleware } from 'redux';
import SessionMiddleware from './session_middleware';
import MessageMiddleware from './message_middleware.js';
import UserMiddleware from './user_middlware.js';

const RootMiddleware = applyMiddleware(
    SessionMiddleware,
    MessageMiddleware,
    UserMiddleware
);

export default RootMiddleware;
