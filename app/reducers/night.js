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

	SELECT_PLAYER : (state, action) => {
		const { stage, phase, id } = action.payload;
		if (stage == 'night' && phase > 0) {

			const nightActions = state.nightActions.map(nightAction => {
				if (nightAction.id !== state.activeAction.id) return nightAction;

				return {
					...nightAction,
					target : nightAction.target === id ? null : id
				}
			});

			return {
				...state,
				nightActions
			}
		}
		return state;
	}
}, initialState.night);
