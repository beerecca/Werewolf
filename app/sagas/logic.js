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
            const roleMap = yield select(selectors.getAllRoles);
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
