import { initialState } from '../state';
import { actionType } from '../actions';
import uuid from 'uuid';

export default function players(state = initialState.players, action) {
	switch(action.type) {

		case actionType.CREATE_PLAYER:
			const order = state.playerList.length + 1;
			const id = uuid.v4();
			return {
				...state,
				playerList: [
					...state.playerList,
					{...action.player, order: order, id: id, alive: true}
				]
			};

		case actionType.SELECT_PLAYER:            
            const editingPlayer = (action.state === 'setup-player' || (action.state === 'night' && action.phase === 0)) ? action.id : null; 

            let selections = state.selections;
            if (state.activeSelectionType.onlyOne) selections = selections.filter(selection => selection.type !== state.activeSelectionType.name);
            if (state.activeSelectionType.name) selections.push({ player: action.id, type: state.activeSelectionType.name }); 

			return {
				...state,
				editingPlayer,
                selections
			};

		case actionType.UPDATE_PLAYER:
			let unchangedPlayers = [];
			let playerToUpdate = {};

			state.playerList.forEach((player)=>{
				if (player.id === action.id) {
					playerToUpdate = player;
					playerToUpdate.name = action.name;
					playerToUpdate.role = action.role;
				} else {
					unchangedPlayers.push(player);
				}
			});

			return {
				...state,
				playerList: [
					...unchangedPlayers,
					playerToUpdate
				],
				editingPlayer: null
			};

        case actionType.SET_PLAYERS:
            return {
                ...state,
                playerList : action.players
            }

		default: return state;
	}
}
