import { actionType } from './actionType';
import { createAction } from 'redux-actions';

export const startGame = createAction(actionType.START_GAME, selectedRoles => ({selectedRoles}));
export const changeAction = createAction(actionType.CHANGE_ACTION, direction => ({direction}));
export const saveActions = createAction(actionType.SAVE_ACTIONS);
export const setNightRoles = createAction(actionType.SET_NIGHT_ROLES, filteredRoles => ({filteredRoles}));
export const setNight = createAction(actionType.SET_NIGHT);
export const setNightActions = createAction(actionType.SET_NIGHT_ACTIONS, nightActions => ({nightActions}));
