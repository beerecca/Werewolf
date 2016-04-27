
export function filterRoles(players, roles) {
    const roleMap = roles.reduce((map, role) => {
		map[role.id] = role;
		return map;
	}, {});

	const playerRoles = players.reduce((pRoles, player) => {
		pRoles[player.role] = roleMap[player.role];
		return pRoles;
	}, {});

	return Object.values(playerRoles);
}
