import { initialState } from '../state';
import { actionType } from '../actions';

export default function selections(state = initialState.selections, action) {

    switch (action.type) {

        case actionType.SET_SELECTION:

            if (action.selectionType === 'vote') {
                const existingSelections = state.activeSelections.map(selection=>{
                    if (selection.type.includes('accused')) return selection;
                    return {
                        ...selection,
                        type: selection.type.concat('voteSave')
                    }
                });
                //create array of player ids that don't exist in activeSelections
                const otherPlayers = action.playerIds.filter(id=>{
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
                    selectionType: action.selectionType,
                    onlyOne: action.onlyOne,
                    activeSelections: existingSelections.concat(newSelections)
                }
            }

            return {
                ...state,
                selectionType: action.selectionType,
                onlyOne: action.onlyOne
            }

		case actionType.SET_SELECTIONS:
			return {
				...state,
				activeSelections: action.selections
			}

		case actionType.UPDATE_PLAYER:
        case actionType.SET_NIGHT:
        case actionType.SET_DAY_REVIEW:
            return {
                ...state,
                activeSelections: []
            }

        case actionType.START_ACCUSATIONS:
			return {
                ...state,
                activeSelections: [],
                selectionType: 'accused'
            };

		default: return state;
	}
}
