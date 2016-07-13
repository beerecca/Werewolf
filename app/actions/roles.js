import { actionType } from './actionType';
import { createAction } from 'redux-actions';

export const chooseRoles = createAction(actionType.CHOOSE_ROLES);
export const setRoles = createAction(actionType.SET_ROLES, roles => ({roles}));
