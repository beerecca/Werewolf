import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../actions';
import Button from '../components/Button';
import PlayersContainer from './PlayersContainer';

export class NightContainer extends Component {

	render() {
		const { dispatch } = this.props;
		const { night, game, players } = this.props.app;
		const { activeAction, nightActions } = night;
		const { name, namePlural, instruction } = activeAction;

        const actionPosition = nightActions.findIndex(r => r.id == activeAction.id);
        const isLastAction = actionPosition === nightActions.length - 1;
        const prev = <Button secondary={true} label="Previous" buttonClick={()=>dispatch(action.changeAction('previous'))} />;
        const next = <Button secondary={true} label="Next" buttonClick={()=>dispatch(action.changeAction('next'))} />;
        const save = <Button label="Save" buttonClick={()=>dispatch(action.saveActions())} />;

		const playersWithActiveAction = players.playerList.filter(player => (player.alive && player.role === activeAction.id));
		const titleName = playersWithActiveAction.length === 1 ? name : namePlural;

		const title = (game.phase === 0) ? `${namePlural}, open your eyes` : `${titleName}, ${instruction}`;

		return (
			<span>
				<p>{actionPosition + 1}/{nightActions.length}</p>
				<h2>{title}</h2>
				<PlayersContainer />
				{actionPosition > 0 ? prev : null}
				{!isLastAction ? next : null}
				{isLastAction ? save : null}
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
})(NightContainer);
