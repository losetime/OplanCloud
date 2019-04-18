import { setTheme, setHeight } from "../assets/js/common/theme.js";
export default {
  computed: {
    htmlHeight() {
      return this.$store.state.module_global.htmlHeight;
    },
    globalFlag() {
      return this.$store.state.module_global.globalFlag;
    },
    loadingShow() {
      return this.$store.state.module_global.loadingShow;
    }
  },
  watch: {
    htmlHeight(val) {
      setHeight(val);
    }
  },
  methods: {
    globalFlagFn() {
      this.$store.commit("set_globalFlag", 0);
    },
    //用于监听根页面的宽度和高度
    getwh(that) {
      let htmlDom = document.getElementsByTagName("html")[0];
      let htmlWidth =
        document.documentElement.clientWidth || document.body.clientWidth;
      let htmlHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      htmlDom.style.fontSize = htmlWidth / 100 + "px";
      that.$store.commit("gethtmlWidth", htmlWidth);
      that.$store.commit("gethtmlHeight", htmlHeight);
    },
    //控制菜单的隐藏显示
    change_globalFlag(show, hide) {
      if (this.globalFlag == show) {
        this.$store.commit("set_globalFlag", hide);
      } else {
        this.$store.commit("set_globalFlag", show);
      }
    }
  },
  mounted() {
    //监听根页面宽度和高度
    let _this = this;
    this.getwh(this);
    window.onresize = function() {
      _this.getwh(_this);
    };
    this.userInfo = localStorage.getItem("userInfo");
    setHeight(this.htmlHeight);
    setTheme();
  }
};
