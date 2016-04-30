import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import game from './game';
import players from './players';
import windowSize from './windowSize';
import night from './night';
import roles from './roles';
import error from './error';

const appReducer = combineReducers({
	game,
	players,
	windowSize,
	night,
	roles,
	error
});

export const rootReducer = combineReducers({
	app: appReducer,
	routing: routerReducer
});
