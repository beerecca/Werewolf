import { initialState } from '../state';
import { actionType } from '../actions';

export default function gameSetup(state = initialState.game, action) {
	switch(action.type) {

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
        
        //TODO: remove this, change of state will have a specific action
		case actionType.CHANGE_STATE:
            return {
                ...state,
                state: action.state
            };

        case actionType.SET_NIGHT:
            return {
                ...state,
                state: 'night'
            }

        case actionType.SET_GAMEID:
            return {
                ...state,
                id : action.id
            };

		default: return state;
	}
}
