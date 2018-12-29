import axios from 'axios';

export default {
    user: {
        login: (email,password) =>
            axios.post("/userController/login",{email: email,password:password}).then(res => res.data),

        signup: user =>
            axios.post("/userController/adduser",{user}).then(res=>res.data.user),

    }
}