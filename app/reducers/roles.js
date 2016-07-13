import { handleActions } from 'redux-actions';
import { initialState } from '../state';

export const roles = handleActions({
	SET_ROLES : (state, action) => {
		const { roles } = action.payload;
		roles.sort(function (a,b) {
			return a.order - b.order;
		});

		return {
			...state,
			allRoles: roles
		};
	},

	START_GAME : (state, action) => {

		const roleMap = state.allRoles.reduce((map, role)=>{
			map[role.id] = role;
			return map;
		}, {});

		const selectedRoles = action.payload.selectedRoles.map(roleId=>{
			return roleMap[roleId];
		});

		return {
			...state,
			selectedRoles
		};
	}

}, initialState.roles)
