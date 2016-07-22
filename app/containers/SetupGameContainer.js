import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../actions';
import SetupGameForm from '../components/SetupGameForm';

export class SetupGameContainer extends Component {

	render() {
		const { dispatch } = this.props;

		return (
			<span>
				<h1>Werewolf</h1>
				<SetupGameForm createGame={(name, moderator)=>{dispatch(action.createGame(name, moderator))}} />
			</span>
		);
	}
}

export default connect((state) => state)(SetupGameContainer);
