import { initialState } from '../state';
import { actionType } from '../actions';

export default function windowSize(state = initialState.windowSize, action) {
	switch(action.type) {

		case actionType.WINDOW_RESIZE:
			return action.windowSize;

		default: return state;
	}
}
