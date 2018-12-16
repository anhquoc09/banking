<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Login</h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-sm-6 col-md-6">
                    <form>
                        <div class="form-group">
                            <label for="txtUsername">Username</label>
                            <input type="text" class="form-control" id="txtUsername" v-model="username">
                        </div>
                        <div class="form-group">
                            <label for="txtPassword">Password</label>
                            <input type="password" class="form-control" id="txtPassword" v-model="password">
                        </div>
                        <vue-recaptcha sitekey="6LcfL4AUAAAAAMePmFydJzYDgxa38uuraBoFzHSg">
                            <button>Click me</button>
                        </vue-recaptcha>
                        <button type="button" class="btn btn-primary" @click="loginBtn">
                            <span class="glyphicon glyphicon-user"></span>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import router from '../router'
    import VueRecaptcha from 'vue-recaptcha'

    export default {
        name: 'Login',
        router,
        components:{
            VueRecaptcha
        },

        data() {
            return {
                username: "",
                password: "",
            }
        },

        methods: {
            loginBtn() {
                var self = this;
                axios.post('http://localhost:3000/userController/login', {
                    username: self.username,
                    password: self.password
                }).then(function (res) {
                    self.$router.push({ path: 'home' });
                    self.username = res.data.user.username;
                    self.password = res.data.user.password;
                    console.log(res.data.user.username);
                }).catch(function (err) {
                    console.log(err);
                    console.log("'bcd");
                    // self.loginBtn();
                });
            },
        }
    }
</script>

<style lang="css" scoped>

</style>