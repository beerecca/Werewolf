import { handleActions } from 'redux-actions';
import { initialState } from '../state';

export const error = handleActions({
	SET_ERROR : (state, action) => ({
		...state,
		error: true
	})
}, initialState.error);
