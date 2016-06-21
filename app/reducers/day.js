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

        case actionType.SELECT_PLAYER:
            if (action.state === 'day-accuse' && state.page === 'accuse') {
                return {
                    ...state,
                    accusation : {
                        ...state.accusation,
                        accused: action.id
                    }
                }
            }

            if (action.state === 'day-accuse' && state.page === 'accusers') {
                const accusers = (state.accusation.accusedBy.includes(action.id)) 
                    ? state.accusation.accusedBy.filter(id => id !== action.id)
                    : state.accusation.accusedBy.concat(action.id);

                return {
                    ...state,
                    accusation : {
                        ...state.accusation,
                        accusedBy: accusers
                    }
                }
            }

            return state;

        default:
            return state;
    }

}
