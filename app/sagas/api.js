import { put, take, call, select } from 'redux-saga/effects';
import * as actions from '../actions';
import * as selectors from '../selectors';

import * as api from '../util/data';

export function* getRolesSaga() {
	while (true) {

		yield take(actions.actionType.CREATE_GAME);

		try {
			const data = yield call(api.getRolesData);

			const roles = data.Items.reduce((collection, role) => {
				collection[role.id] = role;
				return collection;
			}, {});

			yield put(actions.setRoles(roles));

		} catch(error) {
			yield put(actions.setError());
		}
	}
}

export function* updatePlayersSaga() {
	while (true) {

		const action = yield take(actions.actionType.UPDATE_PLAYERS);

		try {
			const { players } = action.payload;
			const gameId = yield select(selectors.getGameId);

			const data = {
				gameId,
				players
			};
			const gameData = yield call(api.savePlayers, data);
			yield put(actions.setPlayers(gameData.players));
			yield put(actions.startAccusations());

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
			yield put(actions.setNight());
		} catch(error) {
			yield put(actions.setError());
		}
	}
}

export function* saveNightActionsSaga() {
	while (true) {

		const action = yield take(actions.actionType.SAVE_NIGHT_ACTIONS);

		try {
			const { postActions } = action.payload;
			const gameId = yield select(selectors.getGameId);
			const phase = yield select(selectors.getGamePhase);

			const data = { gameId, phase, postActions };
			const gameData = yield call(api.saveActions, data);
			yield put(actions.setPlayers(gameData.players));
			yield put(actions.setDayReview(gameData.phases['' + phase].actions));

		} catch(error) {
			yield put(actions.setError());
		}

	}
}

//TODO: once cancel is clicked, get the game from this api call, put it in the state and go back to start of day phase
export function* saveAccusationsSaga() {
	while (true) {

		yield take(actions.actionType.SAVE_ACCUSATIONS);

		try {
			const gameId = yield select(selectors.getGameId);
			const phase = yield select(selectors.getGamePhase);
			const accusation = yield select(selectors.getAccusation);
			const roles = yield select(selectors.getAllRoles);
			const data = { gameId, phase, accusation };

			const gameData = yield call(api.saveAccusation, data);
			yield put(actions.setPlayers(gameData.game.players));
			//Werewolves win if numWolves >= numVillagers
			//Villagers win if all werewolves die
			const werewolves = gameData.game.players.filter(player => roles[player.role].name === 'Werewolf');

			const villagers = gameData.game.players.filter(player=>{
				return !werewolves.some(werewolf=> werewolf.id === player.id);
			});

			const numAliveWerewolves = werewolves.filter(wolf=>wolf.alive).length;
			const numAliveVillagers = villagers.filter(villager=>villager.alive).length;

			const werewolvesWin = numAliveWerewolves >= numAliveVillagers;
			const villagersWin = werewolves.every(werewolf=>!werewolf.alive);
			const voteKilledSomeone = gameData.message === 'Vote succeeded';

			if (villagersWin) {
				yield put(actions.werewolvesWin(false));
			} else if (werewolvesWin) {
				yield put(actions.werewolvesWin(true));
			} else if (voteKilledSomeone) {
				yield put(actions.incrementPhase());
				yield put(actions.setNight());
			} else { //either no-one died in the vote, or cancel was pressed
				yield put(actions.updatePage('accuse'));
				yield put(actions.resetAccusations());
				yield put(actions.startAccusations());
			}

		} catch(error) {
			yield put(actions.setError());
		}
	}
}
