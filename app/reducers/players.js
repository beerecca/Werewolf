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
		const playerList = state.playerList.filter(player=>{
			return player.id !== id;
		});

		return {
			...state,
			playerList
		};
	},

	SET_PLAYER_ROLE : (state, action) => {
		const { id, role } = action.payload;
		const playerList = state.playerList.map(player => {
			if (player.id === id) {
				return {
					...player,
					role
				}
			}
			return { ...player };
		});

		return {
			...state,
			playerList
		}
	},

	SET_PLAYERS : (state, action) => ({
		...state,
		playerList : action.payload.players
	})
}, initialState.players);
