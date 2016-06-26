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

        case actionType.SELECT_PLAYER:
            if (action.state === 'day-accuse' && state.page === 'accuse') {
                const accused = (state.accusation.accused === action.id)
                    ? null
                    : action.id;

                return {
                    ...state,
                    accusation : {
                        ...state.accusation,
                        accused: accused
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

            if (action.state === 'day-accuse' && state.page === 'vote') {
                const votes = state.accusation.votes.map(vote=>{
                    if (vote.player === action.id) {
                        return {
                            player: vote.player,
                            die: !vote.die
                        }
                    }
                    return vote;
                });

                return {
                    ...state,
                    accusation : {
                        ...state.accusation,
                        votes: votes
                    }
                }
            }

            return state;

        default:
            return state;
    }

}
