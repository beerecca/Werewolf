import { actionType } from './actionType';

export function createPlayer(player) {
	return { 
		type: actionType.CREATE_PLAYER,
		player
	}
}