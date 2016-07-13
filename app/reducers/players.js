import { handleActions } from 'redux-actions';
import { initialState } from '../state';
import uuid from 'uuid';

export const players = handleActions({
	CREATE_PLAYER : (state, action) => ({
		...state,
		playerList : [
			...state.playerList,
			{
				...action.payload.player,
				order: state.playerList.length + 1,
				id: uuid.v4(),
				alive: true
			}

		]
	}),


	DELETE_PLAYER : (state, action) => {
		const { id } = action.payload;
		const newPlayerList = state.playerList.filter(player=>{
			return player.id !== id;
		});

		return {
			...state,
			playerList: newPlayerList
		};
	},

	SELECT_PLAYER : (state, action) => {
		const { id, phase, stage, role } = action.payload;
		if (phase === 0 && stage === 'night') {
			const playerList = state.playerList.map(player => {
				if (player.id === id) {
					player.role = (player.role === role) ? null : role;
				}
				return player;
			});

			return {
				...state,
				playerList
			}
		}

		return state;
	},

	UPDATE_PLAYER : (state, action) => {
		const { id, name } = action.payload;
		let unchangedPlayers = [];
		let playerToUpdate = {};

		state.playerList.forEach((player)=>{
			if (player.id === id) {
				playerToUpdate = player;
				playerToUpdate.name = name;
			} else {
				unchangedPlayers.push(player);
			}
		});

		return {
			...state,
			playerList: [
				...unchangedPlayers,
				playerToUpdate
			]
		};
	},

	SET_PLAYERS : (state, action) => ({
		...state,
		playerList : action.payload.players
	})
}, initialState.players);
