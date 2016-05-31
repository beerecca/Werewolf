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

			return {
				...state,
				editingPlayer
			};

		case actionType.DELETE_PLAYER:
			const newPlayerList = state.playerList.filter(player=>{
				return player.id !== action.id;
			});

			return {
				...state,
				playerList: newPlayerList,
				editingPlayer: null
			};

		case actionType.UPDATE_PLAYER:
			let unchangedPlayers = [];
			let playerToUpdate = {};

			state.playerList.forEach((player)=>{
				if (player.id === action.id) {
					playerToUpdate = player;
					playerToUpdate.name = action.name;
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
				editingPlayer: null //TODO: not needed anymore?
			};

        case actionType.SET_PLAYERS:
            return {
                ...state,
                playerList : action.players
            }

		default: return state;
	}
}
