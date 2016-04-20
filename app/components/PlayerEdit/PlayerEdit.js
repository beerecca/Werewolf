import React, { Component, PropTypes } from 'react';
import './PlayerEdit.scss';

export default class PlayerEdit extends Component {

	static propTypes = {
		roles: PropTypes.array.isRequired,
		startGame: PropTypes.func.isRequired,
		createPlayer: PropTypes.func.isRequired
	};

	//Only using state here to track input values internally
	constructor() {
		super();
		this.state = { role: null, name: null };
	}

	addAnother(e) {
		e.preventDefault();
		this.props.createPlayer({
			name: this.state.name, 
			role: this.state.role
		});
	}

	handleRoleChange(e) {
		const val = e.target.value;
		this.setState({ role : val });
	}

	handleNameChange(e) {
		const val = e.target.value;
		this.setState({ name : val });
	}

	render() {
		const { roles, startGame } = this.props;

		return (
			<span>
				<h3>Player</h3>
				<div className="form-group form-inline">
					<label className="w-label" htmlFor="playerName">Name</label>
					<input type="text" className="form-control" ref="playerName" onChange={this.handleNameChange.bind(this)} />
				</div>
				<div className="w-playerEdit--role form-group">
					{roles.map(role => {
						return (
							<label key={role.id}>
								<input className="w-playerEdit--radio" type="radio" name="playerRole" value={role.id} onChange={this.handleRoleChange.bind(this)} />
								<img className="w-playerEdit--image" src={role.image} />
							</label>
						)
					})}
				</div>
				<button onClick={this.addAnother.bind(this)} className="btn btn-default w-btn">Add Another</button>
				<button onClick={startGame} className="btn btn-default w-btn">Start Game</button>
			</span>
		);
	}
}
