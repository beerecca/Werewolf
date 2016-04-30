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
            let editingPlayer = (action.state === 'setup-player' || (action.state === 'night' && action.phase === 0)) ? action.id : null; 
			return {
				...state,
				editingPlayer
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

		default: return state;
	}
}
