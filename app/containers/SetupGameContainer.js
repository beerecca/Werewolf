import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createGame } from '../actions';
import SetupGameForm from '../components/SetupGameForm';

export class SetupGameContainer extends Component {

	render() {
		return (
			<span>
				<h1>Werewolf</h1>
				<SetupGameForm createGame={(name, moderator)=>this.props.createGame(name, moderator)} />
			</span>
		);
	}
}

export default connect((state) => state, { createGame })(SetupGameContainer);
