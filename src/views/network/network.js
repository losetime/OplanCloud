import Vue from "vue";
import network from "./network.vue";
import router from "../../router/network_router";
import store from "../../store";
import "../../registerServiceWorker";
import axios from "axios";
import ElementUI from "element-ui";
import "../../assets/css/element-variables.scss"; //Element自定义主题
import message from "orait-ui";
Vue.use(ElementUI);
Vue.use(message);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
new Vue({
  router,
  store,
  render: h => h(network)
}).$mount("#network");
