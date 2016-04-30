/**
 * Sagas are es6 generator functions that describe and run async side-effects of the redux actions in a tidy and testable way.
 */

import { put, fork, take, call, select } from 'redux-saga/effects';
import * as actions from './actions';
import * as api from './util/data';
import * as selectors from './selectors';

export default function* rootSaga() {
	yield fork(getRolesSaga);
	yield fork(startGameSaga);
	yield fork(updatePlayerSaga);
	yield fork(saveActionsSaga);
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

export function* updatePlayerSaga() {
	while (true) {

		yield take(actions.actionType.UPDATE_PLAYER);

		try {
			const phase = yield select(selectors.getPhase);
			const state = yield select(selectors.getState);
			const gameId = yield select(selectors.getGameId);
			const players = yield select(selectors.getPlayers);

			//If we're in a setup state, don't post the api as startGame will do that
			//If we're in the first night phase, we can post to the api to save players
			//If we're in any other state, you can't edit players anymore
			if (phase === 0 && state === 'night') {
				const data = {
					gameId,
					players
				};
				yield call(api.savePlayers(data));	
			}

		} catch(error) {
			yield put(actions.setError());
		}
	}
}

export function* startGameSaga() {
	while (true) {

		yield take(actions.actionType.START_GAME);

		try {
			const name = yield select(selectors.getGameName);
			const moderator = yield select(selectors.getGameModerator);
			const players = yield select(selectors.getPlayers);
			const postData = {
				name,
				moderator,
				players
			};
			
			yield call(api.saveGame, postData);

		} catch(error) {
			yield put(actions.setError());
		}
	}
}

export function* saveActionsSaga() {
    while (true) {
    
        yield take(actions.actionType.SAVE_ACTIONS);
        
        try {
            const gameId = yield select(selectors.getGameId);
            const phase = yield select(selectors.getPhase);
            const actions = yield select(selectors.getActions);
            const data = { gameId, phase, actions };

            yield call(api.saveActions, data);

        } catch(error) {
            yield put(actions.setError());
        }
    
    }
}
