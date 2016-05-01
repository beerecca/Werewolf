import { initialState } from '../state';
import { actionType } from '../actions';

export default function night(state = initialState.day, action) {
    
    switch (action.type) {
        
        case actionType.SET_DAY_REVIEW:
            return {
                ...state,
                reviewActions: action.actions
            };

        default:
            return state;
    }

}
