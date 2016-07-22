/**
 * Sagas are es6 generator functions that describe and run async side-effects of the redux actions in a tidy and testable way.
 */

import { fork } from 'redux-saga/effects';
import * as api from './api';
import * as logic from './logic';
import * as selectPlayer from './selectPlayer';
import * as saveActions from './saveActions';

export default function* rootSaga() {
	yield fork(api.getRolesSaga);
	yield fork(api.startGameSaga);
	yield fork(api.updatePlayersSaga);
	yield fork(api.saveNightActionsSaga);
	yield fork(api.saveAccusationsSaga);

	yield fork(logic.updateSelectionsSaga);
	yield fork(logic.setNightRolesSaga);
	yield fork(logic.setDefaultVotesSaga);

	yield fork(saveActions.saveActionsSaga);
	yield fork(selectPlayer.selectPlayerSaga);
}

