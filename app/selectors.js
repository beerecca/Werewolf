/**
 * Prevents sagas from having to know about the shape of the redux state
 */

export const getGameName = state => state.app.name;
export const getGameModerator = state => state.app.moderator;
export const getPlayers = state => state.app.players;
export const getGameId = state => state.app.game.id;
export const getPhase = state => state.app.phase;
export const getActions = state => state.app.actions;
