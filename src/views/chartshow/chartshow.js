import Vue from "vue";
import chartshow from "./chartshow.vue";
import router from "../../router/chartshow_router";
import store from "../../store";
import "../../registerServiceWorker";
import axios from "axios";
import { Select, Option, Carousel, CarouselItem } from "element-ui";
import "../../assets/css/element-variables.scss"; //Element自定义主题el-carousel
import vuescroll from "vuescroll";
import "vuescroll/dist/vuescroll.css";
import message from "orait-ui";

Vue.use(Select);
Vue.use(Option);
Vue.use(Carousel);
Vue.use(CarouselItem);
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
  render: h => h(chartshow)
}).$mount("#chartshow");
