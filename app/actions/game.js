import { actionType } from './actionType';

export function createGame(name, moderator) {
	return { 
		type: actionType.CREATE_GAME,
		name,
		moderator
	}
}

export function changeState(state) {
	return {
        type: actionType.CHANGE_STATE,
		state
	}
}

export function setGameId(id) {
    return {
        type: actionType.SET_GAMEID,
        id
    }
}

