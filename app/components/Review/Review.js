import React, { Component, PropTypes } from 'react';
import './Review.scss';

export default class Review extends Component {

	static propTypes = {
        roles: PropTypes.array.isRequired,
        players: PropTypes.array.isRequired,
        reviewActions : PropTypes.array.isRequired,
        startAccusations: PropTypes.func.isRequired
	};

	render() {
        const { roles, players, reviewActions, startAccusations } = this.props;

        const roleMap = roles.reduce((allRoles, role) => {
            allRoles[role.id] = role;
            return allRoles;
        }, {});

        const playerMap = players.reduce((allPlayers, player) => {
            allPlayers[player.id] = player;
            return allPlayers;
        }, {});

        const actions = reviewActions.map(action => {
            const player = playerMap[action.player];
            const role = roleMap[action.role];
            const verbage = role.showOnSummary ? <p key={player.id}>{player.name} {role.summaryVerb}</p> : null;
            return verbage;
        });
        
		return (
			<span>
				<h1>Day Review</h1>
				<p>This is what happened last night</p>
                {actions}
                <button className="btn btn-default w-btn" onClick={startAccusations}>Start Accusations</button>
			</span>
		);
	}
}
