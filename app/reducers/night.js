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

        case actionType.SET_NIGHT:
            return {
                ...state,
                nightActions: action.filteredRoles,
                activeAction: action.filteredRoles[0]
            }

        case actionType.SELECT_PLAYER:
            const nightActions = state.nightActions;

            if (action.state == 'night' && action.phase !== 0) {
                const currentAction = nightActions.find(nightAction => nightAction.id === state.activeAction.id);
                currentAction.target = action.id;
            }
            
            return {
                ...state,
                nightActions
            }

		default: return state;
	}
}
