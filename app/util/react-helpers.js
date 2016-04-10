export const createReduxReducer = (state, action, method, initialState) => {

	if (action && typeof method[action.type] === 'function') {

		return method[action.type](state, action);

	} else {

		return initialState;

	}
};