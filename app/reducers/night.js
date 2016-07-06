import { initialState } from '../state';
import { actionType } from '../actions';

export default function night(state = initialState.night, action) {
	switch(action.type) {

		case actionType.CHANGE_ACTION:
			const actionPosition = state.nightActions.findIndex(r => r.id == state.activeAction.id);
			const newPosition = actionPosition + ( action.direction == 'next' ? 1 : -1 );
			return {
				...state,
				activeAction: state.nightActions[newPosition]
			}

        case actionType.SET_NIGHT_ROLES:
            return {
                ...state,
                nightActions: action.filteredRoles,
                activeAction: action.filteredRoles[0]
            }

        case actionType.SELECT_PLAYER:

            if (action.state == 'night' && action.phase > 0) {

                const nightActions = state.nightActions.map(nightAction => {
					if (nightAction.id !== state.activeAction.id) return nightAction;

					return {
						...nightAction,
						target : nightAction.target === action.id ? null : action.id
					}
                });

                return {
                    ...state,
                    nightActions
                }
            }
            return state;

		default: return state;
	}
}
