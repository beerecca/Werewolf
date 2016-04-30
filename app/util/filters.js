
export function filterNightRoles(players, roles) {
    const roleMap = roles.reduce((map, role) => {
		map[role.id] = role;
		return map;
	}, {});

	const playerRoles = players.reduce((activeRoles, player) => {
        let role = roleMap[player.role];

        if (role.hasNightAction) activeRoles[role.id] = role;

		return activeRoles;
	}, {});

    const filteredRoles = Object.values(playerRoles).sort(sortByOrder);

	return filteredRoles;
}


export function sortByOrder(a, b) {
    return a.order - b.order;
}
