import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startGame } from '../actions';
import { getSortedFilteredRoles } from '../selectors';
import SetupRolesForm from '../components/SetupRolesForm';

export class SetupRolesContainer extends Component {

	render() {
		const { roles, startGame } = this.props;

		return (
			<span>
				<h2>Select Roles</h2>
				<SetupRolesForm roles={roles} startGame={selectedRoles=>startGame(selectedRoles)} />
			</span>
		);
	}
}

export default connect((state) => ({
	roles: getSortedFilteredRoles(state)
}), { startGame })(SetupRolesContainer);
