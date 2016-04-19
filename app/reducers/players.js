import { initialState } from '../state';
import { actionType } from '../actions';

export default function players(state = initialState.players, action) {
	switch(action.type) {

		case actionType.CREATE_PLAYER:
			const order = state.length + 1;
			return [
				...state,
				{...action.player, order: order}
			];

		default: return state;
	}
}
