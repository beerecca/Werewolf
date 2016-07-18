import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../actions';
import Button from '../components/Button'

export class ReviewController extends Component {

	render() {
		const { roles, players, day } = this.props.app;
		const { reviewActions } = day;
		const { dispatch } = this.props;

        /*const roleMap = roles.allRoles.reduce((allRoles, role) => {
            allRoles[role.id] = role;
            return allRoles;
        }, {});*/

        const playerMap = players.playerList.reduce((allPlayers, player) => {
            allPlayers[player.id] = player;
            return allPlayers;
        }, {});

        const actions = reviewActions.map((action, index) => {
            const player = playerMap[action.player];
            const role = roles[action.role];
            const verbage = role.showOnSummary ? <p key={index}>{player.name} {role.summaryVerb}</p> : null;
            return verbage;
        });

		return (
			<span>
				<h1>Day Review</h1>
				<p>This is what happened last night:</p>
                {actions}
                <Button label="Start Accusations" buttonClick={()=>{dispatch(action.startAccusations())}} />
			</span>
		);
	}
}

export default connect((state) => {
	return {
		app: {
			players: state.app.players,
			roles: state.app.roles,
			error: state.app.error,
			game: state.app.game,
			night: state.app.night,
			day: state.app.day,
			selections: state.app.selections
		}
	}
})(ReviewController);
