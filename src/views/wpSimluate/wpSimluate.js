import Vue from "vue";
import wpSimluate from "./wpSimluate.vue";
import router from "../../router/wpSimluate_router";
import store from "../../store";
import "../../registerServiceWorker";
import axios from "axios";
// import { DatePicker, Tooltip } from "element-ui";
import ElementUI from "element-ui";
import "../../assets/css/element-variables.scss"; //Element自定义主题
import vuescroll from "vuescroll";
import "vuescroll/dist/vuescroll.css";
import message from "orait-ui";

// Vue.use(DatePicker);
// Vue.use(Tooltip);
Vue.use(ElementUI);
Vue.use(vuescroll);
Vue.use(message);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
//滚动条
Vue.prototype.$vuescrollConfig = {
  bar: {
    showDelay: 4000,
    background: "rgba(245, 126, 81, 1)",
    keepShow: true,
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
  render: h => h(wpSimluate)
}).$mount("#wpSimluate");
