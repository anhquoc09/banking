<template>
  <div>
    <NavBarLogin v-if="loginVisible"/>
    <NavBarLogout v-if="logoutVisible"/>
    <router-view/>
  </div>
</template>

<script>
    import NavBarLogin from './components/NavBarLogin.vue'
    import NavBarLogout from "./components/NavBarLogout";

    export default {
        name: "App",

        components: {
            NavBarLogout,
            NavBarLogin
        },

        data() {
            return {
                username: "",
                password: "",
                loginVisible: true,
                logoutVisible: false
            }
        }
    }
</script>

<style lang="css" scoped>
</style>
