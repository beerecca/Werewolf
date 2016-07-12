import { handleActions } from 'redux-actions';
import { initialState } from '../state';

export const game = handleActions({

	CHOOSE_ROLES : (state, action) => ({
		...state,
		stage: 'setup-roles'
	}),

	CREATE_GAME : (state, action) => ({
		...state,
		name : action.payload.name,
		moderator : action.payload.moderator,
		stage: 'setup-player'
	}),

	START_ACCUSATIONS : (state, action) => ({
		...state,
		stage: 'day-accuse'
	}),

	SET_NIGHT_ROLES : (state, action) => ({
		...state,
		stage: 'night'
	}),

	SET_DAY_REVIEW : (state, action) => ({
		...state,
		stage: 'day-review'
	}),

	WEREWOLVES_WIN : (state, action) => ({
		...state,
		stage: 'end-game',
		werewolvesWin: action.payload.win
	}),

	SET_GAMEID : (state, action) => ({
		...state,
		id : action.payload.id
	}),

	INCREMENT_PHASE : (state, action) => ({
		...state,
		phase : state.phase + 1
	})

}, initialState.game);
