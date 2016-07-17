import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../actions';
import SetupRolesForm from '../components/SetupRolesForm';

export class SetupRolesController extends Component {

	render() {
		const { dispatch } = this.props;
		const { allRoles } = this.props.app.roles;
		const roles = allRoles.filter(role => !role.isDefaultRole);

		return (
			<span>
				<h2>Select Roles</h2>
				<SetupRolesForm roles={roles} startGame={(selectedRoles)=>{dispatch(action.startGame(selectedRoles))}} />
			</span>
		);
	}
}

export default connect((state) => {
	return {
		app: {
			roles: state.app.roles,
			error: state.app.error,
			players: state.app.players
		}
	}
})(SetupRolesController);
