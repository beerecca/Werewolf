import { actionType } from './actionType';

export function createPlayer(player) {
	return { 
		type: actionType.CREATE_PLAYER,
		player
	}
}

export function selectPlayer(id, state, phase) {
	return { 
		type: actionType.SELECT_PLAYER,
        state,
        phase,
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
