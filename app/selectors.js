/**
 * Prevents sagas from having to know about the shape of the redux state
 */

export const getGameName = state => state.app.game.name;
export const getGameState = state => state.app.game.state;
export const getGameModerator = state => state.app.game.moderator;
export const getGameId = state => state.app.game.id;
export const getGamePhase = state => state.app.game.phase;
export const getPlayers = state => state.app.players.playerList;
export const getActions = state => state.app.night.nightActions;
export const getRoles = state => state.app.roles;
export const getActiveAction = state => state.app.night.activeAction;
