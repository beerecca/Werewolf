import { put, take, select } from 'redux-saga/effects';
import * as actions from '../actions';
import * as selectors from '../selectors';

export function* saveActionsSaga() {
	while (true) {

		yield take(actions.actionType.SAVE_ACTIONS);

		try {
			const phase = yield select(selectors.getGamePhase);

			if (phase === 0) {
				yield updatePlayers();
			} else {
				yield saveNightActions();
			}
		} catch(error) {
			yield put(actions.setError());
		}
	}
}


function* updatePlayers() {
	const roles = yield select(selectors.getAllRoles);
	const players = yield select(selectors.getPlayers);

	const defaultRole = roles.filter(role => role.isDefaultRole);

	const filledPlayers = players.map(player => ({
		...player,
		role: player.role ? player.role : defaultRole[0].id
	}));

	yield put(actions.updatePlayers(filledPlayers));
}

function* saveNightActions() {
	const nightActions = yield select(selectors.getActions);

	const postActions = nightActions.reduce((collection, action) => {
		if (action.target) {
			return collection.concat({
				role: action.id,
				player: action.target
			});
		}
		return collection;
	}, []);

	yield put(actions.saveNightActions(postActions));
}
