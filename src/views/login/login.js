import "babel-polyfill";
import Vue from "vue";
import Login from "./login.vue";
import router from "../../router/login_router";
import store from "../../store";
import "../../registerServiceWorker";
import axios from "axios";
import { Checkbox } from "element-ui";
import "../../assets/css/element-variables.scss"; //Element自定义主题
import vuescroll from "vuescroll";
import "vuescroll/dist/vuescroll.css";
import message from "orait-ui";

Vue.use(Checkbox);
Vue.use(message);
Vue.use(vuescroll);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
//滚动条
Vue.prototype.$vuescrollConfig = {
  bar: {
    showDelay: 4000,
    background: "rgba(255,119,62,1)"
  }
};
new Vue({
  router,
  store,
  render: h => h(Login)
}).$mount("#login");
