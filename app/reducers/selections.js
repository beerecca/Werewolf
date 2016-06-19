import { initialState } from '../state';
import { actionType } from '../actions';

export default function selections(state = initialState.selections, action) {
    
    switch (action.type) {
        
        case actionType.SET_SELECTION:
            return {
                ...state,
                selectionType: action.selectionType,
                onlyOne: action.onlyOne
            }

        case actionType.SELECT_PLAYER:
            //1. when you select a player that already has a selection of that type, unselect them
            //2. if a different type, don't unselect them, just add that type
            //3. if onlyOne is true, remove any player that is not the action player (the selection has been made in 1)

            //a. if player doesn't exist, add it and it's new selection to the array


            const activeSelections = state.activeSelections.map(selection => {
                console.log('thing', selection);

                if (selection.player === action.id) {
                    let playerSelections;
                    if (selection.type.includes(action.selectionType)) {
                        playerSelections = selection.type.filter(selectionType => selectionType !== action.selectionType);
                    } else {
                        playerSelections = selection.type.concat(action.selectionType);
                    }
                    return { player: action.id, type: playerSelections };
                }

                if (state.onlyOne) {
                    const playerSelections = selection.type.filter(selectionType => selectionType !== action.selectionType);
                    return { player: action.id, type: playerSelections };
                }

                return selection;
            });

			return {
				...state,
                activeSelections
			};

		case actionType.UPDATE_PLAYER:
        case actionType.SET_NIGHT:
        case actionType.SET_DAY_REVIEW:
            return {
                ...state,
                activeSelections: []
            }

		default: return state;
	}
}