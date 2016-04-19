import { initialState } from '../state';
import { actionType } from '../actions';

export default function game(state = initialState.roles, action) {
	switch(action.type) {

		case actionType.SET_ROLES:
			return action.roles;

		default: return state;
	}
}
