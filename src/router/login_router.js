import Vue from "vue";
import Router from "vue-router";
import login from "../components/login/login.vue";
import apply from "../components/login/apply.vue";
import register from "../components/login/register.vue";
import forgetPass from "../components/login/forgetPass.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/apply",
      name: "apply",
      component: apply
    },
    {
      path: "/register",
      name: "register",
      component: register
    },
    {
      path: "/forgetPass",
      name: "forgetPass",
      component: forgetPass
    }
  ]
});
