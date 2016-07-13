import { handleActions } from 'redux-actions';
import { initialState } from '../state';

export const day = handleActions({
	SET_DAY_REVIEW: (state, action) => ({
		...state,
		reviewActions: action.payload.actions
	}),

	START_ACCUSATIONS: (state, action) => ({
		...state,
		page: 'accuse'
	}),

	RESET_ACCUSATIONS : (state, action) => ({
		...state,
		accusation : {
			accused: null,
			accusedBy: [],
			votes: []
		}
	}),

	UPDATE_PAGE : (state, action) => ({
		...state,
		page: action.payload.page
	}),

	SET_VOTES : (state, action) => ({
		...state,
		accusation: {
			...state.accusation,
			votes: action.payload.votes
		}
	}),

	SET_ACCUSATION : (state, action) => ({
		...state,
		accusation: action.payload.accusation
    })

}, initialState.day);
