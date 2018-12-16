import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router);

var router = new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
      {
          path: '/login',
          name: 'login',
          component: Login
      },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
  ]
});

router.beforeEach((to, from, next) => {
    var r = to.matched.some(record => record.meta.requiresAuth);
    console.log(r);
    if (r === true) {
        var user = localStorage.auth_user;
        console.log(user);
        if (typeof user === 'undefined') {
            next({
                path: '/login',
                // query: { redirect: to.fullPath }
            })
        } else next();
    } else next();
});

export default router
