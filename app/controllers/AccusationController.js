import React, { Component } from 'react';
import { connect } from 'react-redux';
//import * as action from '../actions';
import Button from '../components/Button';
import Countdown from '../components/Countdown';
import PlayersController from './PlayersController';
//import cn from 'classnames';

export class AccusationController extends Component {

	render() {
		//const { } = this.props.app;
		//const { dispatch } = this.props;

		return (
			<span>
				<Countdown length={300} />
				<h2>Accusation</h2>
				<p>1. Select the player that has been accused.</p>
				<p>2. Select the accusers.</p>
				<p>3. Assign each players vote.</p>
				<PlayersController />
				<Button label="Cancel" buttonClick={()=>console.log('cancelAccusation')} secondary={true} />
				<Button label="Save" buttonClick={()=>console.log('saveVote')} />
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
})(AccusationController);