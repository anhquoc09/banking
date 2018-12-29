import {USER_LOGGED_IN, USER_LOGGED_OUT} from '../types';
import api from '../api';

let userLoggin = {};

export const userLoggedIn = user => ({
    type: USER_LOGGED_IN,
    user
});

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT,
});

export const adduser = user => ({
    type: "ADD_USER",
    user
});

export const login = credentials => dispatch =>
    api.user.login(credentials.email, credentials.password).then(user => {
        localStorage.refreshToken = user.refreshToken;
        userLoggin = user;
        dispatch(userLoggedIn(user))
    });

export const regist = credentials => dispatch =>
    api.user.signup(credentials).then(user => {
        // localStorage.refreshToken = refreshToken;
        dispatch(adduser(userLoggin));
    });

export const logout = () => dispatch => {
    localStorage.removeItem("refreshToken");
    dispatch(userLoggedOut());
};
