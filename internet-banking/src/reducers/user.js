import {USER_LOGGED_IN, USER_LOGGED_OUT, ADD_USER, ADD_ACCOUNT_BANK, ADD_MONEY, ADD_TRANSACTION} from "../types";

export default function user(state = {}, action = {}) {
    switch (action.type) {
        case USER_LOGGED_IN:
            return action.user;
        case USER_LOGGED_OUT:
            return {};
        case ADD_USER:
            return action.user;
        case ADD_ACCOUNT_BANK:
            return action.user;
        case ADD_MONEY:
            return action.user;
        case ADD_TRANSACTION:
            return action.user;
        default:
            return state;
    }
}