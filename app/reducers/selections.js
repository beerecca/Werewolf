import { handleActions } from 'redux-actions';
import { initialState } from '../state';

export const selections = handleActions({
	SET_SELECTION : (state, action) => ({
		...state,
		selectionType : action.payload.selectionType,
		onlyOne : action.payload.onlyOne
	}),

	SET_SELECTIONS : (state, action) => ({
		...state,
		activeSelections : action.payload.selections
	}),

	UPDATE_PLAYER : (state, action) => ({
		...state,
		activeSelections : []
	}),

	SET_NIGHT : (state, action) => ({
		...state,
		activeSelections : []
	}),

	SET_DAY_REVIEW : (state, action) => ({
		...state,
		activeSelections : []
	}),

	START_ACCUSATIONS : (state, action) => ({
		...state,
		activeSelections: [],
		selectionType: 'accused'
	})

}, initialState.selections);
