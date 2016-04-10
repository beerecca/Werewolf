/**
 * Prevents sagas from having to know about the shape of the redux state
 */

export const getGameName = state => state.app.game;
export const getPlayers = state => state.app.players;
