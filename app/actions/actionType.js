export const actionType = {

    //role stuff
	SET_ROLES: 'SET_ROLES',
    CHOOSE_ROLES: 'CHOOSE_ROLES',

    //generic stuff
	SET_ERROR: 'SET_ERROR',

    //player stuff
	CREATE_PLAYER: 'CREATE_PLAYER',
	SELECT_PLAYER: 'SELECT_PLAYER',
    DELETE_PLAYER: 'DELETE_PLAYER',
    SET_SELECTION: 'SET_SELECTION',
	SET_SELECTIONS: 'SET_SELECTIONS',
	SET_PLAYER_ROLE: 'SET_PLAYER_ROLE',

    //game structure stuff
	CREATE_GAME: 'CREATE_GAME',
    START_GAME: 'START_GAME',
    SET_GAMEID: 'SET_GAMEID',
    SET_PLAYERS: 'SET_PLAYERS',
    INCREMENT_PHASE: 'INCREMENT_PHASE',
    WEREWOLVES_WIN: 'WEREWOLVES_WIN',

    //night stuff
    SET_NIGHT: 'SET_NIGHT',
    SET_NIGHT_ROLES: 'SET_NIGHT_ROLES',
    CHANGE_ACTION: 'CHANGE_ACTION',
    SAVE_ACTIONS: 'SAVE_ACTIONS',
	SET_NIGHT_ACTIONS: 'SET_NIGHT_ACTIONS',

    //day stuff
    SET_DAY_REVIEW: 'SET_DAY_REVIEW',
    START_ACCUSATIONS: 'START_ACCUSATIONS',
    RESET_ACCUSATIONS: 'RESET_ACCUSATIONS',
    SAVE_ACCUSATIONS: 'SAVE_ACCUSATIONS',
	SET_ACCUSATION: 'SET_ACCUSATION',
    UPDATE_PAGE: 'UPDATE_PAGE',
	SET_VOTES: 'SET_VOTES'
};
