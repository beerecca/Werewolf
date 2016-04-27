import { actionType } from './actionType';

export function startGame() {
	return { 
		type: actionType.START_GAME
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

export function setNight(filteredRoles) {
    return {
        type: actionType.SET_NIGHT,
        filteredRoles
    }
}
