export const initialState = {
	game: {
		name: null,
		moderator: null,
		phase: 0,
		id: null,
		stage: 'setup-game',
		werewolvesWin: null
	},
	players: {
		playerList: []
	},
	selections: {
		selectionType: '',
		onlyOne: true,
		activeSelections: []
	},
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
		allRoles: {},
		selectedRoles: []
	},
	error: null
};
