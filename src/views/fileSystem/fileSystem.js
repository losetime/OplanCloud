import Vue from "vue";
import fileSystem from "./fileSystem.vue";
import router from "../../router/fileSystem_router";
import store from "../../store";
import "../../registerServiceWorker";
import axios from "axios";
// import ElementUI from "element-ui";

import vuescroll from "vuescroll";
import "vuescroll/dist/vuescroll.css";
import message from "@orait/oraitui";

Vue.use(vuescroll);
Vue.use(message);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
//滚动条
Vue.prototype.$vuescrollConfig = {
  bar: {
    showDelay: 2000,
    background: "rgba(245, 126, 81, 1)",
    // keepShow: true,
    snapping: {
      enable: false,
      width: 100,
      height: 100
    },
    size: "8px"
  }
};
new Vue({
  router,
  store,
  render: h => h(fileSystem)
}).$mount("#fileSystem");
