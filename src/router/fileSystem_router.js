import Vue from "vue";
import Router from "vue-router";
import trash from "../components/fileSystem/trash.vue";
import windPower from "../components/fileSystem/windPower.vue";
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/trash",
      name: "trash",
      component: trash,
      meta: {
        breadcrumbName: "fileSystem"
      }
    },
    {
      path: "/windPower",
      name: "windPower",
      component: windPower,
      meta: {
        breadcrumbName: "fileSystem"
      }
    }
  ]
});
