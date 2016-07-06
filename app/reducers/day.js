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

        case actionType.RESET_ACCUSATIONS:
            return {
                ...state,
                accusation: {
                    accused: null,
                    accusedBy: [],
                    votes: []
                }
            };

        case actionType.UPDATE_PAGE:
            return {
                ...state,
                page: action.page
            };

        case actionType.SET_SELECTION:
            if (action.selectionType === 'vote') {
                const votingPlayers = action.playerIds.filter(id=>id !== state.accusation.accused);
                const votes = votingPlayers.map(id=>{
                    return {
                        player: id,
                        die: false
                    }
                });

                return {
                    ...state,
                    accusation: {
                        ...state.accusation,
                        votes: votes
                    }
                }
            }

            return state;

		case actionType.SET_ACCUSATION:
			return {
				...state,
				accusation: action.accusation
			};

        default:
            return state;
    }

}
