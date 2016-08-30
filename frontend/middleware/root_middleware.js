import { applyMiddleware } from 'redux';
import SessionMiddleware from './session_middleware';
import MessageMiddleware from './message_middleware.js';

const RootMiddleware = applyMiddleware(
    SessionMiddleware,
    MessageMiddleware
);

export default RootMiddleware;
