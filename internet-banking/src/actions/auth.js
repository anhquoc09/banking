import {USER_LOGGED_IN, USER_LOGGED_OUT, ADD_USER, ADD_ACCOUNT_BANK, ADD_MONEY, ADD_TRANSACTION, CLOSE_ACCOUNT_BANK,SEND_OTP_EMAIL} from '../types';
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
    type: ADD_USER,
    user
});

export const userAddAccountBank = user => ({
    type: ADD_ACCOUNT_BANK,
    user
});

export const userAddMoney = user => ({
    type: ADD_MONEY,
    user
});

export const userAddTransaction = user => ({
    type: ADD_TRANSACTION,
    user
});

export const userCloseAccount = (user,result) => ({
    type: CLOSE_ACCOUNT_BANK,
    user,
    result
});

export const userSendOTP = (user,result)=>({
    type: SEND_OTP_EMAIL,
    user,
    result
});

export const login = credentials => dispatch =>
    api.user.login(credentials.email, credentials.password).then(user => {
        localStorage.refreshToken = user.refreshToken;
        localStorage.accessToken = user.accessToken;
        localStorage.idUser = user.user.idUser;
        userLoggin = user;
        dispatch(userLoggedIn(user))
    });

export const regist = (credentials) => dispatch =>
    api.user.signup(credentials).then(user => {
        dispatch(adduser(userLoggin));
    });

export const logout = () => dispatch => {
    localStorage.removeItem("refreshToken");
    dispatch(userLoggedOut());
};

export const addAccountBank = infoAccount => dispatch =>
    api.user.addAccountBank(infoAccount).then(account => {
        dispatch(userAddAccountBank(userLoggin))
    });

export const addMoney = infoAccount => dispatch =>
    api.user.addMoney(infoAccount).then(account => {
        dispatch(userAddMoney(userLoggin))
    });

export const addTransaction = dataTransaction => dispatch =>
    api.user.addTransaction(dataTransaction).then(result => {
        dispatch(userAddTransaction(userLoggin))
    });

export const closeAccount = (idUser,accountBankNo) =>  dispatch =>
    api.user.closeAccount(idUser,accountBankNo).then(res=>{
       dispatch(userCloseAccount(userLoggin,res.result));
    });

export const sendOtp = (otp,idUser) => dispatch =>
    api.user.sendOtp(otp,idUser).then(res=>{
        dispatch(userSendOTP(userLoggin,res.result));
    });

