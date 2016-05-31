import React, { Component, PropTypes } from 'react';
import Button from './Button';
import Role from './Role';

export default class SetupRolesForm extends Component {

	static propTypes = {
		roles: PropTypes.array.isRequired,
		startGame: PropTypes.func.isRequired
	};

	constructor() {
		super();
		this.state = { selectedRoles: [] };
	}

	handleRoleClick(id) {
		let updated = [];
		const selectedRoles = this.state.selectedRoles;

		//If it exists, remove it, otherwise add it
		if (selectedRoles.includes(id)) {
			updated = selectedRoles.filter(role=>role !== id);
		} else {
			updated = [...selectedRoles, id];
		}
		this.setState({ selectedRoles: updated });
	}

	handleStartClick() {
		this.props.startGame(this.state.selectedRoles);
	}

	render() {
		const { roles } = this.props;

		return (
			<span>
				<div>
					{roles.map(role => {
						return <Role key={role.id} image={role.image} roleClick={()=>this.handleRoleClick(role.id)} />
					})}
				</div>
				<Button label="Start Game" buttonClick={this.handleStartClick.bind(this)} />
			</span>
		);
	}
}