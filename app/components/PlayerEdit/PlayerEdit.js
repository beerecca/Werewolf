import React, { Component, PropTypes } from 'react';

export default class PlayerEdit extends Component {

	static propTypes = {
		player: PropTypes.object.isRequired,
		roles: PropTypes.array.isRequired,
		updatePlayer: PropTypes.func.isRequired
	};

	//Only using state here to track input values internally
	constructor() {
		super();
		this.state = { role: null, name: null };
	}

	componentDidMount() {
		this.setState({ role: this.props.player.role, name: this.props.player.name });
	}

	handleUpdatePlayer(e) {
		e.preventDefault();
		this.props.updatePlayer(this.props.player.id, this.state.name, this.state.role);
	}

	handleRoleChange(e) {
		const val = e.target.value;
		this.setState({ role: val });
	}

	handleNameChange(e) {
		const val = e.target.value;
		this.setState({ name: val });
	}

	render() {
		const { player, roles } = this.props;

		return (
			<span>
				<h2>Edit Player '{player.name}'</h2>
				<div className="form-group form-inline">
					<label className="w-label" htmlFor="playerName">Name</label>
					<input type="text" className="form-control" ref="playerName" value={this.state.name} onChange={this.handleNameChange.bind(this)} />
				</div>
				<div className="w-playerEdit--role form-group">
					{roles.map(role => {
						const checked = (role.id === this.state.role) ? true : false;
						return (
							<label key={role.id}>
								<input className="w-playerEdit--radio" type="radio" name="playerRole" value={role.id} checked={checked} onChange={this.handleRoleChange.bind(this)} />
								<img className="w-playerEdit--image" src={role.image} />
							</label>
						)
					})}
				</div>
				<button onClick={this.handleUpdatePlayer.bind(this)} className="btn btn-default w-btn">Save</button>
			</span>
		);
	}
}
