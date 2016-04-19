import { actionType } from './actionType';

export function createGame(name, moderator) {
	return { 
		type: actionType.CREATE_GAME,
		name,
		moderator
	}
}