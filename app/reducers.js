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
    windowSize: { w: null, h: null },
    gameState : 'setup-game',
    nightRoles : [],
    activeRole : null,
    actions: [],
    phase: 0
};

export const WerewolfApp = {

	SET_ROLES : (state, action) => {
		return {
			...state,
			roles: action.roles,
            nightRoles: action.roles,
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
            gameState: 'setup-player',
			name: action.name,
			moderator: action.moderator
		};
	},

	SAVE_GAME : (state, action) => {
		return {
			...state
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
    },

    CHANGE_ROLE : (state, action) => {
        const rolePosition = state.nightRoles.findIndex(r => r.id == state.activeRole.id);
        const newPosition = rolePosition + ( action.direction == 'next' ? 1 : -1 );
        return {
            ...state,
            activeRole: state.nightRoles[newPosition]
        }
    },

    SAVE_PLAYERS : (state, action) => {
        return {
            ...state,
            players: action.players
        }
    },

    SAVE_ACTIONS : (state,action) => {
        return {
            ...state,
            gameState: 'day-review'    
        }
    },

    SET_GAME_STATE : (state, action) => {
        if (action.gameState == 'night') {
            let roleMap = state.roles.reduce((map, role) => {
                map[role.id] = role;
                return map;
            }, {});

            let playerRoles = state.players.reduce((roles, player) => {
                roles[player.role] = roleMap[player.role];
                return roles;
            }, {});

            let nightRoles = Object.values(playerRoles);

            return {
                ...state,
                gameState: action.gameState,
                nightRoles,
                activeRole: nightRoles[0]
            } 
        }

        return {
            ...state,
            gameState: action.gameState
        }
    }
};

export const appStateReducer = (state = initialState, action) => createReduxReducer(state, action, WerewolfApp, initialState);
