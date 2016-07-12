import { actionType } from './actionType';
import { createAction } from 'redux-actions';

export const createGame = createAction(actionType.CREATE_GAME, (name, moderator) => ({ name, moderator }));
export const setGameId = createAction(actionType.SET_GAMEID, id => ({id}));
export const werewolvesWin = createAction(actionType.WEREWOLVES_WIN, win => ({win}));
export const incrementPhase = createAction(actionType.INCREMENT_PHASE);
