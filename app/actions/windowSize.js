import { actionType } from './actionType';

export function windowResize(windowSize) {
    return {
        type: actionType.WINDOW_RESIZE,
        windowSize
    }
}