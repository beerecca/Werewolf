import { handleActions } from 'redux-actions';
import { initialState } from '../state';

export const night = handleActions({

	CHANGE_ACTION : (state, action) => {
		const { direction } = action.payload;
		const actionPosition = state.nightActions.findIndex(r => r.id == state.activeAction.id);
		const newPosition = actionPosition + ( direction == 'next' ? 1 : -1 );
		return {
			...state,
			activeAction: state.nightActions[newPosition]
		}
	},

	SET_NIGHT_ROLES : (state, action) => ({
		...state,
		nightActions : action.payload.filteredRoles,
		activeAction : action.payload.filteredRoles[0]
	}),

	SET_NIGHT_ACTIONS : (state, action) => ({
		...state,
		nightActions : action.payload.nightActions
	})

}, initialState.night);
