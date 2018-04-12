const apiKey = null;
const urlRoot = null;
const rolesServiceEndpoint = urlRoot + '/roles';
const gamesServiceEndpoint = urlRoot + '/games';
const playersServiceEndpoint = urlRoot + '/players';
const actionServiceEndpoint = urlRoot + '/actions';
const accusationServiceEndpoint = '/accusations';

//Data util. Responsible for getting/posting data to and from endpoints.

export function getRolesData() {
	return fetch(rolesServiceEndpoint, {
		method: 'GET',
		headers: {
			'x-api-key': apiKey
		}
	})
		.then(checkStatus)
		.then(response => response.json());
}

export function saveGame(game) {
	return fetch(gamesServiceEndpoint, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'x-api-key': apiKey
		},
		body: JSON.stringify(game)
	})
		.then(checkStatus)
		.then(response => response.json());
}

export function savePlayers(data) {
	return fetch(playersServiceEndpoint + '/' + data.gameId, {
		method: 'PUT',
		headers: {
			'content-type': 'application/json',
			'x-api-key': apiKey
		},
		body: JSON.stringify(data.players)
	})
		.then(checkStatus)
		.then(response => response.json());
}

export function saveActions(data) {
    return fetch(actionServiceEndpoint + '/' + data.gameId + '/' + data.phase, {
        method: 'POST',
		headers: {
			'content-type': 'application/json',
			'x-api-key': apiKey //env!
		},
        body: JSON.stringify(data.postActions)
    })
        .then(checkStatus)
        .then(response => response.json());
}

export function saveAccusation(data) {
    return fetch(accusationServiceEndpoint + '/' + data.gameId + '/' + data.phase, {
        method: 'POST',
		headers: {
			'content-type': 'application/json',
			'x-api-key': apiKey
		},
        body: JSON.stringify(data.accusation)
    })
        .then(checkStatus)
        .then(response => response.json());
}

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		return Promise.reject(response);
	}
}
