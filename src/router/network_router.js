import Vue from "vue";
import Router from "vue-router";
import chartMap from "../components/network/chartMap.vue";
import networkBrowse from "../components/network/networkBrowse.vue";
import networkEdit from "../components/network/networkEdit.vue";
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/chartMap",
      name: "chartMap",
      component: chartMap,
      children: [
        {
          path: "networkBrowse",
          name: "networkBrowse",
          component: networkBrowse
        },
        {
          path: "networkEdit",
          name: "networkEdit",
          component: networkEdit
        }
      ]
    }
  ]
});
