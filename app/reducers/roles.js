import { initialState } from '../state';
import { actionType } from '../actions';

export default function roles(state = initialState.roles, action) {
	switch(action.type) {

		case actionType.SET_ROLES:
			return {
                ...state,
                allRoles: action.roles
            };

        case actionType.START_GAME:

            const roleMap = state.allRoles.reduce((map, role)=>{
                map[role.id] = role;
                return map;
            }, {});

            const selectedRoles = action.selectedRoles.map(roleId=>{
                return roleMap[roleId];
            });

			return {
                ...state,
                selectedRoles
            };

		default: return state;
	}
}