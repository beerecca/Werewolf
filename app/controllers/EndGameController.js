import React, { Component } from 'react';
import { connect } from 'react-redux';
//import * as action from '../actions';
//import cn from 'classnames';

export class EndGameController extends Component {

	render() {
		//const { } = this.props.app;
		//const { dispatch } = this.props;

		return (
			<p>EndGameController</p>
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
})(EndGameController);
