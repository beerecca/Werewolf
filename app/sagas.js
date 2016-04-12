/**
 * Sagas are es6 generator functions that describe and run async side-effects of the redux actions in a tidy and testable way.
 */

import { put, fork, take, call, select } from 'redux-saga/effects';
import * as actions from './actions';
import * as api from './util/data';
import * as selectors from './selectors';

export default function* rootSaga() {
	yield fork(getRolesSaga);
	yield fork(saveGameSaga);
}

export function* getRolesSaga() {
	while (true) {

		yield take(actions.actionType.GET_ROLES);

		try {
			const roles = yield call(api.getRolesData);
			yield put(actions.setRoles(roles.Items));

		} catch(error) {
			yield put(actions.setError());
		}
	}
}

export function* saveGameSaga() {
	while (true) {

		yield take(actions.actionType.SAVE_GAME);

		try {
			const gameName = yield select(selectors.getGameName);
			const players = yield select(selectors.getPlayers);
			const postData = {
				name: gameName,
				players: players
			};
			yield call(api.saveGame, postData);

		} catch(error) {
			yield put(actions.setError());
		}
	}
}