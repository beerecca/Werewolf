import { put, take, select } from 'redux-saga/effects';
import * as actions from '../actions';
import * as selectors from '../selectors';

export function* updateSelectionsSaga() {
	while (true) {

		yield take([ actions.actionType.SET_NIGHT_ROLES, actions.actionType.CHANGE_ACTION ]);
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


export function* setNightRolesSaga() {
    while (true) {
        yield take(actions.actionType.SET_NIGHT);
        try {
            const phase = yield select(selectors.getGamePhase);
            //if phase === 9, we select all the game selected roles (we need to assign them)
            //else, get the roles from active players that have night actions
            if (phase === 0) {
                //select all roles
                const activeRoles = yield select(selectors.getSelectedRoles);
                yield put(actions.setNightRoles(activeRoles));
                continue;
            }

			const players = yield select(selectors.getPlayers);
            const allRoles = yield select(selectors.getAllRoles);
            const roleMap = allRoles.reduce((roles, role) => {
                roles[role.id] = role;
                return roles;
            }, {});
            const allAliveRoles = players.map(player => {
                return player.alive ? player.role : null;
            });
            const activeRoles = allAliveRoles.reduce((roles, role) => {
                if (!role || roles.includes(role) || !roleMap[role].hasNightAction) return roles;
                return roles.concat(roleMap[role]);
            }, []);
            yield put(actions.setNightRoles(activeRoles));
        } catch(error) {
            yield put(actions.setError());
        }
    }
}

export function* setDefaultVotesSaga() {
	while (true) {
		const action = yield take(actions.actionType.SET_SELECTION);
		const { selectionType } = action.payload;
		try {
			if (selectionType !== 'vote') continue;
			const players = yield select(selectors.getPlayers);
			const alivePlayers = players.reduce((collection, player) => player.alive ? collection.concat(player) : collection, []);

			//set up the day accusation with appropriate votes
			const accusation = yield select(selectors.getAccusation);
			const votes = alivePlayers.reduce((collection, player) => {
				if (player.id !== accusation.accused) {
					return collection.concat({
						player: player.id,
						die: false
					});
				}
				return collection;
			}, []);

			yield put(actions.setVotes(votes));

			const selections = yield select(selectors.getSelections);
			const { activeSelections } = selections;

			const existingSelections = activeSelections.map(selection=>{
				if (selection.type.includes('accused')) return selection;
				return {
					...selection,
					type: selection.type.concat('voteSave')
				}
			});
			//create array of player ids that don't exist in activeSelections
			const otherPlayers = alivePlayers.filter(player => {
				return !activeSelections.some(selection => selection.player === player.id);
			});

			const newSelections = otherPlayers.map(player => ({
				player: player.id,
				type: ['voteSave']
			}));

			yield put(actions.setSelections(existingSelections.concat(newSelections)));

		} catch (error) {
			console.log(error);
            yield put(actions.setError());
		}
	}
}

export function* setSelectionsSaga() {
	while (true) {
		const action = yield take(actions.actionType.SELECT_PLAYER);
		try {
			const state = yield select(selectors.getSelections);
			if (!state.selectionType) continue;

			const players = yield select(selectors.getPlayers);
			const selectedPlayer = players.filter(player => player.id === action.payload.id);
			if (!selectedPlayer[0].alive) continue;

			let selections;
			switch (state.selectionType) {
				case 'vote':
					selections = computeVoteSelections(state, action);
					break;
				default:
					selections = computeNormalSelections(state, action);
					break;
			}
			yield put(actions.setSelections(selections));
		} catch (error) {
			yield put(actions.setError());
		}
	}
}

export function* createAccusationSaga() {
	while (true) {
		const action = yield take(actions.actionType.SELECT_PLAYER);
		const { stage, id } = action.payload;
		try {
			if (stage !== 'day-accuse') continue;

			const players = yield select(selectors.getPlayers);
			const selectedPlayer = players.filter(player => player.id === id);
			if (!selectedPlayer[0].alive) continue;

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

		} catch (error) {
			yield put(actions.setError());
		}
	}
}



function computeVoteSelections(state, action) {
	const { id } = action.payload;
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

function computeNormalSelections(state, action) {
	const { id } = action.payload;
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
