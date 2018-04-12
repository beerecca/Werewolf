import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeAction, saveActions } from '../actions';
import Button from '../components/Button';
import PlayersContainer from './PlayersContainer';
import { getPlayers, getGamePhase, getActiveAction, getActions, getActionPosition, getInstructionTitleName } from '../selectors';

export class NightContainer extends Component {

	render() {
		const { phase, activeAction, actionPosition, nightActions, instructionTitleName, changeAction, saveActions } = this.props;
		const { namePlural, instruction } = activeAction;

        const isLastAction = actionPosition === nightActions.length - 1;
		const title = (phase === 0) ? `${namePlural}, open your eyes` : `${instructionTitleName}, ${instruction}`;
		
		const prev = <Button secondary={true} label="Previous" buttonClick={()=>changeAction('previous')} />;
        const next = <Button secondary={true} label="Next" buttonClick={()=>changeAction('next')} />;
		const save = <Button label="Save" buttonClick={()=>saveActions()} />;

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

export default connect((state) => ({
	playerList: getPlayers(state),
	phase: getGamePhase(state),
	activeAction: getActiveAction(state),
	nightActions: getActions(state),
	actionPosition: getActionPosition(state),
	instructionTitleName: getInstructionTitleName(state)
}), { changeAction, saveActions })(NightContainer);
