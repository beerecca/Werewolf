/**
 * Sagas are es6 generator functions that describe and run async side-effects of the redux actions in a tidy and testable way.
 */

import { put, fork, take, call, select } from 'redux-saga/effects';
import * as actions from './actions';
import * as api from './util/data';
//import * as filters from './util/filters';			
import * as selectors from './selectors';

export default function* rootSaga() {
	yield fork(getRolesSaga);
	yield fork(startGameSaga);
	yield fork(updatePlayerSaga);
	yield fork(saveActionsSaga);
	yield fork(saveAccusationsSaga);
	yield fork(updateSelections);
}


export function* updateSelections() {
	while (true) {

		yield take([ actions.actionType.SET_NIGHT, actions.actionType.CHANGE_ACTION ]);
        const gamePhase = yield select(selectors.getGamePhase);
        //only need to run when gamephase isn't 0
        if (gamePhase != 0) {
		    const activeAction = yield select(selectors.getActiveAction);
		    const selectionType = activeAction.name.replace(/\ /, '').toLowerCase();
		    const onlyOne = selectionType != 'mason';
		
            yield put(actions.setSelection(selectionType, onlyOne));
        }
	}
}

export function* getRolesSaga() {
	while (true) {

		yield take(actions.actionType.CREATE_GAME);

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

		yield take(actions.actionType.SAVE_ACTIONS);

		try {
			const phase = yield select(selectors.getGamePhase);
			const gameId = yield select(selectors.getGameId);
			const players = yield select(selectors.getPlayers);
			//If we're in the first night phase, we can post to the api to save players
			//If we're in any other phase, you can't edit players anymore
			if (phase === 0) {
				const data = {
					gameId,
					players
				};
				const gameData = yield call(api.savePlayers, data);
				yield put(actions.setPlayers(gameData.players));
				yield put(actions.startAccusations());
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
			
			const gameData = yield call(api.saveGame, postData);
			
			yield put(actions.setGameId(gameData.id));
			yield put(actions.setPlayers(gameData.players));
			
			const roles = yield select(selectors.getSelectedRoles);
			//TODO: move when player/role setup is finished, to phase > 1 action
			//const filteredPlayers = filters.filterNightRoles(gameData.players, roles);
			//yield put(actions.setNight(filteredPlayers));
			yield put(actions.setNight(roles));

		} catch(error) {
			yield put(actions.setError());
		}
	}
}

export function* saveActionsSaga() {
	while (true) {
	
		yield take(actions.actionType.SAVE_ACTIONS);
		
		try {
			const phase = yield select(selectors.getGamePhase);
			
			if (phase !== 0) {
				const gameId = yield select(selectors.getGameId);
				const nightActions = yield select(selectors.getActions);
				
				const postActions = [];
				nightActions.forEach(action => {
					if (action.target) {
						postActions.push({
							role: action.id,
							player: action.target
						});
					}
				});

				const data = { gameId, phase, postActions };

				const gameData = yield call(api.saveActions, data);
				yield put(actions.setPlayers(gameData.players));
				yield put(actions.setDayReview(gameData.phases['' + phase].actions));
			}
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
			const phase = yield select(selectors.getGamePhase);
			const accusations = yield select(selectors.getAccusations);
			const data = { gameId, phase, accusations };
			
			yield call(api.saveAccusations, data);
			yield put(actions.changeState('night'));
		
		} catch(error) {
			yield put(actions.setError());
		}   
	}
}
