import React, { Component, PropTypes } from 'react';

export default class Accusation extends Component {

	static propTypes = {
		cancelAccusation: PropTypes.func.isRequired,
		saveVote: PropTypes.func.isRequired
	};

	render() {
		const { cancelAccusation, saveVote } = this.props;

		return (
			<span>
				<h2>Accusation</h2>
				<p>1. Select the player that has been accused.</p>
				<p>2. Select the accusers.</p>
				<p>3. Assign each players vote.</p>
				<button className="btn btn-default w-btn" onClick={cancelAccusation}>Cancel</button>
				<button className="btn btn-default w-btn" onClick={saveVote}>Save</button>
			</span>
		);
	}
}