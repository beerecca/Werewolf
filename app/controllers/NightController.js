import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../actions';
import Button from '../components/Button';

export class NightController extends Component {

	render() {
		const { dispatch } = this.props;
		const { night, game } = this.props.app;
		const { activeAction, nightActions } = night;
		const { name, instruction } = activeAction;
        
        const actionPosition = nightActions.findIndex(r => r.id == activeAction.id);
        const isLastAction = actionPosition === nightActions.length - 1;
        const prev = actionPosition > 0 ? <Button secondary={true} label="Previous" buttonClick={()=>dispatch(action.changeAction('previous'))} /> : null;
        const next = !isLastAction ? <Button secondary={true} label="Next" buttonClick={()=>dispatch(action.changeAction('next'))} /> : null;
        const save = isLastAction ? <Button label="Save" buttonClick={()=>dispatch(action.saveActions())} /> : null;
		
		//TODO: for phase 1, rotate through selectedRoles (minus villagers)
		const title = (game.phase === 1) ? `${name}s, open your eyes` : instruction;

		return (
			<span>
				<p>{actionPosition + 1}/{nightActions.length}</p>
				<h2>{title}</h2>
				<p>players</p>
				{prev}
				{next}
				{save}
			</span>
		);
	}
}

export default connect((state) => {
	return {
		app: {
			players: state.app.players,
			windowSize: state.app.windowSize,
			roles: state.app.roles,
			error: state.app.error,
			game: state.app.game,
			night: state.app.night,
			day: state.app.day,
			selections: state.app.selections
		} 
	}
})(NightController);
