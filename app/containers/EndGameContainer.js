import React, { Component } from 'react';
import { connect } from 'react-redux';

export class EndGameContainer extends Component {

	render() {
		const { werewolvesWin } = this.props.app.game;
		const message = (werewolvesWin) ? 'Werewolves Win!' : 'Villagers Win!';

		return (
			<h1>{message}</h1>
		);
	}
}

export default connect((state) => {
	return {
		app: {
			game: state.app.game
		} 
	}
})(EndGameContainer);
