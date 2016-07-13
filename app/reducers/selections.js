import { handleActions } from 'redux-actions';
import { initialState } from '../state';

export const selections = handleActions({
	SET_SELECTION : (state, action) => {

		const { selectionType, playerIds, onlyOne } = action.payload;

		if (selectionType === 'vote') {
			const existingSelections = state.activeSelections.map(selection=>{
				if (selection.type.includes('accused')) return selection;
				return {
					...selection,
					type: selection.type.concat('voteSave')
				}
			});
			//create array of player ids that don't exist in activeSelections
			const otherPlayers = playerIds.filter(id=>{
				return !state.activeSelections.some(selection=>selection.player === id)
			});
			const newSelections = otherPlayers.map(id=> {
				return {
					player: id,
					type: ['voteSave']
				}
			});

			return {
				...state,
				selectionType,
				onlyOne,
				activeSelections: existingSelections.concat(newSelections)
			}
		}

		return {
			...state,
			selectionType,
			onlyOne
		}
	},

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
