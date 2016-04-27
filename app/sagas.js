/**
 * Sagas are es6 generator functions that describe and run async side-effects of the redux actions in a tidy and testable way.
 */

import { put, fork, take, call, select } from 'redux-saga/effects';
import * as actions from './actions';
import * as api from './util/data';
import * as filters from './util/filters';            
import * as selectors from './selectors';

export default function* rootSaga() {
	yield fork(getRolesSaga);
	yield fork(startGameSaga);
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
			
			const gameData = yield call(api.saveGame, postData);
            
            //need to store players, etc from the gameData, not just ID 
            yield put(actions.setGameId(gameData.id));
            
            const roles = yield select(selectors.getRoles);
            const filteredPlayers = filters.filterRoles(gameData.players, roles);
            yield put(actions.setNight(filteredPlayers));

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
            yield put(actions.changeState('day-review'));
        } catch(error) {
            yield put(actions.setError());
        }
    
    }
}

export function* saveAccusationsSaga() {
    while (true) {
        
        yield take(actions.actionType.SAVE_ACCUSATIONS);

        try {
            const gameId = yield select(selectors.getGameId);
            const phase = yield select(selectors.getPhase);
            const accusations = yield select(selectors.getAccusations);
            const data = { gameId, phase, accusations };
            
            yield call(api.saveAccusations, data);
            yield put(actions.changeState('night'));
        
        } catch(error) {
            yield put(actions.setError());
        }   
    }
}
