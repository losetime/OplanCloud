import Vue from "vue";
import Router from "vue-router";

import wind_simulate from "../components/wpSimluate/wind_simulate.vue";
import NewProgram from "../components/schemeManage/NewProgram.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/wind_simulate",
      name: "wind_simulate",
      component: wind_simulate
    },
    {
      path: "/NewProgram",
      name: "NewProgram",
      component: NewProgram
    }
  ]
});
