/**
 * Creates a set of action methods that can be dispatched from any component in the app. This then calls the reducer function.
 */

export const actionType = {
	GET_ROLES: 'GET_ROLES',
	SET_ROLES: 'SET_ROLES',
	SET_ERROR: 'SET_ERROR',
	CREATE_PLAYER: 'CREATE_PLAYER',
	CREATE_GAME: 'CREATE_GAME',
    WINDOW_RESIZE: 'WINDOW_RESIZE'
};

export function getRoles() {
	return {
        type: actionType.GET_ROLES
    }
}

export function setRoles(roles) {
	return {
		type: actionType.SET_ROLES,
		roles
	}
}

export function createPlayer(player) {
	return { 
		type: actionType.CREATE_PLAYER,
		player
	}
}

export function createGame(game) {
	return { 
		type: actionType.CREATE_GAME,
		game
	}
}

export function setError() {
	return {
		type: actionType.SET_ERROR
	}
}

export function windowResize(windowSize) {
    return {
        type: actionType.WINDOW_RESIZE,
        windowSize
    }
}
