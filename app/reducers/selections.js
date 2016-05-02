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
            const activeSelections = filterSelections(state, action);
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

function filterSelections(state, action) {
    let selections = state.onlyOne ? state.activeSelections.filter(selection => selection.type !== state.selectionType) : state.activeSelections;
    if (state.selectionType)
        selections.push({ player: action.id, type: state.selectionType });
    return selections;
}   
