/**
 * Prevents sagas from having to know about the shape of the redux state
 */

export const getGameName = state => state.app.game.name;
export const getGameModerator = state => state.app.game.moderator;
export const getPlayers = state => state.app.players;
export const getGameId = state => state.app.game.id;
export const getPhase = state => state.app.phase;
export const getActions = state => state.app.night.actions;
export const getRoles = state => state.app.roles;
