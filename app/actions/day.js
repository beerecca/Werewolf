import { actionType } from './actionType';

export function setDayReview(actions) {
    return {
        type: actionType.SET_DAY_REVIEW,
        actions
    }
}

export function startAccusations() {
    return {
        type: actionType.START_ACCUSATIONS
    }
}
