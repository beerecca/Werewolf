export const initialState = {
	gameSetup: {
		id: null,
		name: null,
		moderator: null,
		phase: 0
	},
	players: {
		playerList: [],
		editingPlayer: null
	},
	windowSize: { w: null, h: null },
	night: {
		nightActions : [],
		activeAction : null
	},
	roles: [],
	gameState : 'setup-game',
	error: null
};