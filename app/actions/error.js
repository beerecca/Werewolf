import { actionType } from './actionType';
import { createAction } from 'redux-actions';

export const setError = createAction(actionType.SET_ERROR);