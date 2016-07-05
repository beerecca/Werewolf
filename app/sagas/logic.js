import { put, take, select } from 'redux-saga/effects';
import * as actions from '../actions';
import * as selectors from '../selectors';

export function* updateSelectionsSaga() {
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
