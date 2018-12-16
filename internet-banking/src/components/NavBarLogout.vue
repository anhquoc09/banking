<template>
    <nav class="navbar navbar-default" role="navigation">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <router-link to="/" class="navbar-brand">
                    <span class="glyphicon glyphicon-home"></span>
                </router-link>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse navbar-ex1-collapse">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="#">Link</a></li>
                    <li><a href="#">Link</a></li>
                </ul>

                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <router-link to="/logout">
                            <span class="glyphicon glyphicon-user"></span>
                            Logout
                        </router-link>
                    </li>
                </ul>

                <ul class="nav navbar-nav navbar-right">
                    <li><a href="#">Hi, </a></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {

        name: 'NavBarLogout',

        data() {
            return {

            }
        }
    }
</script>

<style lang="css" scoped>
</style>