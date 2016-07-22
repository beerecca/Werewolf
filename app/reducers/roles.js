import { handleActions } from 'redux-actions';
import { initialState } from '../state';

export const roles = handleActions({

	SET_ROLES : (state, action) => ({
		...state,
		allRoles: action.payload.roles
	}),

	START_GAME : (state, action) => {

		const selectedRoles = action.payload.selectedRoles.map(roleId=>{
			return state.allRoles[roleId];
		});

		return {
			...state,
			selectedRoles
		};
	}

}, initialState.roles)
