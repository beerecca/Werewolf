export const initialState = {
	game: {
		name: null,
		moderator: null,
        phase: 1,
        id: null,
        state: 'setup-game'
	},
	players: {
		playerList: [],
		editingPlayer: null,
        selections: [],
        activeSelectionType: {
            name: 'editing',
            onlyOne: true
        }
	},
	windowSize: { w: null, h: null },
	night: {
		nightActions : [],
		activeAction : null
	},
    day: {
        lastNightActions: []
    },
	roles: [],
	error: null
};
