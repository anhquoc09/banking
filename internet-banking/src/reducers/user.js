import {USER_LOGGED_IN,USER_LOGGED_OUT,ADD_USER} from "../types";

export default function user(state = {}, action = {}) {
    switch (action.type) {
        case USER_LOGGED_IN:
            return action.user;
        case USER_LOGGED_OUT:
            return {};
        case ADD_USER:
            return action.user;
        default:
            return state;
    }
}