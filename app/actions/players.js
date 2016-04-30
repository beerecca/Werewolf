import { actionType } from './actionType';

export function createPlayer(player) {
	return { 
		type: actionType.CREATE_PLAYER,
		player
	}
}

export function editPlayer(id) {
	return { 
		type: actionType.EDIT_PLAYER,
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