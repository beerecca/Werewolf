import { actionType } from './actionType';

export function startGame(filteredRoles) {
	return { 
		type: actionType.START_GAME,
		filteredRoles
	}
}

export function changeAction(direction) {
    return {
        type: actionType.CHANGE_ACTION,
        direction
    }
}

export function saveActions() {
    return {
        type: actionType.SAVE_ACTIONS
    }
}