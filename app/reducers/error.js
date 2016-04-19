import { initialState } from '../state';
import { actionType } from '../actions';

export default function error(state = initialState.error, action) {
	switch(action.type) {

		case actionType.SET_ERROR:
			return {
				...state,
				error: true
			};

		default: return state;
	}
}
