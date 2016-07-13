import { actionType } from './actionType';
import { createAction } from 'redux-actions';

export const setDayReview = createAction(actionType.SET_DAY_REVIEW, actions => ({actions}));

export const startAccusations = createAction(actionType.START_ACCUSATIONS);
export const resetAccusations = createAction(actionType.RESET_ACCUSATIONS);
export const saveAccusations = createAction(actionType.SAVE_ACCUSATIONS);

export const setAccusation = createAction(actionType.SET_ACCUSATION, accusation => ({accusation}));
export const updatePage = createAction(actionType.UPDATE_PAGE, page => ({page}));
