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


    SET_SELECTION : (state, action) => {
		const { selectionType, playerIds } = action.payload;
		if (selectionType === 'vote') {
			const votingPlayers = playerIds.filter(id=>id !== state.accusation.accused);
			const votes = votingPlayers.map(id=>{
				return {
					player: id,
					die: false
				}
			});

			return {
				...state,
				accusation: {
					...state.accusation,
					votes: votes
				}
			}
		}

		return state;
	},

	SET_ACCUSATION : (state, action) => ({
		...state,
		accusation: action.payload.accusation
    })

}, initialState.day);
