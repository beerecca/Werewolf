import { initialState } from '../state';
import { actionType } from '../actions';

export default function gameState(state = initialState.gameState, action) {
	switch(action.type) {

		case actionType.CREATE_GAME:
			return 'setup-player';

		case actionType.START_GAME:
			return 'night';

		case actionType.SAVE_ACTIONS:
			return 'day-review';

		default: return state;
	}
}
