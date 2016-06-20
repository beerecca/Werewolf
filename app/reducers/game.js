import { initialState } from '../state';
import { actionType } from '../actions';

export default function game(state = initialState.game, action) {
	switch(action.type) {

        case actionType.CHOOSE_ROLES:
            return {
                ...state,
                state: 'setup-roles'
            };

		case actionType.CREATE_GAME:
			return {
				...state,
				name: action.name,
				moderator: action.moderator,
                state: 'setup-player'
			};

		case actionType.START_ACCUSATIONS:
			return {
                ...state,
                state: 'day-accuse'
            };
        
        case actionType.SET_NIGHT:
            return {
                ...state,
                state: 'night'
            }

        case actionType.SET_DAY_REVIEW:
            return {
                ...state,
                state: 'day-review'
            }

        case actionType.SET_GAMEID:
            return {
                ...state,
                id : action.id
            };

        case actionType.INCREMENT_PHASE:
            return {
                ...state,
                phase: state.phase + 1
            };

		default: return state;
	}
}
