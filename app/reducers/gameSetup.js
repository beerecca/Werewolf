import { initialState } from '../state';
import { actionType } from '../actions';

export default function gameSetup(state = initialState.gameSetup, action) {
	switch(action.type) {

		case actionType.CREATE_GAME:
			return {
				...state,
				name: action.name,
				moderator: action.moderator
			};

		default: return state;
	}
}
