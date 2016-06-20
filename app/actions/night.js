import { actionType } from './actionType';

export function startGame(selectedRoles) {
	return { 
		type: actionType.START_GAME,
        selectedRoles
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

export function setNightRoles(filteredRoles) {
    return {
        type: actionType.SET_NIGHT_ROLES,
        filteredRoles
    }
}

export function setNight() {
    return {
        type: actionType.SET_NIGHT
    }
}
