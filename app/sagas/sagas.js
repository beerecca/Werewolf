/**
 * Sagas are es6 generator functions that describe and run async side-effects of the redux actions in a tidy and testable way.
 */

import { fork } from 'redux-saga/effects';
import * as api from './api';
import * as logic from './logic';

export default function* rootSaga() {
	yield fork(api.getRolesSaga);
	yield fork(api.startGameSaga);
	yield fork(api.updatePlayerSaga);
	yield fork(api.saveActionsSaga);
	yield fork(api.saveAccusationsSaga);

	yield fork(logic.setNightRolesSaga);
	yield fork(logic.updateSelectionsSaga);
}

