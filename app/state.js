export const initialState = {
	gameSetup: {
		name: null,
		moderator: null
	},
	players: [],
	windowSize: { w: null, h: null },
	night: {
		nightActions : [],
		activeAction : null
	},
	roles: [],
	gameState : 'setup-game',
	phase: 0,
	error: null
};