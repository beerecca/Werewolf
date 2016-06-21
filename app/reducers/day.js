import { initialState } from '../state';
import { actionType } from '../actions';

export default function day(state = initialState.day, action) {
    
    switch (action.type) {
        
        case actionType.SET_DAY_REVIEW:
            return {
                ...state,
                reviewActions: action.actions
            };
        
        case actionType.START_ACCUSATIONS:
            return {
                ...state,
                page: 'accuse'
            };

        case actionType.UPDATE_PAGE:
            return {
                ...state,
                page: action.page
            };

        default:
            return state;
    }

}
