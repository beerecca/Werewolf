import { actionType } from './actionType';

export function getRoles() {
	return {
        type: actionType.GET_ROLES
    }
}

export function setRoles(roles) {
	return {
		type: actionType.SET_ROLES,
		roles
	}
}