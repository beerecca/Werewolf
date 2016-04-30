/**
 * Prevents sagas from having to know about the shape of the redux state
 */

export const getGameName = state => state.app.gameSetup.name;
export const getGameModerator = state => state.app.gameSetup.moderator;
export const getPlayers = state => state.app.players.playerList;
export const getGameId = state => state.app.gameSetup.id;
export const getPhase = state => state.app.gameSetup.phase;
export const getState = state => state.app.gameState;
export const getActions = state => state.app.night.actions;
export const getRoles = state => state.app.roles;