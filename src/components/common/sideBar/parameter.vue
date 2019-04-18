<template>
  <div class="parameter-content" @click.stop>
    <div class="message">
      <div class="start-time">
        <span>{{ title[0] }}</span>
        <DatePicker
          class="DatePicker-wrapper"
          :parentTime="startDate"
        ></DatePicker>
      </div>
      <div class="stop-time">
        <span>{{ title[1] }}</span>
        <DatePicker
          class="DatePicker-wrapper"
          :parentTime="startDate"
          @getDateResult="getDateResult"
        ></DatePicker>
      </div>
      <div class="parameterSet" @click="goParameterSet" v-show="showParam">
        参数设置
      </div>
      <transition name="parameter-fade1">
        <div class="start" @click="startSimulate" v-show="showStart">
          {{ title[2] }}
        </div>
      </transition>
      <transition name="parameter-fade2">
        <pmgressbar
          :pmgressbarShow="pmgressbarShow"
          successColor="#13ce66"
          strokeColor="#FE6737"
          :radius="30"
          :strokeWidth="2"
        ></pmgressbar>
      </transition>
      <i class="iconfont icon-guanbi" @click="closeParameter"></i>
    </div>
  </div>
</template>

<script>
import DatePicker from "../../../globalComponents/datePicker.vue";
import pmgressbar from "../../../globalComponents/pmgressbar.vue";
export default {
  props: ["showParam", "title"],
  data() {
    return {
      startDate: null,
      endDate: null,
      light: false,
      showStart: true,
      startDisabled: true,
      pmgressbarShow: false
    };
  },
  computed: {
    windSiteInfo() {
      return this.$store.state.module_global.windSiteInfo;
    }
  },
  watch: {
    windSiteInfo(val) {
      this.startDate = new Date(val.simulationStart);
      this.endDate = val.simulationStart;
    }
  },
  methods: {
    zIndex() {
      let ele = document.getElementsByClassName("el-picker-panel")[0];
      ele.style.zIndex = 10000;
    },
    closeParameter() {
      this.$store.commit("set_globalFlag", 0);
    },
    diurnalDay() {
      if (this.light == false) {
        this.light = true;
      } else {
        this.light = false;
      }
    },
    //监听的DatePicker的值
    getDateResult(val) {
      this.endDate = val;
    },
    //开始模拟按钮事件
    startSimulate() {
      this.pmgressbarShow = true;
      this.showStart = false;
      this.$emit("startSimluate", this.endDate);
    },
    // 按钮点击后的callback
    successCallback() {
      this.pmgressbarShow = false; //进度条
      this.showStart = true;
      //401在图表界面监听
      this.$store.commit("set_globalFlag", 401);
    },
    errorCallback() {
      this.pmgressbarShow = false;
      this.showStart = true;
      this.$store.commit("set_globalFlag", 0);
    },
    goParameterSet() {
      this.$router.push("/NewProgram");
    }
  },
  mounted() {
    //这里暂时直接赋值，后面监听windSiteInfo，接口取值
    this.startDate = new Date();
    this.endDate = new Date();
  },
  components: {
    pmgressbar,
    DatePicker
  }
};
</script>
<style scoped lang="scss">
.parameter-content {
  background: #f5f5f5;
  width: 240px;
  height: 360px;
  background-color: #f3f3f2;
  color: #554843;
  font-size: var(--titleSix);
  font-family: "SourceHanSansSC-Normal";
  overflow: hidden;
  .message {
    margin-top: 64px;
    height: 252px;
    font-size: var(--titleSix);
    .parameter-fade1-enter-active {
      transition: all 0s ease;
    }
    .parameter-fade1-leave-active {
      transition: all 0s ease;
    }
    .parameter-fade1-enter,
    .parameter-fade1-leave-to {
      opacity: 0;
    }
    .parameter-fade2-enter-active {
      transition: all 0s ease;
    }
    .parameter-fade2-leave-active {
      transition: all 0s ease;
    }
    .parameter-fade2-enter,
    .parameter-fade2-leave-to {
      opacity: 0;
    }
    i {
      position: absolute;
      top: 7px;
      right: 8px;
      cursor: pointer;
      color: #fff;
    }
    .start-time,
    .stop-time {
      padding-left: 30px;
      span {
        font-size: var(--titleSix);
      }
      .DatePicker-wrapper {
        margin-top: 10px;
        width: 180px;
        height: 25px;
      }
    }
    .start-time {
      margin-bottom: 15px;
    }
    .stop-time {
      margin-bottom: 22px;
    }
    .parameterSet {
      width: 100%;
      text-align: center;
      cursor: pointer;
      font-size: var(--titleSix);
      &:hover {
        color: #12c0a3;
      }
    }
    .start {
      width: 100px;
      height: 36px;
      border-radius: 18px;
      border: 1px solid #58edd9;
      position: absolute;
      top: 262px;
      left: 70px;
      text-align: center;
      line-height: 36px;
      color: #58edd9;
      cursor: pointer;
      font-size: var(--titleSix);
      &:hover {
        background-color: #bcf9ef;
      }
      &:active {
        color: #fff;
        background-color: #58edd9;
      }
    }
    #pmgressbar {
      position: absolute;
      left: 50%;
      top: 240px;
      transform: translateX(-50%);
    }
  }
}
</style>
