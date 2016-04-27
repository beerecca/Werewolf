export const initialState = {
	game: {
		name: null,
		moderator: null,
        phase: 0,
        id: null,
        state: 'setup-game'
	},
	players: [],
	windowSize: { w: null, h: null },
	night: {
		nightActions : [],
		activeAction : null
	},
	roles: [],
	error: null
};
