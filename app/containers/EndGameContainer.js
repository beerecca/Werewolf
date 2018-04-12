import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWerewolvesWin } from '../selectors';

export class EndGameContainer extends Component {

	render() {
		const { werewolvesWin } = this.props;
		const message = (werewolvesWin) ? 'Werewolves Win!' : 'Villagers Win!';

		return (
			<h1>{message}</h1>
		);
	}
}

export default connect((state) => ({
	werewolvesWin: getWerewolvesWin(state)
}))(EndGameContainer);
