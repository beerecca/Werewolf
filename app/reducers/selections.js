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
            if (!state.selectionType) return state;
            //1. when you select a player that already has a selection of that type, unselect them
            //2. if a different type, don't unselect them, just add that type
            //3. if onlyOne is true, remove any player that is not the action player (the selection has been made in 1)

            //a. if player doesn't exist, add it and it's new selection to the array
            let foundPlayer = false;
            let removePlayer = false;

            const adjustedSelections = state.activeSelections.map(selection => {
                if (selection.player === action.id) {
                    foundPlayer = true;
                    let playerSelections;
                    if (selection.type.includes(state.selectionType)) {
                        playerSelections = selection.type.filter(selectionType => selectionType !== state.selectionType);
                    } else {
                        playerSelections = selection.type.concat(state.selectionType);
                    }
                    if (playerSelections.length === 0) removePlayer = true;
                    return { player: action.id, type: playerSelections };
                }

                if (state.onlyOne) {
                    const playerSelections = selection.type.filter(selectionType => selectionType !== state.selectionType);
                    return { player: selection.player, type: playerSelections };
                }

                return selection;
            });
            
            const filteredSelections = removePlayer ? adjustedSelections.filter(selection => selection.player !== action.id) : adjustedSelections;
            const activeSelections = foundPlayer ? filteredSelections : adjustedSelections.concat({ player: action.id, type: [ state.selectionType ] });

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
        
        case actionType.START_ACCUSATIONS:
			return {
                ...state,
                activeSelections: [],
                selectionType: 'accused'
            };

		default: return state;
	}
}
