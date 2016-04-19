import { actionType } from './actionType';

export function setError() {
	return {
		type: actionType.SET_ERROR
	}
}