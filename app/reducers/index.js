import { combineReducers } from 'redux';

import { game } from './game';
import { players } from './players';
import { night } from './night';
import { roles } from './roles';
import { error } from './error';
import { day } from './day';
import { selections } from './selections';

const appReducer = combineReducers({
	game,
	players,
	night,
    day,
	roles,
	error,
    selections
});

export const rootReducer = combineReducers({
	app: appReducer
});
