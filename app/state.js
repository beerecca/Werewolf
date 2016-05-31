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
		editingPlayer: null
	},
    selections: {
        selectionType: 'editing',
        onlyOne: true,
        activeSelections: [] 
    },
	windowSize: { w: null, h: null },
	night: {
		nightActions : [],
		activeAction : null
	},
    day: {
        reviewActions: []
    },
	roles: {
		allRoles: [],
		selectedRoles: []
	},
	error: null
};
