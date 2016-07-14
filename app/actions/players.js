import { actionType } from './actionType';
import { createAction } from 'redux-actions';

export const createPlayer = createAction(actionType.CREATE_PLAYER, player => ({player}));
export const deletePlayer = createAction(actionType.DELETE_PLAYER, id => ({id}));
export const selectPlayer = createAction(actionType.SELECT_PLAYER, (id, stage, phase, role) => ({id, stage, phase, role}));
export const setPlayers = createAction(actionType.SET_PLAYERS, players => ({players}));
export const setSelection = createAction(actionType.SET_SELECTION, (selectionType, onlyOne ) => ({selectionType, onlyOne }));
export const setSelections = createAction(actionType.SET_SELECTIONS, selections => ({selections}));
export const setPlayerRole = createAction(actionType.SET_PLAYER_ROLE, (id, role) => ({ id, role }));
