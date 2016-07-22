import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../actions';
import Button from '../components/Button';
import PlayersContainer from './PlayersContainer';

export class NightContainer extends Component {

	render() {
		const { dispatch } = this.props;
		const { night, game } = this.props.app;
		const { activeAction, nightActions } = night;
		const { name, instruction } = activeAction;

        const actionPosition = nightActions.findIndex(r => r.id == activeAction.id);
        const isLastAction = actionPosition === nightActions.length - 1;
        const prev = <Button secondary={true} label="Previous" buttonClick={()=>dispatch(action.changeAction('previous'))} />;
        const next = <Button secondary={true} label="Next" buttonClick={()=>dispatch(action.changeAction('next'))} />;
        const save = <Button label="Save" buttonClick={()=>dispatch(action.saveActions())} />;

		//TODO: for phase 0, rotate through selectedRoles (minus villagers)
		const title = (game.phase === 0) ? `${name}s, open your eyes` : instruction;

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
