const rolesServiceEndpoint = 'https://ykvwnx9xib.execute-api.us-west-2.amazonaws.com/prod/roles';
const gamesServiceEndpoint = 'https://ykvwnx9xib.execute-api.us-west-2.amazonaws.com/prod/games';
//const rolesServiceEndpoint = '/roles';

//Data util. Responsible for getting/posting data to and from endpoints.

export function getRolesData() {
	return fetch(rolesServiceEndpoint, {
		method: 'GET',
		headers: {
			'x-api-key': '8qKfgKuERL9FuHU40x15k32ytM0Tl5nI33Z1Cq5f'
		}
	})
		.then(checkStatus)
		.then((response) => response.json());
}

export function saveGame(game) {
	return fetch(gamesServiceEndpoint, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'x-api-key': '8qKfgKuERL9FuHU40x15k32ytM0Tl5nI33Z1Cq5f'
		},
		body: JSON.stringify(game)
	})
		.then(checkStatus)
		.then((response) => response.json());
}

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		return Promise.reject(response);
	}
}