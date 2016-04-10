import React, { Component, PropTypes } from 'react';
import './PlayerEdit.scss';

export default class PlayerEdit extends Component {

	static propTypes = {
		roles: PropTypes.array.isRequired,
		createPlayer: PropTypes.func.isRequired
	};

	constructor() {
		super();
		this.state = { role: null, name: null };
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.createPlayer({
			name: this.state.name, 
			role: this.state.role,
			order: this.props.order
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
		const { roles } = this.props;

		return (
			<div className="w-playerEdit col-sm-6 col-sm-offset-3 panel panel-default">
				<h3>Player</h3>

				<form onSubmit={this.handleSubmit.bind(this)}>
					<div className="form-group">
						<label htmlFor="playerName">Name</label>
						<input type="text" className="form-control" ref="playerName" onChange={this.handleNameChange.bind(this)} />
					</div>
					<div className="w-playerEdit--role form-group">
						{roles.map(role => {
							return (
								<label key={role.id}>
									<input className="w-playerEdit--radio" type="radio" name="playerRole" value={role.name} onChange={this.handleRoleChange.bind(this)} />
									<img className="w-playerEdit--image" src={role.image} />
								</label>
							)
						})}
					</div>
					<button type="submit" className="btn btn-default">Submit</button>
				</form>
			</div>
		);
	}
}
