import axios from 'axios';

export default {
    user: {
        login: (email, password) =>
            axios.post("/userController/login", {email: email, password: password}).then(res => res.data),

        signup: user =>
            axios.post("/userController/adduser", {user}).then(res => res.data.user),

        addAccountBank: account =>
            axios.post("/userController/addaccountbank", {account}).then(res => res.data.account),

        addMoney: account =>
            axios.post("/userController/addmoney", {account}).then(res => res.data.account),

        showAccountBank: cmnd =>
            axios.post("/userController/showaccountbank", {cmnd}).then(res => res.data.accountBanks),

        addTransaction: transaction =>
            axios.post("/transactionController/addTransaction", {transaction}).then(res => res.data.result),

        findAccount: idUser =>
            axios.post("/userController/findAccount", {idUser}).then(res => res.data.accountBanks),

        showHistoryTrans: accountBankNo =>
            axios.post("/transactionController/historyTransaction", {accountBankNo}).then(res => res.data.transactions),

        closeAccount: (idUser, accountBankNo) =>
            axios.post("/userController/closeAccount", {idUser, accountBankNo}).then(res => res.data.result),

        getAccountHistory: idUser =>
            axios.post("/transactionController/getAccountHistory",{idUser}).then(res=>res.data.accountBanks),
    }
}