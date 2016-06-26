import { actionType } from './actionType';

export function createPlayer(player) {
	return { 
		type: actionType.CREATE_PLAYER,
		player
	}
}

export function deletePlayer(id) {
	return { 
		type: actionType.DELETE_PLAYER,
		id
	}
}

export function selectPlayer(id, state, phase, role) {
	return { 
		type: actionType.SELECT_PLAYER,
        state,
        phase,
        role,
		id
	}
}

export function updatePlayer(id, name, role) {
	return { 
		type: actionType.UPDATE_PLAYER,
		id,
		name,
		role
	}
}

export function setPlayers(players) {
    return {
        type: actionType.SET_PLAYERS,
        players
    }
}

export function setSelection(selectionType, onlyOne, playerIds = []) {
    return {
        type: actionType.SET_SELECTION,
        selectionType,
        onlyOne,
        playerIds
    }
}
