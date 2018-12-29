import axios from 'axios';

export default {
    user: {
        login: (email,password) =>
            axios.post("/userController/login",{email: email,password:password}).then(res => res.data),

        signup: user =>
            axios.post("/userController/adduser",{user}).then(res=>res.data.user),

        addAccountBank: account =>
            axios.post("/userController/addaccountbank",{account}).then(res=>res.data.account),

        addMoney: account =>
            axios.post("/userController/addmoney",{account}).then(res=>res.data.account),

    }
}