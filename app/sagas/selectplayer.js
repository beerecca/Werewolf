import { put, take, select } from 'redux-saga/effects';
import * as actions from '../actions';
import * as selectors from '../selectors';

export function* selectPlayerSaga() {
	while (true) {
		const action = yield take(actions.actionType.SELECT_PLAYER);
		const { id } = action.payload;

		try {
			//we should only be able to select alive players
			const players = yield select(selectors.getPlayers);
			const selectedPlayer = players.filter(player => player.id === id);
			if (!selectedPlayer[0].alive) continue;

			//based on the active selection type, we need to do some selection:
			yield setSelections(id);

			const stage = yield select(selectors.getGameStage);
			const phase = yield select(selectors.getGamePhase);
			switch (stage) {
				case 'day-accuse':
					yield createAccusations(id);
					break;
				case 'night':
					if (phase === 0) yield setPlayerRole(selectedPlayer[0]);
					else yield createAction(id);
					break;
				default:
			}

		} catch (error) {
			yield put(actions.setError());
		}
	}
}

function* setSelections(id) {
	const selections = yield select(selectors.getSelections);
	if (!selections.selectionType) return;

	const newSelections = selections.selectionType === 'vote' ? yield computeVoteSelections(selections, id) : yield computeNormalSelections(selections, id);

	yield put(actions.setSelections(newSelections));
}

function* setPlayerRole(selectedPlayer) {
	const activeAction = yield select(selectors.getActiveAction);
	const role = selectedPlayer.role === activeAction.id ? null : activeAction.id;

	yield put(actions.setPlayerRole(selectedPlayer.id, role));
}

function* createAction(id) {
	const nightActions = yield select(selectors.getActions);
	const activeAction = yield select(selectors.getActiveAction);

	const newNightActions = nightActions.map(nightAction => {
		if (nightAction.id !== activeAction.id) return nightAction;

		return {
			...nightAction,
			target : nightAction.target === id ? null : id
		}
	});

	yield put(actions.setNightActions(newNightActions));
}


function* createAccusations(id) {

	const stateAccusation = yield select(selectors.getAccusation);
	const page = yield select(selectors.getDayPage);

	let accusation;
	switch (page) {
		case 'accuse':
			accusation = {
			...stateAccusation,
			accused : (stateAccusation.accused === id) ? null : id
		};
		break;
	case 'accusers':
			accusation = {
				...stateAccusation,
				accusedBy : (stateAccusation.accusedBy.includes(id))
					? stateAccusation.accusedBy.filter(accusedId => accusedId !== id)
					: stateAccusation.accusedBy.concat(id)
			};
			break;
		case 'vote':
			accusation = {
				...stateAccusation,
				votes : stateAccusation.votes.map(vote=>{
					if (vote.player === id) {
						return {
							player: vote.player,
							die: !vote.die
						}
					}
					return vote;
				})
			};
			break;
		default:
	}
	yield put(actions.setAccusation(accusation));
}

function* computeVoteSelections(state, id) {
	return state.activeSelections.map(selection=>{
		if (selection.player === id && !selection.type.includes('accused')) {
			const typeList = (selection.type.includes('voteSave'))
				? selection.type.filter(type=>type !== 'voteSave').concat('voteKill')
				: selection.type.filter(type=>type !== 'voteKill').concat('voteSave');

			return {
				...selection,
				type: typeList
			}
		}

		return selection;
	});
}

function* computeNormalSelections(state, id) {
	//1. when you select a player that already has a selection of that type, unselect them
	//2. if a different type, don't unselect them, just add that type
	//3. if onlyOne is true, remove any player that is not the action player (the selection has been made in 1)
	//a. if player doesn't exist, add it and it's new selection to the array
	let foundPlayer = false;

	const adjustedSelections = state.activeSelections.map(selection => {
		if (selection.player === id) {
			foundPlayer = true;
			let playerSelections;
			if (selection.type.includes(state.selectionType)) {
				playerSelections = selection.type.filter(selectionType => selectionType !== state.selectionType);
			} else {
				playerSelections = selection.type.concat(state.selectionType);
			}
			return { player: id, type: playerSelections };
		}

		if (state.onlyOne) {
			const playerSelections = selection.type.filter(selectionType => selectionType !== state.selectionType);
			return { player: selection.player, type: playerSelections };
		}

		return selection;
	});

	const filteredSelections = adjustedSelections.filter(selection => selection.type.length !== 0);
	const activeSelections = foundPlayer ? filteredSelections : filteredSelections.concat({ player: id, type: [ state.selectionType ] });

	return activeSelections;
}
