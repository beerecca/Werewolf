import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../actions';
import SetupRolesForm from '../components/SetupRolesForm';

export class SetupRolesController extends Component {

	render() {
		const { dispatch } = this.props;
		const { allRoles } = this.props.app;
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
	const roleArray = Object.values(state.app.roles.allRoles);
	const allRoles = roleArray.sort(roleSort);

	return {
		app: {
			allRoles,
			error: state.app.error,
			players: state.app.players
		}
	}
})(SetupRolesController);

const roleSort = function(a,b) {
	return a.order - b.order;
}
