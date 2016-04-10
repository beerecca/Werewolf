/**
 * Once an action has been dispatched, it comes through the pure reducer function, runs the appropriate method and updates the redux state.
 */

import { createReduxReducer } from './util/react-helpers';

export const initialState = {
	roles : [],
	players : [],
	game : null,
	error : null,
    windowSize : { w: null, h: null }
};

export const WerewolfApp = {

	SET_ROLES : (state, action) => {
		return {
			...state,
			roles: action.roles,
			error: false
		};
	},

	CREATE_PLAYER : (state, action) => {
		return {
			...state,
			players: [...state.players, action.player]
		};
	},

	CREATE_GAME : (state, action) => {
		return {
			...state,
			game: action.game
		};
	},

	SET_ERROR : (state, action) => {
		return {
			...state,
			error: true
		};
	},

    WINDOW_RESIZE : (state, action) => {
        return {
            ...state,
            windowSize: action.windowSize
        }
    }
};

export const appStateReducer = (state = initialState, action) => createReduxReducer(state, action, WerewolfApp, initialState);
