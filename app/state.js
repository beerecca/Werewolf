export const initialState = {
	game: {
		name: null,
		moderator: null,
		phase: 0,
		id: null,
		state: 'setup-game'
	},
	players: {
		playerList: []
	},
	selections: {
		selectionType: '',
		onlyOne: true,
		activeSelections: [] 
	},
	windowSize: { w: null, h: null },
	night: {
		nightActions : [],
		activeAction : null
	},
	day: {
		reviewActions: [],
		page: 'accuse',
		accusation: {
			accused: null,
			accusedBy: [],
			votes: []
		} 
	},
	roles: {
		allRoles: [],
		selectedRoles: []
	},
	error: null
};
