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
        
		return (
			<span>
				<h1>Day Review</h1>
				<p>This is what happened last night</p>
                {reviewActions.map(action => {
                    return (
                        <p>{playerMap[action.player].name} was {roleMap[action.role].summaryVerb} by a {roleMap[action.role].name}</p> 
                    )
                })}
                <button className="btn btn-default w-btn" onClick={startAccusations}>Start Accusations</button>
			</span>
		);
	}
}
