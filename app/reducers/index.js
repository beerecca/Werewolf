import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import gameSetup from './gameSetup';
import players from './players';
import windowSize from './windowSize';
import night from './night';
import roles from './roles';
import gameState from './gameState';
import error from './error';

const appReducer = combineReducers({
	gameSetup,
	players,
	windowSize,
	night,
	roles,
	gameState,
	error
});

export const rootReducer = combineReducers({
	app: appReducer,
	routing: routerReducer
});