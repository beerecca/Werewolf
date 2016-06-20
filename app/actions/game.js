import { actionType } from './actionType';

export function createGame(name, moderator) {
	return { 
		type: actionType.CREATE_GAME,
		name,
		moderator
	}
}

export function setGameId(id) {
    return {
        type: actionType.SET_GAMEID,
        id
    }
}

export function incrementPhase() {
    return {
        type: actionType.INCREMENT_PHASE
    }
}
