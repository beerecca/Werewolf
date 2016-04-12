/**
 * Once an action has been dispatched, it comes through the pure reducer function, runs the appropriate method and updates the redux state.
 */

import { createReduxReducer } from './util/react-helpers';

export const initialState = {
	roles: [],
	players: [],
	isEditing: false,
	name: null,
	moderator: null,
	error: null,
    windowSize: { w: null, h: null }
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
		const order = state.players.length + 1;
		return {
			...state,
			players: [...state.players, {...action.player, order: order}]
		};
	},

	CREATE_GAME : (state, action) => {
		return {
			...state,
			name: action.name,
			moderator: action.moderator,
			isEditing: true
		};
	},

	SAVE_GAME : (state, action) => {
		return {
			...state,
			isEditing: false
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
