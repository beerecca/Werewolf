import React, { Component, PropTypes } from 'react';
import './PlayerAdd.scss';

export default class PlayerAdd extends Component {

	static propTypes = {
		startGame: PropTypes.func.isRequired,
		createPlayer: PropTypes.func.isRequired
	};

	//Only using state here to track input values internally
	constructor() {
		super();
		this.state = { name: null };
	}

	addAnother(e) {
		e.preventDefault();
		this.props.createPlayer({
			name: this.state.name 
		});
	}

	handleNameChange(e) {
		const val = e.target.value;
		this.setState({ name : val });
	}

	render() {
		const { startGame } = this.props;

		return (
			<span>
				<h3>Add Player</h3>
				<div className="form-group form-inline">
					<label className="w-label" htmlFor="playerName">Name</label>
					<input type="text" className="form-control" ref="playerName" onChange={this.handleNameChange.bind(this)} />
				</div>
				<button onClick={this.addAnother.bind(this)} className="btn btn-default w-btn">Add Another</button>
				<button onClick={startGame} className="btn btn-default w-btn">Start Game</button>
			</span>
		);
	}
}
