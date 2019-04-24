import Vue from "vue";
import Router from "vue-router";

import chartshow from "../components/chartshow/chartshow.vue";
import newEnergy from "../components/chartshow/newEnergy.vue";
import netWork from "../components/chartshow/netWork.vue";
import circuit from "../components/chartshow/circuit.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/chartshow",
      name: "chartshow",
      component: chartshow
    },
    {
      path: "/newEnergy",
      name: "newEnergy",
      component: newEnergy
    },
    {
      path: "/netWork",
      name: "netWork",
      component: netWork
    },
    {
      path: "/circuit",
      name: "circuit",
      component: circuit
    }
  ]
});
